import { test, expect } from '@playwright/test';

const owner = 'alihandanibu';
const repo = 'sqa-api-testing';

test('API-01: GET repository', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  expect(token, 'GITHUB_TOKEN must be configured').toBeTruthy();

  const response = await request.get(`/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.name).toBe(repo);
  expect(body.full_name).toBe(`${owner}/${repo}`);
  expect(body.private).toBe(true);
});

test('API-02: GET nonexistent repository returns 404', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  expect(token, 'GITHUB_TOKEN must be configured').toBeTruthy();

  const response = await request.get(
    `/repos/${owner}/sqa-repository-that-does-not-exist-987654321`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body.message).toBe('Not Found');
});

test('API-03: Invalid authorization returns 401', async ({ request }) => {
  const response = await request.get(
    `/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: 'Bearer invalid_token_for_testing'
      }
    }
  );

  expect(response.status()).toBe(401);

  const body = await response.json();
  expect(body.message).toBe('Bad credentials');
});

test('API-04: POST create GitHub issue', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  expect(token, 'GITHUB_TOKEN must be configured').toBeTruthy();

  const headers = { Authorization: `Bearer ${token}` };
  const title = `SQA API test ${Date.now()}`;

  const response = await request.post(
    `/repos/${owner}/${repo}/issues`,
    {
      headers,
      data: {
        title,
        body: 'Issue created by an automated SQA test.'
      }
    }
  );

  expect(response.status()).toBe(201);
  const issue = await response.json();

  try {
    expect(issue.number).toEqual(expect.any(Number));
    expect(issue.title).toBe(title);
    expect(issue.state).toBe('open');
  } finally {
    const cleanup = await request.patch(
      `/repos/${owner}/${repo}/issues/${issue.number}`,
      { headers, data: { state: 'closed' } }
    );

    expect(cleanup.status()).toBe(200);
  }
});
test('API-05: GET issue by number', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  expect(token, 'GITHUB_TOKEN must be configured').toBeTruthy();

  const headers = { Authorization: `Bearer ${token}` };
  const title = `SQA Read Test ${Date.now()}`;

  const created = await request.post(
    `/repos/${owner}/${repo}/issues`,
    { headers, data: { title } }
  );

  expect(created.status()).toBe(201);
  const createdIssue = await created.json();

  try {
    const response = await request.get(
      `/repos/${owner}/${repo}/issues/${createdIssue.number}`,
      { headers }
    );

    expect(response.status()).toBe(200);

    const issue = await response.json();

    expect(issue.number).toBe(createdIssue.number);
    expect(issue.title).toBe(title);
    expect(issue.state).toBe('open');
  } finally {
    const cleanup = await request.patch(
      `/repos/${owner}/${repo}/issues/${createdIssue.number}`,
      { headers, data: { state: 'closed' } }
    );

    expect(cleanup.status()).toBe(200);
  }
});
test('API-06: PATCH update GitHub issue', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  expect(token, 'GITHUB_TOKEN must be configured').toBeTruthy();

  const headers = { Authorization: `Bearer ${token}` };

  const created = await request.post(
    `/repos/${owner}/${repo}/issues`,
    {
      headers,
      data: { title: `SQA Update Test ${Date.now()}` }
    }
  );

  expect(created.status()).toBe(201);
  const issue = await created.json();

  try {
    const response = await request.patch(
      `/repos/${owner}/${repo}/issues/${issue.number}`,
      {
        headers,
        data: {
          title: 'Updated SQA Issue',
          body: 'This issue was updated using PATCH.'
        }
      }
    );

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.title).toBe('Updated SQA Issue');
    expect(updated.body).toBe('This issue was updated using PATCH.');

    const read = await request.get(
      `/repos/${owner}/${repo}/issues/${issue.number}`,
      { headers }
    );

    expect(read.status()).toBe(200);
    expect((await read.json()).title).toBe('Updated SQA Issue');
  } finally {
    await request.patch(
      `/repos/${owner}/${repo}/issues/${issue.number}`,
      { headers, data: { state: 'closed' } }
    );
  }
});

