import { format } from 'date-fns';

export const formatTodayHeader = (): string => {
  const date = new Date();
  return format(date, "'Today • 'EEE, MMM d");
};

export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};
