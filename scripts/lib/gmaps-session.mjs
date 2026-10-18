import os from 'os';
import path from 'path';

export const PLACE_URL =
  'https://www.google.com/maps/place/Holger+Kampffmeyer+DJ+Dienstleistungen/data=!4m6!3m5!1s0x4799c318ddfada49:0x8c761bb0db8ae55e!8m2!3d48.6940818!4d9.161562!16s%2Fg%2F11ldk6rfp7?hl=de';

export const PROFILE_DIR = path.join(os.homedir(), '.cache', 'sls-gmaps-profile');

export const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

export async function launchSession(chromium, { headless = true } = {}) {
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless,
    locale: 'de-DE',
    viewport: { width: 1400, height: 900 },
    userAgent: USER_AGENT,
    args: ['--disable-blink-features=AutomationControlled'],
  });
  await context.addCookies([{ name: 'SOCS', value: 'CAI', domain: '.google.com', path: '/' }]);
  return context;
}

export async function isSignedIn(page) {
  const cookies = await page.context().cookies('https://www.google.com');
  return cookies.some((c) => ['SID', 'HSID', 'APISID', 'SSID'].includes(c.name) && c.value);
}
