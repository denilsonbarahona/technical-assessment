const intl = new Intl.RelativeTimeFormat("en");
const option = { year: "numeric", month: "short", day: "numeric" };

/** functions to calculate seconds, minutes, hours or day from milliseconds*/
const getSeconds = (milliseconds) => milliseconds / 1000;
const getMinutes = (milliseconds) => milliseconds / (100 * 60);
const getHours = (milliseconds) => milliseconds / (1000 * 60 * 60);
const getDays = (milliseconds) => milliseconds / (1000 * 60 * 60 * 24);

/**
 * function to get the time that has passed from a specific time
 * @param {*} date: the start date
 * @returns time passed from a specific time example: 2 seconds ago
 */
const getTimeFormat = (date) => {
  /**current date */
  const Now = new Date();
  const initDate = new Date(date);
  /** getting the milliseconds between 2 date */
  const milliseconds = Now - initDate;
  switch (true) {
    /**check if the time passed are seconds */
    case getSeconds(milliseconds) < 60:
      return intl.format(Math.floor(-1 * getSeconds(milliseconds)), "seconds");
    /**check if the time passed are minutes */
    case getMinutes(milliseconds) < 60:
      return intl.format(Math.floor(-1 * getMinutes(milliseconds)), "minutes");
    /**check if the time passed are hours */
    case getHours(milliseconds) < 24:
      return intl.format(Math.floor(-1 * getHours(milliseconds)), "hours");
    /**check if the time passed are days */
    case getDays(milliseconds) < 30:
      return intl.format(Math.floor(-1 * getDays(milliseconds)), "days");
    /** by default, we return the same date formatted as: nov 27, 2021 */
    default:
      return `on ${new Intl.DateTimeFormat("en", option).format(initDate)}`;
  }
};

export default getTimeFormat;
