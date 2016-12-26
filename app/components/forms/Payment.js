var React = require('react');
var ReactRouter = require('react-router');
var DropDown = require('../custom/DropDown');
var Payment = React.createClass({

// having form with className form two works well, but not in design
render: function(){
return (
  <form  className="form_three" style={{backgroundColor: "red", display:"none", margin: "auto", fontFamily: "Helvetica",
   height: "400px", padding: "10px 20% 10px 20%"}} method="post" action="/acuity">

   <DropDown options={['visa', 'mastercard', 'americanexpress']} />

    <div style={{padding: "80px", backgroundColor:"white", borderColor:"red"}}>
        <input className="hideaway" id="hiddenTime" type="hidden" name="time" value="sth"/>

        <div>
          <input type="text" name="firstname" id="firstname" placeholder="First Name" />
          <input type="text" name="lastname" id="lastname" placeholder="Last Name" />
        </div>

        <div>
          <input type="text" name="card" placeholder="Card #" id="card" />
          <input type="text" name="cvv" placeholder="CVV" id="cvv" />
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
    </div>
  </form>
);
}
});

module.exports = Payment;