test('API-07: DELETE GitHub issue comment', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  expect(token, 'GITHUB_TOKEN must be configured').toBeTruthy();

  const headers = { Authorization: `Bearer ${token}` };

  const created = await request.post(
    `/repos/${owner}/${repo}/issues`,
    {
      headers,
      data: { title: `SQA Delete Test ${Date.now()}` }
    }
  );

  expect(created.status()).toBe(201);
  const issue = await created.json();

  try {
    const commentResponse = await request.post(
      `/repos/${owner}/${repo}/issues/${issue.number}/comments`,
      {
        headers,
        data: { body: 'Temporary SQA test comment' }
      }
    );

    expect(commentResponse.status()).toBe(201);
    const comment = await commentResponse.json();

    const deleted = await request.delete(
      `/repos/${owner}/${repo}/issues/comments/${comment.id}`,
      { headers }
    );

    expect(deleted.status()).toBe(204);

    const read = await request.get(
      `/repos/${owner}/${repo}/issues/comments/${comment.id}`,
      { headers }
    );

    expect(read.status()).toBe(404);
  } finally {
    await request.patch(
      `/repos/${owner}/${repo}/issues/${issue.number}`,
      { headers, data: { state: 'closed' } }
    );
  }
});

test('API-08: POST issue without title returns 422', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  expect(token, 'GITHUB_TOKEN must be configured').toBeTruthy();

  const response = await request.post(
    `/repos/${owner}/${repo}/issues`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        body: 'Issue without required title'
      }
    }
  );

  expect(response.status()).toBe(422);

  const body = await response.json();

  expect(body.message).toBeTruthy();
  expect(typeof body.message).toBe('string');
});


test('API-09: Complete CRUD flow for GitHub issue comment', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  expect(token, 'GITHUB_TOKEN must be configured').toBeTruthy();

  const headers = { Authorization: `Bearer ${token}` };

  const issueResponse = await request.post(`/repos/${owner}/${repo}/issues`, {
    headers,
    data: { title: `SQA CRUD Test ${Date.now()}` }
  });

  expect(issueResponse.status()).toBe(201);
  const issue = await issueResponse.json();

  try {
    // CREATE
    const created = await request.post(
      `/repos/${owner}/${repo}/issues/${issue.number}/comments`,
      { headers, data: { body: 'Original CRUD comment' } }
    );
    expect(created.status()).toBe(201);
    const comment = await created.json();

    // READ
    const read = await request.get(
      `/repos/${owner}/${repo}/issues/comments/${comment.id}`,
      { headers }
    );
    expect(read.status()).toBe(200);
    expect((await read.json()).body).toBe('Original CRUD comment');

    // UPDATE
    const updated = await request.patch(
      `/repos/${owner}/${repo}/issues/comments/${comment.id}`,
      { headers, data: { body: 'Updated CRUD comment' } }
    );
    expect(updated.status()).toBe(200);
    expect((await updated.json()).body).toBe('Updated CRUD comment');

    // DELETE
    const deleted = await request.delete(
      `/repos/${owner}/${repo}/issues/comments/${comment.id}`,
      { headers }
    );
    expect(deleted.status()).toBe(204);

    const afterDelete = await request.get(
      `/repos/${owner}/${repo}/issues/comments/${comment.id}`,
      { headers }
    );
    expect(afterDelete.status()).toBe(404);
  } finally {
    await request.patch(
      `/repos/${owner}/${repo}/issues/${issue.number}`,
      { headers, data: { state: 'closed' } }
    );
  }
});



test('API-10: Private repository is inaccessible without authentication', async ({ playwright }) => {
  const anonymous = await playwright.request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Accept: 'application/vnd.github+json'
    }
  });

  try {
    const response = await anonymous.get(`/repos/${owner}/${repo}`);

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toBe('Not Found');
  } finally {
    await anonymous.dispose();
  }
});
