import { test, expect } from '@playwright/test';

const navEntries = [
  { href: '/vermietung', label: 'Alle Geräte & Pakete' },
  { href: '/vermietung/pakete', label: 'Pakete' },
  { href: '/vermietung#sound', label: 'Soundtechnik' },
  { href: '/vermietung#licht', label: 'Lichttechnik' },
];

const technicalPages = [
  '/vermietung/pakete',
  '/vermietung/musikanlage',
  '/vermietung/lautsprecher',
  '/vermietung/pa-anlage',
  '/vermietung/dj-equipment',
  '/vermietung/partylicht',
];

test.describe('Vermietung Navigation', () => {
  test('[REQ-TECHLP-06] Vier Einstiege in Desktop- und Mobile-Navigation', async ({ page }) => {
    await page.goto('/vermietung');

    for (const { href, label } of navEntries) {
      await expect(page.locator(`[data-vermietung-dropdown] a[href="${href}"]`), `${label} desktop`).toHaveCount(1);
      await expect(page.locator(`#mobile-vermietung-sub a[href="${href}"]`), `${label} mobile`).toHaveCount(1);
    }

    for (const href of technicalPages.filter(href => !navEntries.some(entry => entry.href === href))) {
      await expect(page.locator(`[data-vermietung-dropdown] a[href="${href}"]`)).toHaveCount(0);
      await expect(page.locator(`#mobile-vermietung-sub a[href="${href}"]`)).toHaveCount(0);
    }
  });

  test('[REQ-TECHLP-06] Themenpages und FAQ sind im Footer verlinkt', async ({ page }) => {
    await page.goto('/');

    for (const href of technicalPages) {
      await expect(page.locator(`footer a[href="${href}"]`), `footer ${href}`).toHaveCount(1);
    }

    await expect(page.locator('footer a[href="/faq"]')).toHaveCount(1);
    await expect(page.locator('.desktop-menu a[href="/faq"]')).toHaveCount(0);
    await expect(page.locator('#mobile-menu a[href="/faq"]')).toHaveCount(0);
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

  test('[REQ-TECHLP-06] aktiver Nav-Punkt auf einer Detailseite', async ({ page }) => {
    await page.goto('/vermietung/pa-anlage');

    await expect(page.locator('.desktop-menu a[href="/vermietung"].active')).toHaveCount(1);
    await expect(page.locator('#mobile-vermietung-sub a[href="/vermietung"].active')).toHaveCount(1);
  });

  test('[REQ-TECHLP-06] aktiver Nav-Punkt auf /vermietung/pakete', async ({ page }) => {
    await page.goto('/vermietung/pakete');

    await expect(page.locator('[data-vermietung-dropdown] a[href="/vermietung/pakete"].active')).toHaveCount(1);
    await expect(page.locator('#mobile-vermietung-sub a[href="/vermietung/pakete"].active')).toHaveCount(1);
  });

  test('[REQ-CORE-01] Scroll-Spy markiert Section-Jump-Buttons statt der Toplinks', async ({ page }) => {
    await page.goto('/vermietung');

    for (const id of ['ablauf', 'pakete', 'sound']) {
      await page.evaluate((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) window.scrollTo(0, section.offsetTop + 120);
      }, id);

      await expect(page.locator(`.section-jump-link[href="#${id}"]`), `section-jump ${id}`).toHaveClass(/active/);

      if (id !== 'sound') {
        await expect(page.locator(`.desktop-menu a[href="/#${id}"]`), `top ${id}`).not.toHaveClass(/active/);
      }
    }

    await expect(page.locator('.desktop-menu a[href="/vermietung"].active')).toHaveCount(1);
  });
});
