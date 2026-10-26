import { getCartData, buildProductMap, type Product } from './cartData';

interface ResolvedProductMap {
  [slug: string]: Product & { image?: string };
}

function resolveProductMap(): ResolvedProductMap {
  const productScript = document.getElementById('rental-catalog-data');
  if (!productScript) return {};
  try {
    return buildProductMap(JSON.parse(productScript.textContent));
  } catch {
    return {};
  }
}

function getTodayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function clearErrors(errorStart: HTMLElement | null, startInput: HTMLInputElement | null): void {
  if (errorStart && startInput) {
    errorStart.textContent = '';
    startInput.classList.remove('is-invalid');
  }
}

function showError(el: HTMLElement | null, input: HTMLInputElement | null, msg: string): void {
  if (el) el.textContent = msg;
  if (input) {
    input.classList.add('is-invalid');
    input.focus();
  }
}

function prefillMerkliste(messageTextarea: HTMLTextAreaElement | null, merklisteHidden: HTMLInputElement | null): void {
  const merklisteHeader = 'Gewünschte Geräte aus der Merkliste:';
  const productMap = resolveProductMap();
  const cartText = getCartData(localStorage, productMap);

  if (merklisteHidden) merklisteHidden.value = cartText;

  if (!messageTextarea) return;
  if (!cartText) {
    if (messageTextarea.value === merklisteHeader + '\n') {
      messageTextarea.value = '';
    }
    return;
  }

  const currentVal = messageTextarea.value;
  const hasMerklistePrefix = currentVal.indexOf(merklisteHeader) === 0;

  if (!currentVal || currentVal === merklisteHeader || currentVal === merklisteHeader + '\n') {
    messageTextarea.value = merklisteHeader + '\n' + cartText;
  } else if (hasMerklistePrefix) {
    messageTextarea.value = merklisteHeader + '\n' + cartText;
  }
}

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('.contact-form');
  if (!form) return;

  const submitBtn = form.querySelector<HTMLButtonElement>('.form-submit');
  const submitText = form.querySelector<HTMLElement>('.submit-text');
  const submitSpinner = form.querySelector<HTMLElement>('.submit-spinner');
  const messageTextarea = document.getElementById('message') as HTMLTextAreaElement | null;
  const merklisteHidden = document.getElementById('merkliste-items-hidden') as HTMLInputElement | null;

  // Date input: min=today
  const startInput = document.getElementById('rental_start') as HTMLInputElement | null;
  const today = getTodayISO();
  if (startInput) {
    startInput.min = today;
  }

  const errorStart = document.getElementById('error-start') as HTMLElement | null;
  if (startInput) {
    startInput.addEventListener('input', () => clearErrors(errorStart, startInput));
  }

  form.addEventListener('submit', (e) => {
    clearErrors(errorStart, startInput);
    const rentalStart = startInput ? startInput.value : '';
    if (rentalStart && rentalStart < today) {
      e.preventDefault();
      if (errorStart && startInput) showError(errorStart, startInput, 'Bitte wähle ein Datum in der Zukunft.');
      return;
    }

    // Store fresh cart data in hidden input for submission
    const productMap = resolveProductMap();
    const cartText = getCartData(localStorage, productMap);
    if (merklisteHidden) merklisteHidden.value = cartText;

    // Disable button and show spinner
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.style.display = 'none';
    if (submitSpinner) submitSpinner.style.display = 'inline-flex';
  });

  // Prefill textarea with merkliste items
  document.addEventListener('DOMContentLoaded', () => prefillMerkliste(messageTextarea, merklisteHidden));
  document.addEventListener('merkliste-prefill', () => prefillMerkliste(messageTextarea, merklisteHidden));
}