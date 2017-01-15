var React = require('react');
var ReactRouter = require('react-router');
var DropDown = require('../custom/DropDown');
var FontAwesome = require('react-fontawesome');
var Payment = React.createClass({

// having form with className form two works well, but not in design
render: function(){
return (
  <form  className="form form_three" style={{backgroundColor: "white", display:"none", margin: "auto", fontFamily: "Helvetica",
   height: "400px", padding: "10px 20% 10px 20%"}} method="post" action="/acuity">

   <DropDown options={['visa', 'mastercard', 'americanexpress']} />

          <div className="fire" id="form_container">
            <div id="input_container">
              <input className="full" type="text" id="input" placeholder="Card number"  />
              <FontAwesome id="input_img" name='credit-card' size="2x" />
            </div>
            <div id="input_container">
              <input className="half" type="text" id="input" placeholder="MM/YY"  />
              <FontAwesome id="input_img" name='calendar-check-o' size="2x" />
              <input className="half" type="text" id="input" placeholder="CVC"  />
              <FontAwesome id="input_img_half" name='lock' size="2x" />
            </div>

            <div id="input_container">
              <select>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            </div>
    </div>
  </form>
);
}
});

module.exports = Payment;
