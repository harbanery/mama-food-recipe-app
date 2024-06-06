import { formatDistanceToNow, format } from "date-fns";

export const formatDistance = (dateString) => {
  if (!dateString) {
    // Handling empty or null input
    return "Invalid date";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // Handling invalid date string
    return "Invalid date";
  }

  const now = new Date();
  const distanceInMilliseconds = now - date;

  const distanceInDays = distanceInMilliseconds / (1000 * 60 * 60 * 24);

  if (distanceInDays >= 7) {
    return format(date, "MMMM d, yyyy - HH:mm:ss");
  } else {
    return formatDistanceToNow(date, { addSuffix: true });
  }
};
