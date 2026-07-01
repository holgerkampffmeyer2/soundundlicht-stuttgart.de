import { test, expect } from '@playwright/test';

test.describe('Merkliste functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => {
      localStorage.removeItem('sls_merkliste');
    });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
  });

  test('should add product from vermietung page, update badge, show in drawer, and prefill form', async ({ page }) => {
    await page.goto('/vermietung');
    await page.waitForSelector('.equipment-card');

    const firstCard = page.locator('.equipment-card').first();
    const productTitle = await firstCard.locator('h3').textContent();
    expect(productTitle).toBeTruthy();

    const addButton = firstCard.locator('button[data-action="add-to-wishlist"]');
    await expect(addButton).toBeVisible();
    await addButton.click({ force: true });

    await expect(addButton).toContainText('Gemerkt', { timeout: 5000 });

    const badge = page.locator('.merkliste-badge').first();
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');

    await page.click('#merkliste-toggle', { force: true });
    const drawer = page.locator('#merkliste-drawer');
    await expect(drawer).toHaveClass(/open/);
    await expect(drawer.locator('h3')).toContainText(productTitle ?? '');

    await drawer.locator('#request-btn').click({ force: true });
    await page.waitForLoadState('load');
    await page.waitForSelector('#kontakt');
    await expect(page.locator('#kontakt')).toBeInViewport();

    const equipmentTextarea = page.locator('#equipment');
    const textareaValue = await equipmentTextarea.inputValue();
    expect(textareaValue).toContain(productTitle ?? '');
    expect(textareaValue).toMatch(/€/);
  });

  test('should add product from detail page, update badge, show in drawer, and prefill form', async ({ page }) => {
    await page.goto('/vermietung');
    await page.waitForSelector('.equipment-card');

    const cards = page.locator('.equipment-card');
    const count = await cards.count();
    let productLink = null;
    let productTitle = '';
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const link = card.locator('a.btn-secondary, a[href*="/vermietung/"]').first();
      if (await link.count() > 0) {
        productLink = link;
        productTitle = await card.locator('h3').textContent();
        break;
      }
    }
    if (!productLink) {
      test.skip('No product with detail link found');
      return;
    }

    await productLink.click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/\/vermietung\//);
    await expect(page.locator('h1')).toBeVisible();

    const addButton = page.locator('button.wishlist-btn');
    await expect(addButton).toBeVisible({ timeout: 5000 });
    await addButton.click({ force: true });
    await page.waitForTimeout(300);

    const badge = page.locator('.merkliste-badge').first();
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');

    await page.click('#merkliste-toggle', { force: true });
    const drawer = page.locator('#merkliste-drawer');
    await expect(drawer).toHaveClass(/open/);
    await expect(drawer.locator('h3')).toContainText(productTitle ?? '');

    await drawer.locator('#request-btn').click({ force: true });
    await page.waitForTimeout(500);
    await page.goto('/vermietung');
    await page.waitForLoadState('load');
    await page.evaluate(() => {
      const el = document.getElementById('kontakt');
      if (el) el.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(300);
    await expect(page.locator('#kontakt')).toBeVisible();

    const equipmentTextarea = page.locator('#equipment');
    const textareaValue = await equipmentTextarea.inputValue();
    expect(textareaValue).toContain(productTitle ?? '');
    expect(textareaValue).toMatch(/€/);
  });

  test('should add multiple products and see them in drawer and form', async ({ page }) => {
    await page.goto('/vermietung');
    await page.waitForSelector('.equipment-card');

    const cards = page.locator('.equipment-card');
    const count = await cards.count();
    let addedCount = 0;
    for (let i = 0; i < Math.min(count, 2); i++) {
      const card = cards.nth(i);
      const link = card.locator('a.btn-secondary, a[href*="/vermietung/"]').first();
      if (await link.count() > 0) {
        await link.click({ force: true });
        await page.waitForLoadState('load');
        const addButton = page.locator('button.wishlist-btn');
        await expect(addButton).toBeVisible({ timeout: 5000 });
        await addButton.click({ force: true });
        await page.waitForTimeout(300);
        await page.goBack();
        await page.waitForSelector('.equipment-card');
        addedCount++;
      }
    }

    const badge = page.locator('.merkliste-badge').first();
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText(addedCount.toString());

    await page.click('#merkliste-toggle', { force: true });
    const drawer = page.locator('#merkliste-drawer');
    await expect(drawer).toHaveClass(/open/);
    const items = drawer.locator('.merkliste-item');
    await expect(items).toHaveCount(addedCount);

    await drawer.locator('#request-btn').click({ force: true });
    await page.waitForTimeout(300);
    await page.evaluate(() => {
      const el = document.getElementById('kontakt');
      if (el) {
        el.scrollIntoView({ block: 'center' });
        window.scrollBy(0, -80);
      }
    });
    await page.waitForTimeout(300);
    await expect(page.locator('#kontakt')).toBeVisible();

    const equipmentTextarea = page.locator('#equipment');
    const textareaValue = await equipmentTextarea.inputValue();
    const matches = (textareaValue.match(/\(€\)/g) || []);
    expect(textareaValue).toMatch(/€/);
  });
});
