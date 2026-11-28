const WORD_NUMBERS = {
  ein: 1,
  einem: 1,
  einer: 1,
  eine: 1,
  zwei: 2,
  drei: 3,
  vier: 4,
  fünf: 5,
  sechs: 6,
  sieben: 7,
  acht: 8,
  neun: 9,
  zehn: 10,
  elf: 11,
  zwölf: 12,
};

const NUMBER = `(\\d+|${Object.keys(WORD_NUMBERS).sort((a, b) => b.length - a.length).join('|')})`;
const toNumber = (value) => (/^\d+$/.test(value) ? Number(value) : WORD_NUMBERS[value]);

function shiftDays(reference, days) {
  const date = new Date(reference);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - days);
  return date;
}

function shiftMonths(reference, months) {
  const date = new Date(reference);
  const day = date.getUTCDate();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() - months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return date;
}

export function relativeDateInfo(description, reference = new Date()) {
  const text = String(description || '')
    .toLowerCase()
    .replace(/^bearbeitet:\s*/, '')
    .trim();

  if (text === 'heute') return { time: shiftDays(reference, 0).toISOString(), datePrecision: 'day' };
  if (text === 'gestern') return { time: shiftDays(reference, 1).toISOString(), datePrecision: 'day' };

  const dayMatch = text.match(new RegExp(`^vor ${NUMBER} tag(?:en)?$`));
  if (dayMatch) return { time: shiftDays(reference, toNumber(dayMatch[1])).toISOString(), datePrecision: 'day' };

  const weekMatch = text.match(new RegExp(`^vor ${NUMBER} woche(?:n)?$`));
  if (weekMatch) return { time: shiftDays(reference, toNumber(weekMatch[1]) * 7).toISOString(), datePrecision: 'day' };

  const monthMatch = text.match(new RegExp(`^vor ${NUMBER} monat(?:en)?$`));
  if (monthMatch) {
    const date = shiftMonths(reference, toNumber(monthMatch[1]));
    date.setUTCDate(1);
    return { time: date.toISOString(), datePrecision: 'month' };
  }

  const yearMatch = text.match(new RegExp(`^vor ${NUMBER} jahr(?:en)?$`));
  if (yearMatch) {
    const date = shiftMonths(reference, toNumber(yearMatch[1]) * 12);
    date.setUTCDate(1);
    date.setUTCMonth(0);
    return { time: date.toISOString(), datePrecision: 'year' };
  }

  return null;
}
