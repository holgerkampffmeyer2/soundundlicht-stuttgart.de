import { PLACE_URL, launchSession, isSignedIn } from './gmaps-session.mjs';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function clickElement(page, locator, timeout = 6000) {
  try {
    await locator.click({ timeout });
    return true;
  } catch {
    return false;
  }
}

async function openReviewsPanel(page) {
  const tab = page
    .locator('button[role="tab"], div[role="tab"], a, span[role="tab"]')
    .filter({ hasText: /^Rezensionen/ })
    .first();
  if (await clickElement(page, tab, 8000)) {
    await sleep(3000);
  }

  const allReviews = page
    .locator('button, a, div[role="button"], span[role="button"]')
    .filter({ hasText: /^Alle Rezensionen/ })
    .first();
  if (await clickElement(page, allReviews, 4000)) {
    await sleep(3000);
  }
}

async function sortNewestFirst(page) {
  const sortButton = page.getByRole('button', { name: /sortieren/i }).first();
  if (!(await clickElement(page, sortButton, 6000))) return false;
  await sleep(1500);

  for (const locator of [
    page.locator('[role="menuitemradio"], [role="menuitem"], [role="option"]').filter({ hasText: /^Neueste/ }).first(),
    page.getByText(/^Neueste$/, { exact: true }).first(),
  ]) {
    if (await clickElement(page, locator, 3000)) {
      await sleep(2500);
      return true;
    }
  }
  return false;
}

function scrollPanelScript() {
  document.querySelectorAll('button[aria-label="Mehr anzeigen"], button[aria-label="Mehr anzeigen Reviews"], button[aria-label="Show more"]').forEach((b) => b.click());
  let panel = document.querySelector('.m6QErb.DxyBCb.kA9KIf.dS8AEf');
  if (!panel) {
    let el = document.querySelector('.jftiEf, div[data-review-id]');
    while (el && el !== document.body) {
      const st = getComputedStyle(el);
      if ((st.overflowY === 'auto' || st.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50) {
        panel = el;
        break;
      }
      el = el.parentElement;
    }
  }
  if (panel) {
    panel.scrollTop = panel.scrollHeight;
    panel.dispatchEvent(new Event('scroll', { bubbles: true }));
  }
  return new Set(
    [...document.querySelectorAll('[data-review-id]')].map((e) => e.getAttribute('data-review-id'))
  ).size;
}

async function collectAllReviews(page, expectedCount) {
  let lastCount = -1;
  let stuck = 0;
  const maxPasses = 60;

  for (let i = 0; i < maxPasses && stuck < 5; i++) {
    const count = await page.evaluate(scrollPanelScript);
    if (count === lastCount) {
      stuck += 1;
    } else {
      stuck = 0;
      lastCount = count;
    }
    if (expectedCount && count >= expectedCount) break;
    await sleep(1200);
  }

  return page.evaluate(() => {
    const seen = new Set();
    const reviews = [];
    for (const card of document.querySelectorAll('.jftiEf, div[data-review-id]')) {
      const id = card.getAttribute('data-review-id');
      if (!id || seen.has(id)) continue;
      seen.add(id);

      const ratingLabel =
        card.querySelector('[role="img"][aria-label*="Stern"]')?.getAttribute('aria-label') ||
        card.querySelector('[role="img"][aria-label*="star"]')?.getAttribute('aria-label') ||
        '';
      const ratingMatch = ratingLabel.match(/(\d+)/);
      const text = card.querySelector('.wiI7pd')?.textContent?.trim() || '';

      reviews.push({
        author_name: (card.getAttribute('aria-label') || card.querySelector('.d4r55')?.textContent || 'Anonym').trim(),
        rating: ratingMatch ? Number(ratingMatch[1]) : 5,
        text,
        relative_time_description: card.querySelector('.rsqaWe')?.textContent?.trim() || '',
      });
    }
    return reviews;
  });
}

export async function scrapeGoogleReviews({ chromium, headless = true, log = console.log }) {
  const context = await launchSession(chromium, { headless });
  try {
    const page = context.pages()[0] || (await context.newPage());
    await page.goto(PLACE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(5000);

    const title = await page.title();
    if (!/Kampffmeyer/i.test(title)) {
      throw new Error(`Unerwartete Google-Seite: "${title}". evtl. Anmeldung nötig → pnpm run gmaps:login`);
    }
    if (!(await isSignedIn(page))) {
      throw new Error('Nicht bei Google angemeldet — bitte einmalig `pnpm run gmaps:login` ausführen.');
    }

    const aggregates = await page.evaluate(() => {
      const text = document.querySelector('.F7nice')?.textContent || '';
      const rating = text.match(/(\d+[,.]\d)/)?.[1]?.replace(',', '.');
      const count = text.match(/\((\d+)\)/)?.[1];
      return { ratingValue: rating ? Number(rating) : null, reviewCount: count ? Number(count) : null };
    });
    log(`   Google-Seite: ${aggregates.reviewCount ?? '?'} Bewertungen, Ø ${aggregates.ratingValue ?? '?'}`);

    await openReviewsPanel(page);
    const sorted = await sortNewestFirst(page);
    log(sorted ? '   Sortierung: neueste zuerst' : '   Sortierung: Standard (Relevanz) — Menü nicht erreichbar');

    const reviews = await collectAllReviews(page, aggregates.reviewCount);
    log(`   Gescraped: ${reviews.length} Rezension(en)`);

    return {
      reviews,
      reviewCount: aggregates.reviewCount ?? reviews.length,
      ratingValue: aggregates.ratingValue ?? 5,
    };
  } finally {
    await context.close();
  }
}
