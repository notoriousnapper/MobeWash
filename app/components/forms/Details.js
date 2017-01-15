var React = require('react');
var ReactRouter = require('react-router');
// var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Bootstrap = require('react-bootstrap/lib/Glyphicon');
// var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var FontAwesome = require('react-fontawesome');

// var TransparentButton = require('../components/custom/TransparentButton');

var Details = React.createClass({

// having form with className form two works well, but not in design
render: function(){
return (
  <form  className="form form_two" style={{backgroundColor: "white", display:"none", margin: "auto", fontFamily: "Helvetica",
   height: "400px", padding: "10px 20% 10px 20%"}} method="post" action="/acuity">

    <div style={{padding: "20px 20px", backgroundColor:"#FBFDFF", margin: "0 auto"}}>
        <input className="hideaway" id="hiddenTime" type="hidden" name="time" value="sth"/>
            <div className="fire" id="form_container">
              <div id="input_container">
                <input className="half" type="text" id="input" placeholder="First"  />
                <input className="half" type="text" id="input" placeholder="Last"  />
                <FontAwesome id="input_img" name='user' size="2x" />
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Phone Number"  />
                <FontAwesome id="input_img" name='phone' size="2x" />
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Email"  />
                <FontAwesome id="input_img" name='envelope' size="2x" />
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Car Make & Model"  />
                <FontAwesome id="input_img" name='car' size="2x" />
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Last 4 Digits of License Plate"/>
              </div>
          </div>

    </div>
  </form>
);
}
});


module.exports = Details;
// <Glyphicon glyph="chevron-right" />
      //   <FontAwesome className='super-crazy-colors' name='rocket' size='2x' spin
      //   style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      // />
