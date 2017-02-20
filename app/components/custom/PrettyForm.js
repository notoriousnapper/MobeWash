var React = require('react');
var FontAwesome = require('react-fontawesome');
var PrettyForm = React.createClass({
        getInitialState: function(){
          return {
              }
              // Later needs calendar id/ etc.
        },
        render: function(){
        return(
        <div className="backgroundForm">
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

            <div style={{height: "200px"}}></div>
            </div>
          </div>
              )
                }
});
module.exports = PrettyForm;
