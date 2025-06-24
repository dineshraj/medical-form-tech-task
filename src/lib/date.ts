export const modifyDate = (date: string) => {
  const newDate = new Date(date);

  const formattedDate = newDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return formattedDate;
};

export const modifyTime = (date: string) => {
  const newDate = new Date(date);

  const formattedTime = newDate.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return formattedTime;
};
