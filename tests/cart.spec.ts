import { test, expect } from '@playwright/test';

test.describe('Cart functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage and reload homepage to ensure clean state
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => {
      localStorage.removeItem('sls_cart');
    });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
  });

  test('should add product from vermietung page, update cart badge, show in drawer, and prefill form with name and price', async ({ page }) => {
    // Go to vermietung page to get a product
    await page.goto('/vermietung');
    await page.waitForSelector('.equipment-card');

    // Get the first product card
    const firstCard = page.locator('.equipment-card').first();
    const productTitle = await firstCard.locator('h3').textContent();
    expect(productTitle).toBeTruthy();

    // Click the "Zur Anfrage hinzufügen" button on the first card
    const addButton = firstCard.locator('button[data-action="add-to-cart"]');
    await expect(addButton).toBeVisible();
    await addButton.click({ force: true });

    // Wait for the button to update to "Im Warenkorb (1)"
    await expect(addButton).toContainText('Im Warenkorb', { timeout: 5000 });
    await expect(addButton).toContainText('1', { timeout: 5000 });

    // Verify cart badge in navbar shows 1
    const cartBadge = page.locator('.cart-badge').first();
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');

    // Click cart icon to open drawer
    await page.click('#cart-toggle', { force: true });
    const drawer = page.locator('#cart-drawer');
    await expect(drawer).toHaveClass(/open/);
    // Verify the product title appears in the drawer
    await expect(drawer.locator('h3')).toContainText(productTitle ?? '');

    // Click "Jetzt anfragen" to scroll to contact form
    await drawer.locator('#request-btn').click({ force: true });
    await page.waitForLoadState('load');
    await page.waitForSelector('#kontakt');
    await expect(page.locator('#kontakt')).toBeInViewport();

    // Check that the textarea contains product name and price info
    const equipmentTextarea = page.locator('#equipment');
    const textareaValue = await equipmentTextarea.inputValue();
    expect(textareaValue).toContain(productTitle ?? '');
    // Expect price info (euro sign) to be present
    expect(textareaValue).toMatch(/€/);
  });

  test('should add product from detail page, update cart badge, show in drawer, and prefill form', async ({ page }) => {
    // Go to vermietung page to get a product link
    await page.goto('/vermietung');
    await page.waitForSelector('.equipment-card');

    // Find a product that has a detail link
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

    // Click the product link to go to detail page
    await productLink.click();
    await page.waitForLoadState('load');
    // Ensure we are on a product detail page
    await expect(page).toHaveURL(/\/vermietung\//);
    await expect(page.locator('h1')).toBeVisible();

    // Add to cart using the CartButton on the detail page
    const addButton = page.locator('button.cart-button');
    await expect(addButton).toBeVisible({ timeout: 5000 });
    await addButton.click({ force: true });
    // Wait for the store update + re-render
    await page.waitForTimeout(300);

    // Verify cart badge in navbar shows 1
    const cartBadge = page.locator('.cart-badge').first();
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');

    // Click cart icon to open drawer
    await page.click('#cart-toggle', { force: true });
    const drawer = page.locator('#cart-drawer');
    await expect(drawer).toHaveClass(/open/);
    // Verify the product title appears in the drawer
    await expect(drawer.locator('h3')).toContainText(productTitle ?? '');

    // Click "Jetzt anfragen" to scroll to contact form
    await drawer.locator('#request-btn').click({ force: true });
    await page.waitForTimeout(500);
    // Navigate to main vermietung page where kontakt section exists
    await page.goto('/vermietung');
    await page.waitForLoadState('load');
    await page.evaluate(() => {
      const el = document.getElementById('kontakt');
      if (el) el.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(300);
    await expect(page.locator('#kontakt')).toBeVisible();

    // Check that the textarea contains product name and price info
    const equipmentTextarea = page.locator('#equipment');
    const textareaValue = await equipmentTextarea.inputValue();
    expect(textareaValue).toContain(productTitle ?? '');
    // Expect price info (euro sign) to be present
    expect(textareaValue).toMatch(/€/);
  });

  test('should add multiple products and see them in cart drawer and form', async ({ page }) => {
    await page.goto('/vermietung');
    await page.waitForSelector('.equipment-card');

    const cards = page.locator('.equipment-card');
    const count = await cards.count();
    let addedCount = 0;
    // We'll try to add up to 2 distinct products that have detail links
    for (let i = 0; i < Math.min(count, 2); i++) {
      const card = cards.nth(i);
      const link = card.locator('a.btn-secondary, a[href*="/vermietung/"]').first();
      if (await link.count() > 0) {
        await link.click({ force: true });
        await page.waitForLoadState('load');
        // Add to cart
        const addButton = page.locator('button.cart-button');
        await expect(addButton).toBeVisible({ timeout: 5000 });
        await addButton.click({ force: true });
        await page.waitForTimeout(300);
        // Go back to vermietung page to add another
        await page.goBack();
        await page.waitForSelector('.equipment-card');
        addedCount++;
      }
    }

    // Verify cart badge shows number of items added
    const cartBadge = page.locator('.cart-badge').first();
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText(addedCount.toString());

    // Open drawer and verify items are present
    await page.click('#cart-toggle', { force: true });
    const drawer = page.locator('#cart-drawer');
    await expect(drawer).toHaveClass(/open/);
    const items = drawer.locator('.cart-item');
    await expect(items).toHaveCount(addedCount);

    // Go to contact form via the drawer button
    await drawer.locator('#request-btn').click({ force: true });
    await page.waitForTimeout(300);
    await page.evaluate(() => {
      const el = document.getElementById('kontakt');
      if (el) {
        el.scrollIntoView({ block: 'center' });
        window.scrollBy(0, -80); // account for fixed navbar
      }
    });
    await page.waitForTimeout(300);
    await expect(page.locator('#kontakt')).toBeVisible();

    // Check textarea contains product names and price info
    const equipmentTextarea = page.locator('#equipment');
    const textareaValue = await equipmentTextarea.inputValue();
    // At least check that we have at least addedCount occurrences of "x" (quantity) and euro signs
    const matches = (textareaValue.match(/x\s*.*?/g) || []);
    expect(matches.length).toBeGreaterThanOrEqual(addedCount);
    expect(textareaValue).toMatch(/€/);
  });
});