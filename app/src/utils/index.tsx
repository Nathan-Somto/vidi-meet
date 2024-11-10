type DateType = Date | string | number;
export const randomUID = () => Math.random().toString(36).slice(2);
export const convertToDate = (date: DateType) => {
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
};
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
export const formatDate = (date: DateType) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(convertToDate(date));
};
export const getMeridiem = (date: string) => {
  return date.slice(date.length - 2);
};
export const splitIntoMeridiemAndTime = (date: string): ReadonlyArray<string> => {
  const time = date.slice(0, date.length - 2);
  const meridiem = getMeridiem(date);
  return [time, meridiem];
};
export const getDuration = (startTime: DateType, endTime: DateType) => {
  const start = convertToDate(startTime);
  const end = convertToDate(endTime);
  return end.getTime() - start.getTime();
};
export const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export const formatTimeRange = (startTime: DateType, endTime: DateType) => {
  const localStartTime = convertToDate(startTime);
  const localEndTime = convertToDate(endTime);
  const formattedStart = formatDateTime(localStartTime);
  const formattedEnd = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(
    localEndTime
  );
  return `${formattedStart} - ${formattedEnd}`;
};
export const formatTotalTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');
};
type GetNameOpts = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  fullName?: string | null;
};
export const getName = ({ firstName, lastName, username }: GetNameOpts) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
  return fullName || username || 'No Name';
};
