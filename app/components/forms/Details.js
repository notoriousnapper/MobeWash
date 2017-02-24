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
componentWillReceiveProps: function (nextProps) {
  this.setState({
    currentForm: nextProps
  });
},
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
var buttonStyle = {height: "40px", width: "100px", font: "Helvetica", color: "white", backgroundColor: "#00B2EE", margin:"0 auto",
padding: "10px 20px 10px 20px", borderRadius:"10px",
borderStyle: "none"};
return (
  <form   className="form form_two" style={{backgroundColor: "white", display:"none", margin: "0 auto", fontFamily: "Helvetica",
    width: "100%", padding: "10px 20% 10px 20%"  }} method="post" action="/acuity">

   <a style={{color: "black", float:"left", paddingLeft: "20px", marginBottom:"10px"}} type="button" onClick={this.props.back}> ◄ Back </a>

    <div style={{padding: "20px 20px", width:"100%", backgroundColor:"#FBFDFF", margin: "0 auto"}}>

        <input className="hideaway" id="hiddenTime" type="hidden" name="time" value={this.props.time}/>
            <div className="fire" id="form_container">
              <div id="input_container">
                <input className="half" type="text" id="input" placeholder="First" name="firstname"  />
                <input className="half2" type="text" id="input" placeholder="Last"  name="lastname"/>
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
                <input className="half2" type="text" id="input" placeholder="Car Color" name="carcolor"/>
                <FontAwesome id="input_img" name='car' size="2x" />
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Last 4 Digits of License Plate" name="license"/>
              </div>
              <div id="input_container">
                <input className="full" type="text" id="input" placeholder="Extra location information i.e. parking level" name="extrainfo"/>
              </div>
          </div>
                <div style={{height: "60px", padding: "10px 20px"}}>
                  <button type="button" style={buttonStyle}
                  onClick={this.props.next}> Next </button>
                </div>

      </div>
    </form>
);
}
});


module.exports = Details;
