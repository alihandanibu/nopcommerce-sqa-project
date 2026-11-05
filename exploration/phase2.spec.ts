import { test, expect, Page, TestInfo } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runId = process.env.EXPLORATION_RUN_ID || 'manual-phase2';
const folder = join(process.cwd(), 'bugs', 'evidence', runId);
mkdirSync(folder, { recursive: true });

type Result = {
  id: string;
  browser: string;
  timestamp: string;
  input: string;
  expected: string;
  observed: string;
  verdict: 'PASS' | 'OBSERVED' | 'REVIEW';
  screenshot: string;
  error?: string;
};

async function evidenceTest(
  id: string,
  title: string,
  input: string,
  expected: string,
  run: (page: Page) => Promise<string>,
  observational = false,
) {
  test(`@phase2 ${id}: ${title}`, async ({ page }, info: TestInfo) => {
    const result: Result = {
      id,
      browser: info.project.name,
      timestamp: new Date().toISOString(),
      input,
      expected,
      observed: 'Not observed',
      verdict: 'REVIEW',
      screenshot: '',
    };
    try {
      result.observed = await run(page);
      result.verdict = observational ? 'OBSERVED' : 'PASS';
    } catch (err) {
      result.error = String(err);
      const msg = await page.locator('.message-error, .field-validation-error, .bar-notification').allTextContents().catch(() => []);
      result.observed = `URL=${page.url()}; messages=${msg.join(' | ').slice(0, 500)}`;
      throw err;
    } finally {
      const name = `${id}-${info.project.name}`;
      try {
        await page.screenshot({ path: join(folder, `${name}.png`), fullPage: true, timeout: 15000 });
        result.screenshot = `bugs/evidence/${runId}/${name}.png`;
      } catch (err) {
        result.error = (result.error || '') + ' Screenshot error: ' + String(err);
        result.verdict = 'REVIEW';
      }
      writeFileSync(join(folder, `${name}.json`), JSON.stringify(result, null, 2), 'utf8');
    }
  });
}

async function fillRegistration(page: Page, email: string, password: string, confirm: string) {
  await page.goto('/register');
  await page.locator('#FirstName').fill('Sqa');
  await page.locator('#LastName').fill('Tester');
  await page.locator('#Email').fill(email);
  await page.locator('#Password').fill(password);
  await page.locator('#ConfirmPassword').fill(confirm);
}

evidenceTest(
  'EX-11', 'Registration rejects invalid email',
  'name=Sqa Tester, email=invalid-email, password=Password123!',
  'Email validation error is visible; account not created',
  async page => {
    await fillRegistration(page, 'invalid-email', 'Password123!', 'Password123!');
    await page.locator('#register-button').click();
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
    await expect(page).toHaveURL(/\/register(?:\?|$)/i);
    return `email validation visible; URL=${page.url()}`;
  },
);

evidenceTest(
  'EX-12', 'Registration rejects mismatched passwords',
  'email=sqa-mismatch@example.invalid, password=Password123!, confirm=Different123!',
  'Password confirmation mismatch is rejected',
  async page => {
    await fillRegistration(page, 'sqa-mismatch@example.invalid', 'Password123!', 'Different123!');
    await page.locator('#register-button').click();
    await expect(page.getByText(/password and confirmation password do not match/i)).toBeVisible();
    await expect(page).toHaveURL(/\/register(?:\?|$)/i);
    return `mismatch validation visible; URL=${page.url()}`;
  },
);

evidenceTest(
  'EX-13', 'Registration requires mandatory fields',
  'register form submitted with required fields empty',
  'Required-field validation is displayed; account not created',
  async page => {
    await page.goto('/register');
    await page.locator('#register-button').click();
    await expect(page.locator('.field-validation-error').first()).toBeVisible();
    await expect(page).toHaveURL(/\/register(?:\?|$)/i);
    const texts = (await page.locator('.field-validation-error').allTextContents()).map(t => t.trim()).filter(Boolean);
    return `validations=${texts.join(' | ').slice(0, 450)}; URL=${page.url()}`;
  },
);

evidenceTest(
  'EX-14', 'Login rejects unknown customer',
  'email=sqa-nonexistent@example.invalid, incorrect password',
  'Login is rejected; customer session not created',
  async page => {
    await page.goto('/login');
    await page.locator('#Email').fill('sqa-nonexistent@example.invalid');
    await page.locator('#Password').fill('NotThePassword123!');
    await page.locator('button.login-button').click();
    await expect(page.locator('.message-error')).toBeVisible();
    await expect(page.locator('.header-links')).not.toContainText('Log out');
    return `login rejected; message=${(await page.locator('.message-error').innerText()).trim().slice(0, 400)}`;
  },
);

evidenceTest(
  'EX-15', 'Login validates blank credentials',
  'login email and password empty',
  'Required-field errors are displayed; user remains logged out',
  async page => {
    await page.goto('/login');
    await page.locator('button.login-button').click();
    await expect(page.locator('.field-validation-error').first()).toBeVisible();
    await expect(page.locator('.header-links')).not.toContainText('Log out');
    return `blank-login errors=${(await page.locator('.field-validation-error').allTextContents()).join(' | ').slice(0, 400)}`;
  },
);

