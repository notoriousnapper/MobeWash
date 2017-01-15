var React        = require('react');
var ReactDOM     = require('react-dom');
var BookingFrame = require('.BookingFrame.js');
// var PrettyForm = require('./custom/PrettyForm.js');

var Main = React.createClass({
  render: function(){
    return (<div><BookingFrame /></div>)
  }
});

module.exports = Main;
