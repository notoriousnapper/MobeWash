var React = require('react');
var ReactRouter = require('react-router');
// var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Bootstrap = require('react-bootstrap/lib/Glyphicon');
// var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var FontAwesome = require('react-fontawesome');
var $ = require('jquery');

// var TransparentButton = require('../components/custom/TransparentButton');

var Details = React.createClass({

// having form with className form two works well, but not in design
componentDidMount: function(){
  console.log('Payment form loaded');
  var $form = $('#form-two');
  console.log($form);
  // No Resubmits after success
  $form.submit(function(e){
    e.preventDefault();
    // alert()  ;
  });
},
render: function(){
return (
  <form  className="form form_two" style={{backgroundColor: "white", display:"none", margin: "auto", fontFamily: "Helvetica",
   height: "400px", padding: "10px 20% 10px 20%"}} method="post" action="/acuity">

    <div style={{padding: "20px 20px", backgroundColor:"#FBFDFF", margin: "0 auto"}}>
        <input className="hideaway" id="hiddenTime" type="hidden" name="time" value={this.props.time}/>
            <div className="fire" id="form_container">
              <div id="input_container">
                <input className="half" type="text" id="input" placeholder="First" name="firstname"  />
                <input className="half" type="text" id="input" placeholder="Last"  name="lastname"/>
                <FontAwesome id="input_img" name='user' size="2x" />
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Phone Number" name="phone"  />
                <FontAwesome id="input_img" name='phone' size="2x" />
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Email" name="email"/>
                <FontAwesome id="input_img" name='envelope' size="2x" />
              </div>
              <div id="input_container">
                <input className="half" type="text" id="input" placeholder="Car Make & Model" name="cartype"/>
                <input className="half" type="text" id="input" placeholder="Car Color" name="carcolor"/>
                <FontAwesome id="input_img" name='car' size="2x" />
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Last 4 Digits of License Plate" name="license"/>
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Extra location information i.e. parking level" name="extrainfo"/>
              </div>
              <div id="input_container">
                <input className="full" type="submit" id="input" placeholder="Submit" />
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
