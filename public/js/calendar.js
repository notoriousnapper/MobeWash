/*
 * Calendar.js
 *
 * Holds self contained class constructor and update functions for Calendar Object
 * Accounts for leap years
 * Months numbered 0-11
 * @ Jesse Ren 2016
 */

//Private
var privateVariable = true;

function Calendar(month, year) {
  this.month       = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year        = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.revealPrivate = function(){ return privateVariable;}
  this.initialize();
  this.printFields();
}
// Initializations
/* Initializes peripheral variables, such as firstDay, startingDay, etc. */
Calendar.prototype.initialize = function(){
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Days of Week Label
cal_months_labels = ['January', 'February', 'March', 'April',        // Month Label
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // End dates for months
  this.monthString = cal_months_labels[this.month]; // By arrays start at 1, offset//
  this.firstDay    = new Date(this.year, this.month, 1);
  this.startingDay = this.firstDay.getDay();
  this.monthLength = 0;
  if (this.month == 1) { // February only!

    console.log("Its February!");
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
      this.monthLength = 29;
    }
    else {
      console.log("not working?" + cal_days_in_month[this.month]);
      console.log(this.month);
      this.monthLength = cal_days_in_month[this.month]}; //offset
  }else {
      console.log(this.month);

    if(this.month == 0){ console.log("It's Janvier!");
      console.log(this.month);
    }
    console.log("not working?" + cal_days_in_month[this.month]);
    console.log(this.month);
    this.monthLength = cal_days_in_month[this.month]}; //offset
}

Calendar.prototype.nextMonth = function(){
  if(this.month === 11){
    this.month = 0;
    this.year++; // Its a new year!
    this.initialize();
  }
  else{
    this.month++;
    this.initialize();
    this.printFields();
  }
};

Calendar.prototype.prevMonth = function() {
  console.log("prevMonth");
  if(this.month === 0){
    this.month = 11;
    this.year--; // Its a new year!
    this.initialize();
  }
  else{
    this.month--;
    this.initialize();
    this.printFields();
  }
};


Calendar.prototype.printFields = function(){
  console.log(JSON.stringify(this, null, 4));
}

module.exports = Calendar;
