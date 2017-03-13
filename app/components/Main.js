var React        = require('react');
var ReactDOM     = require('react-dom');
var BookingFrame = require('./BookingFrame.js');
var WasherCalendar = require('./internal/WasherCalendar.js');
// var PrettyForm = require('./PrettyForm.js');

var Main = React.createClass({
  render: function(){
    return (<div>
      <BookingFrame />
      <WasherCalendar />
       </div>)
  }
});

module.exports = Main;