evidenceTest(
  'EX-16', 'Computer/Notebooks category navigation',
  '/computers then /notebooks',
  'Both categories load, notebook product items visible',
  async page => {
    await page.goto('/computers');
    await expect(page.locator('.page-title h1')).toContainText('Computers');
    await page.goto('/notebooks');
    await expect(page.locator('.page-title h1')).toContainText('Notebooks');
    const count = await page.locator('.product-item').count();
    expect(count).toBeGreaterThan(0);
    return `Notebooks page loaded; ${count} product cards; URL=${page.url()}`;
  },
);

async function sortAndRead(page: Page, direction: 'asc' | 'desc') {
  await page.goto('/notebooks');
  const options = await page.locator('#products-orderby option').evaluateAll(nodes =>
    nodes.map(n => ({ value: (n as HTMLOptionElement).value, name: n.textContent?.trim() || '' }))
  );
  const option = options.find(o => direction === 'asc'
    ? /price.*low.*high/i.test(o.name)
    : /price.*high.*low/i.test(o.name));
  expect(option, `Sort option for ${direction} should exist; got ${JSON.stringify(options)}`).toBeTruthy();
  await Promise.all([
    page.waitForURL(
      url => url.searchParams.get('orderby') === option!.value,
      { waitUntil: 'load', timeout: 45000 }
    ),
    page.locator('#products-orderby').selectOption(option!.value),
  ]);

  await expect(page.locator('.product-item').first()).toBeVisible();

  await expect.poll(async () => {
    const texts = await page.locator('.product-item .actual-price').allTextContents();
    const values = texts.map(t =>
      Number(t.replace(/[^0-9.,]/g, '').replace(/,/g, ''))
    );

    return values.length >= 2 &&
      values.every(Number.isFinite) &&
      values.every((v, i) => i === 0 ||
        (direction === 'asc'
          ? v >= values[i - 1]
          : v <= values[i - 1]));
  }, { timeout: 15000 }).toBe(true);
  const priceTexts = await page.locator('.product-item .actual-price').allTextContents();
  const prices = priceTexts.map(t => Number(t.replace(/[^0-9.,]/g, '').replace(/,/g, '')));
  expect(prices.length, 'At least two product prices must be visible').toBeGreaterThan(1);
  for (const p of prices) expect(Number.isFinite(p)).toBeTruthy();
  for (let i = 1; i < prices.length; i++) {
    if (direction === 'asc') expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    else expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
  }
  return `option=${option!.name}; prices=${prices.join(', ')}; URL=${page.url()}`;
}

evidenceTest('EX-17', 'Sort notebooks price ascending', 'notebooks sort Price: Low to High', 'Visible product prices ascending', page => sortAndRead(page, 'asc'));
evidenceTest('EX-18', 'Sort notebooks price descending', 'notebooks sort Price: High to Low', 'Visible product prices descending', page => sortAndRead(page, 'desc'));

evidenceTest(
  'EX-19', 'Cart total changes when quantity increases',
  'new session; add 3 MacBooks, increase cart quantity by 1',
  'Cart quantity is 4 and displayed order total increases',
  async page => {
    await page.goto('/apple-macbook-pro');
    await expect(page.locator('.cart-qty')).toContainText('(0)');
    await page.locator('input.qty-input').fill('3');
    await page.locator('#add-to-cart-button-4').click();
    await expect(page.locator('.cart-qty')).toContainText('(3)');
    await page.goto('/cart');
    const total = page.locator('.order-total .value-summary');
    const initial = (await total.innerText()).trim();
    await page.locator('[id^="quantity-up-"]').click();
    await expect(page.locator('input.qty-input')).toHaveValue('4');
    await expect(page.locator('.cart-qty')).toContainText('(4)');
    await expect.poll(async () => (await total.innerText()).trim()).not.toBe(initial);
    const updated = (await total.innerText()).trim();
    await expect(page.locator('.message-error')).toHaveCount(0);
    return `cart=(4); initial total=${initial}; updated total=${updated}`;
  },
);

evidenceTest(
  'EX-20', 'Search with special characters (observation)',
  'query=@#$%^&*',
  'Observe how storefront handles unusual input; no defect pre-assigned',
  async page => {
    let dialog = '';
    page.on('dialog', async d => { dialog = d.message(); await d.accept(); });
    await page.goto('/');
    await page.locator('#small-searchterms').fill('@#$%^&*');
    await page.locator('.search-box-button').click();
    await page.waitForTimeout(500);
    const message = await page.locator('.search-results, .search-page, .no-result').allTextContents().catch(() => []);
    return `dialog=${dialog || '(none)'}; URL=${page.url()}; page excerpts=${message.join(' | ').slice(0, 400)}`;
  },
  true,
);