export function getCronToken(name: string = 'default'): string {
  return `CronSchedule_${name}`;
}
