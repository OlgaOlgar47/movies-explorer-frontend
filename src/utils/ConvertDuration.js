export function convertDuration(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return hours === 0
      ? `${minutes}m`
      : minutes === 0
      ? `${hours}ч`
      : `${hours}ч ${minutes}м`;
  }
  