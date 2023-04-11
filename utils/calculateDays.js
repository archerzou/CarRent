export const calculateDays = (date1, date2) => {
  const convert1 = Date.parse(date1);
  const convert2 = Date.parse(date2);
  const difference = convert2 - convert1;
  const result = Math.ceil(difference / (1000 * 3600 * 24));
  return result;
};
