export function countWorkingDays(startDate, endDate) {
  let _startDate = new Date(startDate);
  let _endDate = new Date(endDate);

  // Calculate the total number of milliseconds in a day
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  // Calculate the total number of days between start_date and end_date
  const totalDays = Math.floor((_endDate - _startDate) / oneDayInMilliseconds) + 1;

  // Calculate the number of weeks and remaining days
  const numWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Calculate the number of working days in the complete weeks
  const workingDaysInWeeks = numWeeks * 5;

  // Calculate the number of working days in the remaining days
  const workingDaysInRemaining = Math.min(remainingDays, 5);

  // Calculate the total number of working days, including the start date
  let totalWorkingDays = workingDaysInWeeks + workingDaysInRemaining;

  // Adjust for the start date (If it falls on a weekend, subtract 1)
  const startDay = _startDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  if (startDay === 0 || startDay === 6) {
    totalWorkingDays--;
  }

  return totalWorkingDays;
}