export const dateForDateTimeInputValue = (date: Date) =>
  new Date(date.getTime() + date.getTimezoneOffset() * -60 * 1000)
    .toISOString()
    .slice(0, 19);

export const UTCDateToLocal = (date: string): string => {
  return Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(date));
};

export function daysAreEqual(a: Date, b: Date): boolean {
  return (
    a.getUTCDate() === b.getUTCDate() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCFullYear() === b.getUTCFullYear()
  );
}
