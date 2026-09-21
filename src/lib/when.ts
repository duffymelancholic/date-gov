export function localISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function nextSaturday(from = new Date()) {
  const date = new Date(from);
  const offset = (6 - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + offset);
  return date;
}

export function formatVisit(date: string, time: string) {
  const stamp = new Date(`${date}T${time}:00`);
  if (Number.isNaN(stamp.getTime())) {
    return `${date} at ${time}`;
  }

  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(stamp);

  const clock = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(stamp);

  return `${day} at ${clock}`;
}
