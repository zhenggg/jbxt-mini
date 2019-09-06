const moment = require('moment.min.js');

function clientDate() {
  return moment().format('YYYY-MM-DD');
}

function utcDateToString(date) {
  return moment(date).add(8, 'h').format('YYYY-MM-DD');
}

function timestampToDate(timestamp) {
  var date = new Date(parseInt(timestamp));
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

  return Y + M + D;
}

module.exports = {
  clientDate: clientDate,
  utcDateToString: utcDateToString,

}
