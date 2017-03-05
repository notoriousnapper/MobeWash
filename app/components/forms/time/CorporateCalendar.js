/*
* Calendar Component that displays available booking dates based on
* company data, current month and year, and booking data from acuity.
*
* @ Jesse Ren 2016
*/
var React = require('react');
var ReactRouter = require('react-router');
var Hover = require('../../../components/custom/Hover');
var Calendar = require('../../../../public/js/Calendar.js');
// Data
const MAXCALENDARS = 2;
var cal_days_labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Days of Week Label
var cal_months_labels = ['January', 'February', 'March', 'April',        // Month Label
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // End dates for months


var companyData =
[
  {
    name: "DayBreak Games",
    day: 3,
    location: "2222 San Francisco",
    range: "11:00 am-5:00 pm" // Should be changed to time objects -- Later iteration
  }
  , {
    name: "Illumina",
    day: 4,
    location: "0000 San Francisco",
    range: "11:00 am-5:00 pm" // Should be changed to time objects -- Later iteration
  }
];
// So you don't mess up the year or month
//
var dt = new Date();
var y = dt.getFullYear();
var m = dt.getMonth();
console.log("month: "+ m); // Where 0 is January
var cal = new Calendar(m , y); // This is actually December
// Initializations


/* Functions for valid day */
function daysInMonth(m, y) { // m is 0 indexed: 0-11
    switch (m) {
        case 1 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 : case 3 : case 5 : case 10 :
            return 30;
        default :
            return 31
    }
}

function isValid(d, m, y) {
    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}




var CorporateCalendar = React.createClass({
  getInitialState: function(){
    return {
      counter: 0,
      cal1 : cal,
      companies: companyData,
      currentCompany: companyData[0]
    }
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      company: nextProps.company
  });
},
  selectDate: function(day){
    console.log("Work");

    var dayStr = parseInt(day);
    if(day%10 == day){
      dayStr = "0" + dayStr;
    }
    var monthStr = "";
    var month = this.state.cal1.month + 1;
    // ^ Above is important, because calendar schedules under 00 for Januaray
    if(month%10 ==  month){
      monthStr = "0" + month;
    }
    else{
      monthStr = month.toString();
    }

    var str = this.state.cal1.year + "-" +  monthStr + "-" + dayStr;
    this.props.parentFn(str);
    // alert("Day is: " + day + " & month is: " + this.state.cal1.monthString);
  },
  switchCompany: function(companyID){
    this.setState({
      currentCompany: this.state.companies[companyID]
    });
  },
  nextCalendar: function(){
    if(this.state.counter < 2){ // Book two months in advance
    // console.log("previous calendar" + JSON.stringify(this.state.cal1, null, 4));
      if(!(this.state.counter > MAXCALENDARS)){
        this.state.cal1.nextMonth();
        this.setState({  // Need to call function for a rerender
          counter: this.state.counter + 1,
          cal1: this.state.cal1
        })
      }
    }
    // console.log("new calendar" + JSON.stringify(this.state.cal1, null, 4));
  },
  prevCalendar: function(){
    if(this.state.counter > -1) { // See previous months bookings
    // console.log("previous calendar" + JSON.stringify(this.state.cal1, null, 4));
      if(!(this.state.counter > MAXCALENDARS)){
        this.state.cal1.prevMonth();
        this.setState({  // Need to call function for a rerender
          counter: this.state.counter - 1,
          cal1: this.state.cal1
        })
      }
    }
    // console.log("new calendar" + JSON.stringify(this.state.cal1, null, 4));

  },
  render: function(){


    var topStyle={
      height: '100px', width: '100px', textAlign: 'right', marginTop: '10px', paddingLeft: '4px', paddingRight: '4px',
      fontFamily: 'Helvetica Neue', backgroundColor: '#444444b', borderColor:"black"
    };
    var headStyle={ // For The Month Titles
      height: '30px', width: '100px', textAlign: 'center', marginTop: '10px', marginBottom: '0px', paddingTop: '10px',
      paddingLeft: '4px', paddingRight: '4px', paddingBottom: "10px", fontFamily: 'Helvetica Neue', fontWeight: '200px', fontSize: '14px', backgroundColor: '#444444',
      borderColor:"black", color: "white"};

      var hoverStyle={
        height: '40px', width: '100px', textAlign: 'center',
        paddingLeft: '4px',  fontFamily: 'Helvetica Neue', fontSize: '1.4vw', backgroundColor: 'white',
        borderColor:"black", color: '#CBCBCB', padding: "0", margin: "0"
      };
      var defaultStyle={
        height: '40px', width: '100px', textAlign: 'right', verticalAlign: 'top',
        paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica Neue', fontSize: '1.3vw', backgroundColor: 'white',
        borderColor:"black", color: '#ADADAB' ,  margin: '0'
      };



      /* Major code for filling in days */
      // get first day of month
      //
      var startingDay = this.state.cal1.startingDay;
      var monthLength = this.state.cal1.monthLength;

      var day = 1;
      var weekday = 6;           // Weekday counter -- set depending on first weekday label on calendar
      var validDay = false;

      var temp = [], temp2 = [], comp = [], calHTML, day = 1, item = [];


      var self = this;
      // this.selectDate();

      function decorateCell(companyData, inputDay, validDay, weekday){
      // THIS.selectDate();
        // Day of the week that is available for a company
        // Should be a single "day" after this
        var days = companyData.day;
        // alert(days);
        // var days     = companyData.map(function(c){
        //   return c.day
        // })
        // Default Options
        var company        = null;
        var rowStyle = defaultStyle;
        var content     = <div></div>
        var clicker  = function(){ // Dummy function
        };
        // Company Options
        if(validDay){
          // Default
          content = <div style={{}}>{day}</div>
          for(var k = 0; k < 1; k++){
            if(weekday == days){
              rowStyle = hoverStyle;
              company  = companyData;
              content  = <Hover ><div style={{textAlign:'right', marginRight: "10px"}}>{inputDay}</div> {company.name}  <br/>  {company.range} </Hover>;
              clicker  = function(){  self.selectDate(inputDay); // Signal to parentFn
               }
              break;
            }
          }
          // console.log("weekday" + weekday);
          // console.log("corporate" + days[k]);
        }
        else if(inputDay>20){ // Specific Case
          day = 1; // Counts as 0, essentially, so when updated becomes 1
          content = <div style={{}}>{day}</div>;
        }
        else {
          console.log("hrm");
          day = 0; // Counts as 0, essentially, so when updated becomes 1
        }
        return <th onClick={clicker}style={rowStyle} ><div  style={{height:'70px',minHeight: '50px', width:'100%'}}> {content} </div></th>
      }
      comp.push();
      // Week Day Labels
      for(var i = 0; i <= 6; i++ ){
        temp = <th style={headStyle}>{cal_days_labels[i]} <br/>{}</th>;
        temp2.push(temp);
      }
      comp.push(<tr> {temp2} </tr>);
      temp = [];
      temp2 = [];

      // Important - because day was set to null for padding of first few days
      // day = 1;
      day = null; // KEY --> Because it resets to 1 instead of 0(null)
      for (var i = 0; i < 5; i++) {  // this loop is for is weeks (rows)
        for (var j = 0; j <= 6; j++) {  // this loop is for weekdays (cells)
          if (day <= monthLength && (i > 0 || j >= startingDay)) {  // Sets up for starting day
            //console.log("first day here!" + day);
            item = day;
            day++;
            if(day == monthLength + 1){ // Important so it resets
              // day++;
              validDay = false;
            }
            else{
              validDay = true;
            }
            // console.log(item);
          }
          else{ // For days after month end
            validDay = false;
          }
          // temp = <th style={defaultStyle}>{item} <br/>{}</th>;
            console.log(day);
          temp = decorateCell(this.state.currentCompany, day, validDay, weekday);
          temp2.push(temp);
          if(weekday<6) weekday++;  else { weekday = 0; } // Update weekday
        }
        comp.push(<tr> {temp2} </tr>);
        // stop making rows if we've run out of days
        if (day > monthLength) {
          break;
        } else {
        }
        // Clear temporaries
        temp = [];
        temp2 = [];
        item = [];
        validDay = false;
      }
      calHTML = comp;
      comp = [];


      return (<div style={{padding: "10px 20px 10px 20px", backgroundColor:"#FBFDFF"}}>
      <table className="corp-calendar" style={{width:"100%", borderWidth: "0 1px 1px 1px", borderColor: "black"}}>
        <tr> <th style={{minWidth: "20px", padding:"20px 10px", borderColor:"black", borderTopWidth:"0", textAlign:"center",
        backgroundColor:"#5EA6E5", color: "white", fontSize: "16px"}}
          colSpan="7">
          <button style={{float:"left", width: "100px", padding: "10px 20px 10px 20px"}}
           onClick={this.prevCalendar}> Previous
            </button>
          {this.state.cal1.monthString + " " + this.state.cal1.year}
          <button style={{float:"right", width: "100px", padding: "10px 20px 10px 20px"}}
           onClick={this.nextCalendar}> Next
           </button>
        </th></tr>
      <tbody> {calHTML} </tbody> </table></div>
    );
    }
  })


  module.exports = CorporateCalendar;


  // Useful Alert on line 73
