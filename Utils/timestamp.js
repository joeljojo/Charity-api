// Get current Timestamp
const { DateTime } = require('luxon');

const currentTimestamp = () => {
  const dt = DateTime.now().c;
  return `${dt.year}${dt.month}${dt.day}${dt.hour}${dt.minute}${dt.second}`;
};

module.exports = { currentTimestamp };
