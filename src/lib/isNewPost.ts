import { isAfter, subHours } from "date-fns";

export function isNewPost(createdAt: string, hours = 1): boolean {
  if (!createdAt) return false;

  const createdDate = new Date(createdAt);
  if (isNaN(createdDate.getTime())) return false; // prevent invalid date issues

  const cutoff = subHours(new Date(), hours); // subtract X hours from current time
  return isAfter(createdDate, cutoff);
}
