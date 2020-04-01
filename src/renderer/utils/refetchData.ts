import {
  endOfDay,
  format,
  isYesterday,
  startOfDay,
  startOfToday,
} from 'date-fns';

export const refetchData = (refetch: Function) => (value: string) => {
  const theDayBefore = isYesterday(new Date(value));
  refetch({
    startDate: value,
    ...(theDayBefore ? { endDate: format(startOfToday(), 'yyyy-MM-dd') } : {}),
  });
};

export const refetchCustom = (refetch: Function) => (
  startDate: string,
  endDate: string,
) => {
  refetch({
    startDate: format(startOfDay(new Date(startDate)), 'yyyy-MM-dd'),
    endDate: format(endOfDay(new Date(endDate)), 'yyyy-MM-dd'),
  });
};
