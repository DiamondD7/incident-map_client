export function TimeAgo(date) {
  const now = new Date();
  const createdAt = new Date(date + "Z");
  const diff = Math.floor((now - createdAt) / 1000); // seconds

  if (diff < 60) return true;
  if (diff < 3600) return true;
  if (diff < 86400) return true;
  if (diff < 604800)
    return true;
    
  if (diff < 31536000)
    return false;

  return false;
}


export const getTimeRemaining = (endTime) => {
  const now = new Date();

  if(endTime === null) return null;

  const [hours, minutes, seconds] = endTime.split(":").map(Number);

  const dealEnd = new Date();
  dealEnd.setHours(hours, minutes, seconds, 0);

  const difference = dealEnd - now;

  if (difference <= 0) return null;

  const totalMinutes = Math.floor(difference / (1000 * 60));

  const hoursRemaining = Math.floor(totalMinutes / 60);
  const minutesRemaining = totalMinutes % 60;

  if (hoursRemaining > 0) {
    return `${hoursRemaining}h ${minutesRemaining}m left`;
  }

  return `${minutesRemaining}m left`;
};


export const getDealStatus = (startTime, endTime) => {
  if (!startTime || !endTime) return "Active soon";

  const now = new Date();

  const [startHours, startMinutes, startSeconds] = startTime
    .split(":")
    .map(Number);

  const [endHours, endMinutes, endSeconds] = endTime
    .split(":")
    .map(Number);

  const start = new Date();
  start.setHours(startHours, startMinutes, startSeconds || 0, 0);

  const end = new Date();
  end.setHours(endHours, endMinutes, endSeconds || 0, 0);

  // Normal deal: e.g. 10:00 → 17:00
  if (start <= end) {
    return now >= start && now <= end
      ? "Active"
      : "Active soon";
  }

  // Overnight deal: e.g. 17:00 → 02:00
  return now >= start || now <= end
    ? "Active"
    : "Active soon";
};


// export function TimeAgo(date) {
//   const now = new Date();
//   const createdAt = new Date(date + "Z");
//   const diff = Math.floor((now - createdAt) / 1000); // seconds

//   if (diff < 60) return `🔥${diff} sec ago`;
//   if (diff < 3600) return `🔥${Math.floor(diff / 60)} min ago`;
//   if (diff < 86400) return `🔥${Math.floor(diff / 3600)} hr ago`;
//   if (diff < 2592000)
//     return `${Math.floor(diff / 86400) > 1 ? `${Math.floor(diff / 86400)} days ago` : `🔥${Math.floor(diff / 86400)} day ago`}`
    
//   if (diff < 31536000)
//     return `${Math.floor(diff / 2592000)} month${
//       Math.floor(diff / 2592000) > 1 ? "s" : ""
//     } ago`;

//   return `${Math.floor(diff / 31536000)} year${
//     Math.floor(diff / 31536000) > 1 ? "s" : ""
//   } ago`;
// }