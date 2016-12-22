/*
 * Calendar.js
 *
 * Holds self contained class constructor and update functions for Calendar Object
 * Accounts for leap years
 *
 * @ Jesse Ren 2016
 */
 
//Private
var privateVariable = true;

function Calendar(month, year) {
const MAXCALENDARS = 2;
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Days of Week Label
cal_months_labels = ['January', 'February', 'March', 'April',        // Month Label
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // End dates for months
  this.month       = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year        = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.firstDay    = new Date(this.year, this.month, 1);
  this.startingDay = this.firstDay.getDay();
  this.monthLength = 0;
  if (this.month == 1) { // February only!
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
      this.monthLength = 29;
    }
  }else {this.monthLength = cal_days_in_month[this.month]};
  // this.html = '';

  this.revealPrivate = function(){ return privateVariable;}
}
// Initializations
Calendar.prototype.nextMonth = function() {
  alert("nextMonth");
};
Calendar.prototype.prevMonth = function() {
  console.log("prevMonth");
};

module.exports = Calendar;
