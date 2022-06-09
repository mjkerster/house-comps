const getShortFormDateUtc = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
  });
};

const numberofDaysFromToday = (date: string): number => {
  const DAY_IN_MS = 1000 * 60 * 60 * 24;
  const today = new Date();
  const newDate = new Date(date);
  const diffInTime = newDate.getTime() - today.getTime();
  return Number((diffInTime / DAY_IN_MS).toFixed(0));
};

export const Utils = {
  getShortFormDateUtc,
  numberofDaysFromToday,
};
