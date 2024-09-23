function centuryConverter(year) {
  const startDate = year.toString().slice(0, 2) + "00";
  const endDate = year.toString().slice(0, 2) + "99";

  const centuryDates = { startDate: startDate, endDate: endDate };
  return centuryDates;
}

export default centuryConverter;
