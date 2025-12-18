export default function FormatEventDate({
  startedAt,
  endedAt,
  timeZone = 'America/Los_Angeles',
  justHours = false,
}: {
  startedAt: string;
  endedAt: string;
  timeZone?: string;
  justHours?: boolean;
}): string {
  const start = new Date(startedAt);
  const end = new Date(endedAt);

  const datePart = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(start);

  const startHour = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone,
  }).format(start);

  const endHour = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone,
  }).format(end);

  const timeZoneName =
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'short',
    })
      .formatToParts(start)
      .find((p) => p.type === 'timeZoneName')?.value ?? '';
  if (justHours) return `${startHour} - ${endHour} ${timeZoneName}`;
  return `${datePart} · ${startHour} - ${endHour} ${timeZoneName}`;
}
