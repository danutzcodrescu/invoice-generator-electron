import { format, isYesterday, startOfToday } from 'date-fns';

export const refetchData = (refetch: Function) => (e: any) => {
  const theDayBefore = isYesterday(new Date(e.target.value));
  refetch({
    startDate: e.target.value,
    ...(theDayBefore ? { endDate: format(startOfToday(), 'yyyy-MM-dd') } : {}),
  });
};
