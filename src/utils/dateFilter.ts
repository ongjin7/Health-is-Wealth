import { TimeRange } from '../types';

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  day: 'Today: Sunday, 6 Sep 2026',
  week: '31 Aug – 6 Sep 2026',
  month: '8 Aug – 6 Sep 2026',
  year: '1 Jan – 6 Sep 2026',
};

/**
 * Filter items by date string (YYYY-MM-DD) based on selected TimeRange
 * Relative to the app's current date: Sunday, 6 September 2026
 */
export const isDateInTimeRange = (dateStr: string, range: TimeRange): boolean => {
  if (!dateStr) return false;

  // Day: Today's date (or items logged on 2026-09-06)
  if (range === 'day') {
    return dateStr === '2026-09-06';
  }

  // Week: Monday 31 Aug 2026 to Sunday 6 Sep 2026 (7-day calendar week)
  if (range === 'week') {
    return dateStr >= '2026-08-31' && dateStr <= '2026-09-06';
  }

  // Month: Past 30 Days (8 Aug 2026 to 6 Sep 2026)
  if (range === 'month') {
    return dateStr >= '2026-08-08' && dateStr <= '2026-09-06';
  }

  // Year: Year 2026 to date (1 Jan 2026 to 6 Sep 2026)
  if (range === 'year') {
    return dateStr.startsWith('2026-') && dateStr <= '2026-09-06';
  }

  return true;
};
