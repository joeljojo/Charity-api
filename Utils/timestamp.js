// Get current Timestamp
const { DateTime } = require('luxon');

const currentTimestamp = () => {
  const dt = DateTime.now().c;
  const { year } = dt;
  const month = dt.month < 10 ? `0${dt.month}` : dt.month;
  const day = dt.day < 10 ? `0${dt.day}` : dt.day;
  const hour = dt.hour < 10 ? `0${dt.hour}` : dt.hour;
  const minute = dt.minute < 10 ? `0${dt.minute}` : dt.minute;
  const second = dt.second < 10 ? `0${dt.second}` : dt.second;
  return `${year}${month}${day}${hour}${minute}${second}`;
};

module.exports = { currentTimestamp };
