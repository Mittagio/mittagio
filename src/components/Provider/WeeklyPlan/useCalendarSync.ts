import type { WeekPlan } from './useWeeklyPlan';

/** Holt den Montag der Kalenderwoche für ein gegebenes Jahr */
function getMondayOfWeek(year: number, week: number): Date {
  const jan1 = new Date(year, 0, 1);
  const dayOfWeek = (jan1.getDay() + 6) % 7; // Mo=0, So=6
  const firstMonday = new Date(jan1);
  firstMonday.setDate(jan1.getDate() - dayOfWeek + 1);
  const monday = new Date(firstMonday);
  monday.setDate(firstMonday.getDate() + (week - 1) * 7);
  return monday;
}

/** Formatiert Datum für ICS (YYYYMMDDTHHmmss) */
function toICSTimestamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/** Escaped für ICS-Text (Kommas, Semikolons, Backslash) */
function icsEscape(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/** Standard: Mittagsgeschäft 11:30–15:30 (4 Stunden) */
const LUNCH_START_HOUR = 11;
const LUNCH_START_MIN = 30;
const LUNCH_DURATION_HOURS = 4;

/** Erinnerung: Am Morgen des Ereignisses, 08:00 Uhr */
const REMINDER_HOUR = 8;
const REMINDER_MIN = 0;

/**
 * Erzeugt .ics Inhalt für die 15 Gerichte (Mo–Fr, 3 Slots).
 * Nutzt START_DATETIME falls gesetzt, sonst KW + Tag.
 */
export function syncToPrivateCalendar(
  weekPlan: WeekPlan,
  aktiveKW: number,
  year?: number
): string {
  const y = year ?? new Date().getFullYear();
  const monday = getMondayOfWeek(y, aktiveKW);

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mittagio//Wochenplan//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (let day = 0; day < 5; day++) {
    for (let slot = 0; slot < 3; slot++) {
      const entry = weekPlan[day][slot];
      if (!entry) continue;

      let startDate: Date;
      if (entry.startDatetime) {
        startDate = new Date(entry.startDatetime);
      } else {
        startDate = new Date(monday);
        startDate.setDate(monday.getDate() + day);
        startDate.setHours(LUNCH_START_HOUR, LUNCH_START_MIN, 0, 0);
      }

      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + LUNCH_DURATION_HOURS, endDate.getMinutes(), 0, 0);

      const reminderDate = new Date(startDate);
      reminderDate.setHours(REMINDER_HOUR, REMINDER_MIN, 0, 0);

      const title = `🍴 Verkauf: ${entry.dish.name}`;
      const desc = `Preis: ${entry.dish.lastPrice} | Status: Aktiviert über Wochenplan.`;

      const dtStart = toICSTimestamp(startDate);
      const dtEnd = toICSTimestamp(endDate);

      lines.push(
        'BEGIN:VEVENT',
        `UID:mittagio-${entry.dishId}-${day}-${slot}-${aktiveKW}@mittagio`,
        `DTSTAMP:${toICSTimestamp(new Date())}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${icsEscape(title)}`,
        `DESCRIPTION:${icsEscape(desc)}`,
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${icsEscape(`🍴 Heute: ${entry.dish.name}`)}`,
        `TRIGGER;VALUE=DATE-TIME:${toICSTimestamp(reminderDate)}`,
        'END:VALARM',
        'END:VEVENT'
      );
    }
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Exportiert den Kalender als .ics Datei und triggert Download oder Share.
 */
export function downloadCalendarIcs(
  weekPlan: WeekPlan,
  aktiveKW: number,
  year?: number
): void {
  const ics = syncToPrivateCalendar(weekPlan, aktiveKW, year);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const filename = `mittagio-kw${aktiveKW}-wochenplan.ics`;

  const file = new File([blob], filename, { type: 'text/calendar' });

  if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
    navigator.share({
      files: [file],
      title: `Wochenplan KW ${aktiveKW}`,
      text: 'Mittagio-Wochenplan für deinen Kalender',
    }).catch(() => {
      triggerDownload(blob, filename);
    });
  } else {
    triggerDownload(blob, filename);
  }
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
