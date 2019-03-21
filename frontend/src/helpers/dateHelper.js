const monthNames = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Listopad",
  "Listopad",
  "Grudzien"
];

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}

export function dateDiffrence(dateOne, dateSecond) {
  const timestampOne = dateOne.getTime();
  const timestampSecond = dateSecond.getTime();

  return ((timestampOne - timestampSecond) / 1000 / 60 / 60 / 24).toFixed(0);
}

export function addDays(date, days) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + days,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}
export function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}
export function getMonth(date) {
  return monthNames[date.getMonth];
}
