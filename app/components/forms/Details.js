var React = require('react');
var ReactRouter = require('react-router');

var Details = React.createClass({


// having form with className form two works well, but not in design
render: function(){
return (
  <form  className="form_two" style={{display:"none", margin: "auto", fontFamily: "Helvetica",
  width: "100%", height: "600px", padding: "200p 30px 20px 30px"
  }} method="post" action="/acuity">
    <input className="hideaway" id="hiddenTime" type="hidden" name="time" value="sth"/>

    <div>
      <input type="text" name="firstname" id="firstname" placeholder="First Name" />
      <input type="text" name="lastname" id="lastname" placeholder="Last Name" />
    </div>
    <div>
      <input type="text" name="phone" placeholder="Phone" id="phone" />
    </div>

    <div>
      <input type="text" name="email" placeholder="Email" id="email" />
    </div>
      <br/>


    <div id="form1">
      <div className="field first">
        <input className="bookinput" type="text" name="cartype" placeholder='CarType'/>
      </div>
      <div className="field half">
        <input type="text" name="license" placeholder='LicensePlate'/>
        <input type="text" name="extrainfo" placeholder='Extra Info.  i.e. 2nd floor'/>
      </div>
      <div className="field half">
        <button className="bookingBtn" id="button1" type="button"> Submit </button>
      </div>
    </div>

  </form>
);
}
});


module.exports = Details;
