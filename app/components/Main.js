var React        = require('react');
var ReactDOM     = require('react-dom');
var BookingFrame = require('.custom/BookingFrame.js');
// var PrettyForm = require('./PrettyForm.js');

var Main = React.createClass({
  render: function(){
    return (<div><BookingFrame /></div>)
  }
});

module.exports = Main;
