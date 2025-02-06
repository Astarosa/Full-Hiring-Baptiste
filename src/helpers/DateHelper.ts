export function epochToFormattedTime(epochSeconds: EpochTimeStamp) {
  const date = new Date(epochSeconds * 1000);
  return date.toLocaleTimeString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function formattedDateToEpoch(date: number) {
  return Math.ceil((date - Date.now()) / 1000);
}