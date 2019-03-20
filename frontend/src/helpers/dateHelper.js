export function formatDate(dateStr) {
  const date = new Date(dateStr);
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
