export const MANILA_TIME_ZONE = "Asia/Manila";

const dayFormatters = new Map();

export function dayKey(value, timeZone = MANILA_TIME_ZONE) {
  const date = value instanceof Date ? value : new Date(value);
  if (!dayFormatters.has(timeZone)) {
    dayFormatters.set(timeZone, new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }));
  }
  const parts = dayFormatters.get(timeZone).formatToParts(date);
  const get = type => parts.find(part => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function shiftDay(key, amount) {
  const [year, month, day] = key.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + amount));
  return date.toISOString().slice(0, 10);
}

export function buildDailyCounts(reviews, timeZone = MANILA_TIME_ZONE) {
  return reviews.reduce((counts, review) => {
    const key = dayKey(review.reviewed_at, timeZone);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

export function buildDailyReviewActivity(reviews, timeZone = MANILA_TIME_ZONE, includeDuration = () => null) {
  return reviews.reduce((days, review) => {
    const key = dayKey(review.reviewed_at, timeZone);
    const day = days[key] || { count: 0, timedCount: 0, totalSeconds: 0, firstAt: null, lastAt: null };
    const reviewedAt = new Date(review.reviewed_at).getTime();
    const seconds = includeDuration(review.review_duration_seconds);
    day.count += 1;
    if (seconds !== null) {
      day.timedCount += 1;
      day.totalSeconds += seconds;
    }
    day.firstAt = day.firstAt === null || reviewedAt < day.firstAt ? reviewedAt : day.firstAt;
    day.lastAt = day.lastAt === null || reviewedAt > day.lastAt ? reviewedAt : day.lastAt;
    days[key] = day;
    return days;
  }, {});
}

export function calculateStreak(counts, now = new Date(), timeZone = MANILA_TIME_ZONE) {
  const today = dayKey(now, timeZone);
  let cursor = counts[today] ? today : shiftDay(today, -1);
  let streak = 0;
  while (counts[cursor]) {
    streak += 1;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
}

export function calculateLongestStreak(counts) {
  const activeDays = Object.keys(counts)
    .filter(key => counts[key] > 0)
    .sort();
  let longest = 0;
  let current = 0;
  let previous = null;

  activeDays.forEach(key => {
    current = previous && shiftDay(previous, 1) === key ? current + 1 : 1;
    longest = Math.max(longest, current);
    previous = key;
  });

  return longest;
}

export function activityRange(counts, days = 140, now = new Date(), timeZone = MANILA_TIME_ZONE) {
  const today = dayKey(now, timeZone);
  return Array.from({ length: days }, (_, index) => {
    const date = shiftDay(today, index - days + 1);
    return { date, count: counts[date] || 0 };
  });
}

export function activityLevel(count) {
  if (!count) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

export function activityCalendar(counts, weeks = 53, now = new Date(), timeZone = MANILA_TIME_ZONE) {
  const today = dayKey(now, timeZone);
  const todayDate = new Date(`${today}T00:00:00Z`);
  const start = shiftDay(today, -(todayDate.getUTCDay() + (weeks - 1) * 7));
  const days = Array.from({ length: weeks * 7 }, (_, index) => {
    const date = shiftDay(start, index);
    return {
      date,
      count: date <= today ? counts[date] || 0 : null,
      future: date > today,
    };
  });
  const months = [];

  days.forEach((day, index) => {
    if (day.future || index % 7 !== 0) return;
    const weekEnd = days[Math.min(index + 6, days.length - 1)].date;
    const month = day.date.slice(0, 7);
    const endMonth = weekEnd.slice(0, 7);
    const markerMonth = endMonth !== month ? endMonth : month;
    if (months.at(-1)?.month === markerMonth) return;
    const labelDate = new Date(`${markerMonth}-01T00:00:00Z`);
    months.push({
      month: markerMonth,
      label: new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(labelDate),
      week: Math.floor(index / 7) + 1,
    });
  });

  return { days, months, weeks, start, today };
}
