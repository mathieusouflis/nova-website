function timeAgo(timestamp) {
  // Convertir le timestamp en nombre si ce n'est pas déjà fait
  const date = new Date(Number(timestamp));

  if (isNaN(date)) {
    return "Invalid date";
  }

  const now = new Date();
  const timeDiff = Math.floor((now - date) / 1000); // Convertir en secondes

  const minutes = Math.floor(timeDiff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (timeDiff < 60) {
    return `${timeDiff} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 5) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

export { timeAgo };
