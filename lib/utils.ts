import { format, isToday, parseISO } from "date-fns";

export const getDay = (dateString: string) => {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return "Today";
  }

  return format(date, "EEEE");
};

export const getHour = (dateString: string) => {
  const time = new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};
