import { test, expect } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runId = process.env.EXPLORATION_RUN_ID || 'manual-run';
const evidenceRoot = join(process.cwd(), 'bugs', 'evidence', runId);
mkdirSync(evidenceRoot, { recursive: true });

type Evidence = {
  id: string;
  browser: string;
  timestamp: string;
  input: string;
  expected: string;
  observed: string;
  verdict: string;
  screenshot: string;
  error?: string;
};

async function saveEvidence(page: any, evidence: Evidence) {
  const name = `${evidence.id}-${evidence.browser}`;
  const png = join(evidenceRoot, `${name}.png`);
  try {
    await page.screenshot({ path: png, fullPage: true, timeout: 15000 });
    evidence.screenshot = `bugs/evidence/${runId}/${name}.png`;
  } catch (e) {
    evidence.error = `${evidence.error || ''} Screenshot failed: ${String(e)}`;
  }
  writeFileSync(join(evidenceRoot, `${name}.json`), JSON.stringify(evidence, null, 2), 'utf8');
}

const quantities = [
  { id: 'EX-01', qty: '-1', expected: 'Quantity should be positive', accepted: false },
  { id: 'EX-02', qty: '0', expected: 'Quantity should be positive', accepted: false },
  { id: 'EX-03', qty: '1', expected: 'The minimum quantity allowed for purchase is 2.', accepted: false },
  { id: 'EX-04', qty: '2', expected: 'The product has been added to your shopping cart', accepted: true },
  { id: 'EX-05', qty: '10001', expected: 'The maximum quantity allowed for purchase is 10000.', accepted: false },
  { id: 'EX-06', qty: '999999', expected: 'The maximum quantity allowed for purchase is 10000.', accepted: false },
];

for (const c of quantities) {
  test(`@explore ${c.id}: Quantity boundary ${c.qty}`, async ({ page }, info) => {
    const evidence: Evidence = {
      id: c.id,
      browser: info.project.name,
      timestamp: new Date().toISOString(),
      input: `quantity=${c.qty}, new isolated browser session`,
      expected: `${c.expected}; cart count ${c.accepted ? '(2)' : '(0)'}`,
      observed: 'Not observed',
      verdict: 'REVIEW',
      screenshot: '',
    };
    try {
      await page.goto('/apple-macbook-pro');
      await expect(page.locator('.cart-qty')).toContainText('(0)');
      await page.locator('input.qty-input').fill(c.qty);
      await page.locator('#add-to-cart-button-4').click();
      await expect(page.locator('.bar-notification')).toContainText(c.expected, { timeout: 10000 });
      await expect(page.locator('.cart-qty')).toContainText(c.accepted ? '(2)' : '(0)');
      const notification = (await page.locator('.bar-notification').allTextContents()).join(' | ');
      const cart = await page.locator('.cart-qty').innerText();
      evidence.observed = `notification=${notification}; cart=${cart}`;
      evidence.verdict = 'PASS';
    } catch (err) {
      const notification = await page.locator('.bar-notification').allTextContents().catch(() => []);
      const cart = await page.locator('.cart-qty').innerText().catch(() => '(unavailable)');
      evidence.observed = `notification=${notification.join(' / ')}; cart=${cart}`;
      evidence.verdict = 'REVIEW';
      evidence.error = String(err);
      throw err;
    } finally {
      await saveEvidence(page, evidence);
    }
  });
}

test('@explore EX-07: Search for known product', async ({ page }, info) => {
  const e: Evidence = { id: 'EX-07', browser: info.project.name, timestamp: new Date().toISOString(), input: 'MacBook', expected: 'Apple MacBook Pro appears in search results', observed: '', verdict: 'REVIEW', screenshot: '' };
  try {
    await page.goto('/');
    await page.locator('#small-searchterms').fill('MacBook');
    await page.locator('.search-box-button').click();
    await expect(page.getByText('Apple MacBook Pro')).toBeVisible();
    e.observed = `Search result visible, URL=${page.url()}`;
    e.verdict = 'PASS';
  } catch (err) { e.error = String(err); e.observed = `URL=${page.url()}`; throw err; }
  finally { await saveEvidence(page, e); }
});

test('@explore EX-08: Search for nonexistent product', async ({ page }, info) => {
  const e: Evidence = { id: 'EX-08', browser: info.project.name, timestamp: new Date().toISOString(), input: 'XYZNONEXISTENT98765', expected: 'No products were found that matched your criteria.', observed: '', verdict: 'REVIEW', screenshot: '' };
  try {
    await page.goto('/');
    await page.locator('#small-searchterms').fill('XYZNONEXISTENT98765');
    await page.locator('.search-box-button').click();
    await expect(page.getByText('No products were found that matched your criteria.')).toBeVisible();
    e.observed = `No-results message displayed, URL=${page.url()}`;
    e.verdict = 'PASS';
  } catch (err) { e.error = String(err); e.observed = `URL=${page.url()}`; throw err; }
  finally { await saveEvidence(page, e); }
});

test('@explore EX-09: Whitespace-only search (observation)', async ({ page }, info) => {
  const e: Evidence = { id: 'EX-09', browser: info.project.name, timestamp: new Date().toISOString(), input: 'three spaces', expected: 'Observe actual validation or search result; no pre-assigned defect', observed: '', verdict: 'OBSERVED', screenshot: '' };
  let dialogText = '';
  page.on('dialog', async dialog => { dialogText = dialog.message(); await dialog.accept(); });
  try {
    await page.goto('/');
    await page.locator('#small-searchterms').fill('   ');
    await page.locator('.search-box-button').click();
    await page.waitForTimeout(600);
    const results = await page.locator('.search-results, .search-page, .search-input, .validation-summary-errors').allTextContents().catch(() => []);
    e.observed = `dialog=${dialogText || '(none)'}; URL=${page.url()}; page excerpts=${results.join(' / ').slice(0, 350)}`;
  } catch (err) { e.verdict = 'REVIEW'; e.error = String(err); e.observed = `dialog=${dialogText}; URL=${page.url()}`; throw err; }
  finally { await saveEvidence(page, e); }
});

test('@explore EX-10: Add and remove minimum quantity', async ({ page }, info) => {
  const e: Evidence = { id: 'EX-10', browser: info.project.name, timestamp: new Date().toISOString(), input: 'add 2 MacBook units, then remove from cart', expected: 'Cart goes from empty to (2), then back to empty', observed: '', verdict: 'REVIEW', screenshot: '' };
  try {
    await page.goto('/apple-macbook-pro');
    await expect(page.locator('.cart-qty')).toContainText('(0)');
    await page.locator('input.qty-input').fill('2');
    await page.locator('#add-to-cart-button-4').click();
    await expect(page.locator('.cart-qty')).toContainText('(2)');
    await page.goto('/cart');
    await page.locator('button.remove-btn').click();
    await expect(page.locator('.order-summary-content')).toContainText('Your Shopping Cart is empty!');
    e.observed = `Empty-cart message shown, cart=${await page.locator('.cart-qty').innerText()}`;
    e.verdict = 'PASS';
  } catch (err) { e.error = String(err); e.observed = `URL=${page.url()}`; throw err; }
  finally { await saveEvidence(page, e); }
});