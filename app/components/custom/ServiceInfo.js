var React = require('react');
var ServiceInfo = React.createClass({
  render:function(){
    return (
                  <div style={{display:"block", margin:"0 auto", padding:"10px 20px", width:"50%", height:"120px", borderStyle:"solid", borderColor:"grey", borderWidth:"5px"}}>
                      <div style={{borderColor:"grey"}}>
                        <h1 style={{fontWeight:"bold", fontSize:"20", padding:"0", margin:"0"}}> MobePlus(Corporate) </h1>
                        55 Minutes @ $24
                        <br />
                        The Full Exterior Car Wash Service
                        <br />
                        Quality Hand Wash with Wheel & Tire Shine
                        <br />
                      </div>
                   </div>
    )
  }
});

module.exports = ServiceInfo;
