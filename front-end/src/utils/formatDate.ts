const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

const relativeFormatter = new Intl.RelativeTimeFormat("pt-BR", {
  numeric: "auto",
});

function toDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value);
}

/** 06 de nov. de 2026 */
export function formatDate(value: Date | string) {
  return dateFormatter.format(toDate(value));
}

/** 06 de nov. de 2026, 14:02 */
export function formatDateTime(value: Date | string) {
  return dateTimeFormatter.format(toDate(value));
}

/** "há 3 dias", "ontem", "há 2 horas" */
export function formatRelative(value: Date | string, now = new Date()) {
  const diffSeconds = Math.round((toDate(value).getTime() - now.getTime()) / 1000);
  const abs = Math.abs(diffSeconds);

  if (abs < 60) return relativeFormatter.format(diffSeconds, "second");
  if (abs < 3600)
    return relativeFormatter.format(Math.round(diffSeconds / 60), "minute");
  if (abs < 86400)
    return relativeFormatter.format(Math.round(diffSeconds / 3600), "hour");
  if (abs < 86400 * 30)
    return relativeFormatter.format(Math.round(diffSeconds / 86400), "day");
  if (abs < 86400 * 365)
    return relativeFormatter.format(
      Math.round(diffSeconds / (86400 * 30)),
      "month",
    );
  return relativeFormatter.format(
    Math.round(diffSeconds / (86400 * 365)),
    "year",
  );
}
