/*
* Calendar Component that displays available booking dates based on
* company data, current month and year, and booking data from acuity.
*
* @ Jesse Ren 2016
*/


var React = require('react');
var ReactRouter = require('react-router');
var Hover = require('../components/custom/Hover');
var Calendar = require('../../public/js/Calendar.js');
// Data
var companyData =
[
  {
    name: "DayBreak Games",
    day: 3,
    location: "2222 San Francisco",
    range: "11:00am-5pm" // Should be changed to time objects -- Later iteration
  },
  {
    name: "Illumina",
    day: 4,
    location: "0000 San Francisco",
    range: "11:00am-5pm" // Should be changed to time objects -- Later iteration
  },
]

/* React */
// Somehow this code doesn't translate past - etc.
// cal.generateHTML();
// var html = cal.getHTML();
// var html = document.write(cal.getHTML());
// Initial Calendar Object
var cal = new Calendar(11,2016);
// Initializations
var temp = [], temp2 = [], comp = [], calHTML, day = 1, item = [];

var CorporateCalendar = React.createClass({
  getInitialState: function(){
    return {
      counter: 0,
      cal1 : cal
    }
  },
  nextCalendar: function(){
    console.log("previous calendar" + JSON.stringify(this.state.cal1, null, 4));
    if(!(this.state.counter > MAXCALENDARS)){
      var newCal = this.state.cal1;
      if(newCal.month != 12) newCal.month = this.state.cal1.month + 1; // Update Calendar
      else {  // New Year, update year and month
        newCal.month = 1;
        newCal.year = this.state.cal1.year +1;
      }
      // Make calculations for leap year
      this.setState({
        counter: this.state.counter++,
        cal1: newCal
      })
    }
    console.log("previous calendar" + JSON.stringify(this.state.cal1, null, 4));
  },
  prevCalendar: function(){

  },
  render: function(){
    var topStyle={
      height: '100px', width: '100px', textAlign: 'right', marginTop: '10px', paddingLeft: '4px', paddingRight: '4px',
      fontFamily: 'Helvetica', backgroundColor: '#444444b', borderColor:"black"
    };
    var headStyle={
      height: '30px', width: '100px', textAlign: 'center', marginTop: '10px', marginBottom: '0px', paddingTop: '10px',
      paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '14px', backgroundColor: '#444444',
      borderColor:"black", color: '#ADADAB' };
      var chosenStyle={
        height: '40px', width: '100px', textAlign: 'right', marginTop: '10px', marginBottom: '0px', paddingTop: '10px',
        paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '12px', backgroundColor: '#7A7A7A',
        borderColor:"black", color: '#ADADAB'
      };
      var hoverStyle={
        height: '40px', width: '100px', textAlign: 'center',
        paddingLeft: '4px',  fontFamily: 'Helvetica', fontSize: '12px', backgroundColor: '#7A7A7A',
        borderColor:"black", color: '#ADADAB', padding: "0", margin: "0"
      };
      var defaultStyle={
        height: '40px', width: '100px', textAlign: 'right', verticalAlign: 'top',
        paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '12px', backgroundColor: 'white',
        borderColor:"black", color: '#ADADAB' , padding: '0', margin: '0'
      };


      /* Major code for filling in days */
      // get first day of month
      //
      var startingDay = this.state.cal1.startingDay;
      var monthLength = this.state.cal1.monthLength;


      var day = 1;
      var weekday = 6;           // Weekday counter -- set depending on first weekday label on calendar
      var validDay = false;

      function decorateCell(companyData, day, validDay, weekday){
        console.log(day);
        var days     = companyData.map(function(c){
          return c.day
        })
        // Default Options
        var company        = null;
        var rowStyle = defaultStyle;
        var content     = <div></div>
        var clicker  = ()=>{};

        // Company Options
        if(validDay){
          // Default
          content = <div style={{}}>{day}</div>
          for(var k = 0; k <days.length; k++){
            if(weekday == days[k]){
              // rowStyle = chosenStyle;
              rowStyle = hoverStyle;
              company  = companyData[k];
              content  = <Hover><div style={{textAlign:'right'}}>{day}</div> {company.name}  <br/>  {company.range} </Hover>;
              // clicker  = self.selectDate;
              break;
            }
          }
          console.log("weekday" + weekday);
          console.log("corporate" + days[k]);
        }
        else{
          day = null;
        }
        return <th style={rowStyle} ><div style={{height:'40px', width:'100px'}}> {content} </div></th>
      }

      comp.push(<tr> <th style={{textAlign:"center"}} colSpan="7"> {cal_months_labels[this.state.cal1.month]}</th></tr>);
      // Week Day Labels
      for(var i = 0; i <= 6; i++ ){
        temp = <th style={headStyle}>{cal_days_labels[i]} <br/>{}</th>;
        temp2.push(temp);
      }
      comp.push(<tr> {temp2} </tr>);
      temp = [];
      temp2 = [];

      for (var i = 0; i < 5; i++) {  // this loop is for is weeks (rows)
        for (var j = 0; j <= 6; j++) {  // this loop is for weekdays (cells)
          if (day <= monthLength && (i > 0 || j >= startingDay)) {  // Sets up for starting day
            item = day;
            day++;
            validDay = true;
            console.log(day);
          }
          // temp = <th style={defaultStyle}>{item} <br/>{}</th>;
          temp = decorateCell(companyData, day, validDay, weekday);
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
      return <div>
      <button onClick={this.prevCalendar}> Prev </button>
      <button onClick={this.nextCalendar}> Next </button>
      <table> <tbody> {calHTML} </tbody> </table></div>
    }
  })


  module.exports = CorporateCalendar;
