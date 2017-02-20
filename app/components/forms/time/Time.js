/*
* Time form that completes selecting date & time for booking
* First form out of three
*
* @ Jesse Ren 2016
*/
var React = require('react');
var ReactRouter = require('react-router');
var TimeSlot = require('./TimeSlot');
var CorporateCalendar = require('./CorporateCalendar');
var $ = require('jquery');

var Time = React.createClass({
  getInitialState: function(){
    return { checked: false,
     }
  },
  updateDateYear: function(data){
      var m = document.getElementsByClassName("timeslot")[0];
      console.log(this.props.nextForm);
      m.style.display = "block";
      $('html, body').animate({
        scrollTop: $('.timeslot').offset().top
      }, 1000); // Change Responsiveness
      this.props.update(1, data); // Calling parent passed in function
  },
  updateHour: function(data){
      var m = document.getElementsByClassName("timeslot")[0];
      m.style.display = "block";
      this.props.update(2, data); // Calling parent passed in function
  },

  render: function(){
    // Try to pass selected date, and checked information to Time Parent
    return <div id="componentTime" className="form form_one" style={{margin:"0 auto", display:"none"}} >
      <CorporateCalendar id="componentCalendar" className="calendar" checked={this.state.checked} parentFn={this.updateDateYear} />
      <TimeSlot nextForm={this.props.nextForm} id="componentTimeSlot" className="timeslot" parentFn={this.updateHour} />
    </div>
  }
})

module.exports = Time;
