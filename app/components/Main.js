var React        = require('react');
var ReactDOM     = require('react-dom');
var BookingFrame = require('./BookingFrame.js');
// var PrettyForm = require('./PrettyForm.js');

var Main = React.createClass({
  render: function(){
    return (<BookingFrame />)
  }
});

module.exports = Main;
