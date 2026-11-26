import { test, expect } from '@playwright/test';

const technicalPages = [
  { href: '/vermietung/pakete', label: 'Pakete mieten' },
  { href: '/vermietung/musikanlage', label: 'Musikanlage mieten' },
  { href: '/vermietung/lautsprecher', label: 'Lautsprecher mieten' },
  { href: '/vermietung/pa-anlage', label: 'PA-Anlage mieten' },
  { href: '/vermietung/dj-equipment', label: 'DJ-Equipment mieten' },
  { href: '/vermietung/partylicht', label: 'Partylicht mieten' },
];

test.describe('Vermietung Navigation', () => {
  test('[REQ-TECHLP-06] Themenpages sind in Desktop- und Mobile-Navigation verlinkt', async ({ page }) => {
    await page.goto('/vermietung');

    for (const { href, label } of technicalPages) {
      await expect(page.locator(`.desktop-menu a[href="${href}"]`), `${label} desktop`).toHaveCount(1);
      await expect(page.locator(`#mobile-vermietung-sub a[href="${href}"]`), `${label} mobile`).toHaveCount(1);
    }
  });

  test('[REQ-TECHLP-06] Vermietungs-Hub verlinkt die Themenpages', async ({ page }) => {
    await page.goto('/vermietung');

    await expect(page.locator('#pakete a[href="/vermietung/pakete"]')).toHaveCount(1);
    await expect(page.locator('#sound a[href="/vermietung/musikanlage"]')).toHaveCount(1);
    await expect(page.locator('#sound a[href="/vermietung/lautsprecher"]')).toHaveCount(1);
    await expect(page.locator('#sound a[href="/vermietung/pa-anlage"]')).toHaveCount(1);
    await expect(page.locator('#sound a[href="/vermietung/dj-equipment"]')).toHaveCount(1);
    await expect(page.locator('#licht a[href="/vermietung/partylicht"]')).toHaveCount(1);
  });

  for (const { href, label } of technicalPages) {
    test(`[REQ-TECHLP-06] aktiver Nav-Punkt auf ${label}`, async ({ page }) => {
      await page.goto(href);

      await expect(page.locator(`.desktop-menu a[href="${href}"].active`)).toHaveCount(1);
      await expect(page.locator(`#mobile-vermietung-sub a[href="${href}"].active`)).toHaveCount(1);
    });
  }
});
