import { formatDistanceToNow, format } from "date-fns";

export const formatDistance = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const distanceInMilliseconds = now - date;

  const distanceInDays = distanceInMilliseconds / (1000 * 60 * 60 * 24);

  if (distanceInDays >= 7) {
    return format(date, "MMMM d, yyyy - HH:mm:ss");
  } else {
    return formatDistanceToNow(date, { addSuffix: true });
  }
};
