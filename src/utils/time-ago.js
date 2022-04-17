const intl = new Intl.RelativeTimeFormat("en");
const option = { year: "numeric", month: "short", day: "numeric" };

const getSeconds = (milliseconds) => milliseconds / 1000;
const getMinutes = (milliseconds) => milliseconds / (100 * 60);
const getHours = (milliseconds) => milliseconds / (1000 * 60 * 60);
const getDays = (milliseconds) => milliseconds / (1000 * 60 * 60 * 24);

const getTimeFormat = (date) => {
  const Now = new Date();
  const initDate = new Date(date);
  const milliseconds = Now - initDate;
  switch (true) {
    case getSeconds(milliseconds) < 60:
      return intl.format(Math.floor(-1 * getSeconds(milliseconds)), "seconds");
    case getMinutes(milliseconds) < 60:
      return intl.format(Math.floor(-1 * getMinutes(milliseconds)), "minutes");
    case getHours(milliseconds) < 24:
      return intl.format(Math.floor(-1 * getHours(milliseconds)), "hours");
    case getDays(milliseconds) < 30:
      return intl.format(Math.floor(-1 * getDays(milliseconds)), "days");
    default:
      return `on ${new Intl.DateTimeFormat("en", option).format(initDate)}`;
  }
};

export default getTimeFormat;
