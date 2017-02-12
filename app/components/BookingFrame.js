var React = require('react');
var ReactRouter = require('react-router');
var LabelCarousel = require('../components/custom/LabelCarousel');
var ServiceInfo = require('../components/custom/ServiceInfo');
var Details = require('../components/forms/Details');
var Time = require('../components/forms/time/Time');
var Payment = require('../components/forms/Payment');

var BookingFrame = React.createClass({
        getInitialState: function(){
          return {
            checked: false,
            form: 1,
            bookingData: {
                          date: "",
                          hour: "",
                          acuity: {
                           location: "", date: "", firstName: "", lastName: "", email: "", phone: "",
                           cartype: "white gmc sonoma", license: "123456" // first 6 digit
                        },
                          payment: {}
                       }
              }
              // Later needs calendar id/ etc.
        },
        updateBookingData: function(type, data){
          const bkdata = this.state.bookingData;
          switch(type){
            case 1:  // Update date first portion
            // SPECIFICALLY -->
            bkdata.date = data;
            this.setState({
              bookingData: bkdata
            })
            break;

            case 2: // Update date hour portion
            bkdata.hour = data;
            this.setState({
              bookingData: bkdata
            })
            break;
            case 3:
            break;

            default: break;
          }
          // alert("Updated Data: " + JSON.stringify(this.state.bookingData, null, 4));
        },
        revealCal: function(){
          if (this.state.form==1){
            var m = document.getElementsByClassName("form_one")[0]; // Works because named class within component
            var n = document.getElementsByClassName("form_two")[0];
            console.log("first form is" + m);
            console.log("first form is" + n);
          m.style.display = "none";
          n.style.display = "block";
            this.setState({
              checked: true,
              form: this.state.form + 1,
              bookingData: this.state.bookingData
            });
          }

          else if (this.state.form == 2){
            var n = document.getElementsByClassName("form_two")[0];
            var o = document.getElementsByClassName("form_three")[0];
            n.style.display = "none";
            o.style.display = "block";
            this.setState({
              checked: true,
              form: this.state.form + 1,
              bookingData: this.state.bookingData
            });
          }
          else {}
        },
        callmagic: function(){
          this.revealCal();
          console.log("checked");
        },
        render: function(){
        return(
                    <div style={{display: "block", margin: "auto", backgroundColor:"white", height:"400px", width: "100%", padding: "0px"}}>
                		<div style={{padding:"100px", margin: "0 auto", width: "90%",minWidth: "1000px", height: "700px"}}>
                      <LabelCarousel checked={this.state.checked}/>
                      <div style={{display: "block", margin: "0 auto", backgroundColor: "white", textAlign: "center"}} >
                        <ServiceInfo />
                        <Time update={this.updateBookingData}/>
                        <Details time={this.state.bookingData.date + this.state.bookingData.hour }/>
                        <Payment />
                            <button style={{display: "block", width: "120px", font: "Helvetica", color: "white", backgroundColor: "#00B2EE", margin:"0 auto",
                            padding: "10px 20px 10px 20px", borderRadius:"10px",
                            borderStyle: "none"}}c
                             onClick={this.callmagic}> {'Continue >'} </button>
                    </div>

                    </div>
    				</div>
              )
                }
});
module.exports = BookingFrame;
            // {this.state.bookingData.date + this.state.bookingData.hour  }
            // Line 48, useful alert for JSON
