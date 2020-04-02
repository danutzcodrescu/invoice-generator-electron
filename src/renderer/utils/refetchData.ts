import { endOfDay, format, isYesterday, startOfDay } from 'date-fns';

export const refetchData = (refetch: Function) => (value: string) => {
  const theDayBefore = isYesterday(new Date(value));
  refetch({
    startDate: value,
    ...(theDayBefore ? { endDate: value } : { endDate: undefined }),
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
