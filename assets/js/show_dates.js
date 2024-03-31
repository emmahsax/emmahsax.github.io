/*
This will take all of the dates for the blog posts (written with the class "date-meta"),
and will render them in the readers' local time, instead of in UTC.

An incoming date/time will be formatted like this:
  2019-12-29 03:00:00 +0000
or like this:
  2019-12-28 21:00:00 -0600

And it will be turned into this (CST) if in UTC time:
  Sat Dec 28 2019 21:00:00 GMT-0600

And written like this:
  December 28, 2019
*/

const dates = Array.from(document.getElementsByClassName('date-meta-invisible'))
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

for (const htmlDate of dates) {
  const [year, month, day, hour, minute, second] = htmlDate.innerHTML.trim().split(/[^0-9]/)
  const timezone = htmlDate.innerHTML.split(' ').at(-1)
  let localDate = null

  if (timezone === '+0000') {
    // Get the local date when it's written as in UTC timezone
    localDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second))
  } else {
    // Get the written date in the local timezone (which may not be written timezone)
    const writtenDate = new Date(year, month - 1, day, hour, minute, second)

    // Convert written date in local timezone to UTC timezone
    const utcDateAsNumbers = writtenDate.getTime() - (timezone * 60 * 60 * 10)
    const utcDate = new Date(utcDateAsNumbers)
    const utcDay = utcDate.getDate()
    const utcHour = utcDate.getHours()
    const utcMilliseconds = utcDate.getMilliseconds()
    const utcMinute = utcDate.getMinutes()
    const utcMonth = utcDate.getMonth()
    const utcYear = utcDate.getFullYear()

    // Get the local date when it's written as in UTC timezone
    localDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, utcHour, utcMinute, utcMilliseconds))
  };

  htmlDate.innerHTML = monthNames[localDate.getMonth()] + ' ' + localDate.getDate() + ', ' + localDate.getFullYear()
  htmlDate.className = 'date-meta'
};
