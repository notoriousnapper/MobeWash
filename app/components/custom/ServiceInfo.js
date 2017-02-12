var React = require('react');
var Hover = require('../custom/Hover');
var $ = require('jquery');
var FontAwesome = require('react-fontawesome');
var ServiceInfo = React.createClass({
  optionClick1: function(){
    $('.option1').addClass('selected');
    $('.option2').removeClass('selected');
    $('form1').css("display", "block");

  },
  optionClick2: function(){
    $('.option2').addClass('selected');
    $('.option1').removeClass('selected');
    this.props.magic();
  },
  render:function(){
    return (
                <div className="form" style={{padding: "10px 20px 10px 20px", width: "100%", height: "500px", backgroundColor:"#FBFDFF"}} >


                <div> I would Like to schedule... </div>

                  <div  style={{display:"flex"}}>

                    <div className="opt option1" onClick={this.optionClick1} style={{flex:"1", display:"block", margin:"10", padding:"10px 20px", width:"45%", height:"120px",
                    textAlign: "left", borderStyle:"solid", borderColor:"#E2E2E2", borderWidth:"1px"}}>
                        <div style={{fontSize: "12px"}}>
                          <h1 style={{fontWeight:" bold", fontSize:"16", color:"#444343", padding:"0", margin:"0"}}> MobePlus(Corporate) </h1>
                          55 Minutes @ $24
                          <br />
                          Full Exterior Car Wash Service
                          <br />
                          Quality Hand Wash with Wheel & Tire Shine
                          <br />
                        </div>
                     </div>


                      <div className="opt option2" onClick={this.optionClick2}style={{flex:"1", display:"block", margin:"10", padding:"10px 20px", width:"45%", height:"120px",
                      textAlign: "left", borderStyle:"solid", borderColor:"#E2E2E2", borderWidth:"1px"}}>
                          <div style={{fontSize: "12px"}}>
                            <h1 style={{fontWeight:" bold", fontSize:"16", color:"#444343", padding:"0", margin:"0"}}> MobePlus(Corporate) for Trucks, Vans, or SUVs</h1>
                            75 Minutes @ $30
                            <FontAwesome name='truck' size="2x" />

                            <br />
                            Full Exterior Car Wash Service
                            <br />
                            Quality Hand Wash with Wheel & Tire Shine
                            <br />
                          </div>
                       </div>

                     </div>

                   </div>
    )
  }
});

module.exports = ServiceInfo;
                      // <input type="radio" value="sth"/>  <div> Do you have a truck </div>
                        // <img style={{width: "50px", height:"50px"}} src="/img/Sparkle_MobePlus.png"/>
