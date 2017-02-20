var React = require('react');
var ReactRouter = require('react-router');
var LabelCarousel = require('../components/custom/LabelCarousel');
var ServiceInfo = require('../components/custom/ServiceInfo');
var Details = require('../components/forms/Details');
var Time = require('../components/forms/time/Time');
var Payment = require('../components/forms/Payment');
var $ = require('jquery');

var BookingFrame = React.createClass({
        getInitialState: function(){
          return {
            checked: false,
            form: 1,
            price: 2400,
            bookingData: {
                          date: "",
                          hour: "",
                          acuity: {
                           location: "", date: "", firstName: "", lastName: "", email: "", phone: "",
                           cartype: "white gmc sonoma", license: "123456" // first 6 digit
                        }
                       }
              }
              // Later needs calendar id/ etc.
        },
        updatePrice: function(newPrice){
          this.setState({
            checked: false,
            form: this.state.form,
            price: newPrice,
            bookingData: this.state.bookingData
          });
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
            var m = document.getElementsByClassName("form_one")[0]; // Works because named class within component
            console.log("first form is" + m);
          m.style.display = "block";
      $('html, body').animate({
        scrollTop: $('#componentTime').offset().top - 100
      }, 1000); // Change Responsiveness
        },
        reveal: function(){
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
        callMagic: function(){
          this.reveal();
          console.log("checked");
          // alert(JSON.stringify(this.state, null, 4));
        },
        render: function(){
        return(
                    <div style={{display: "block", margin: "auto", backgroundColor:"white", height:"400px", width: "100%", padding: "0px"}}>
                		<div style={{padding:"0px", margin: "0 auto", width: "100%", height: "700px"}}>
                      <LabelCarousel checked={this.state.checked}/>
                      <div style={{display: "block", margin: "0 auto", backgroundColor: "white", textAlign: "center"}} >
                        <ServiceInfo magic={this.revealCal} priceChange={this.updatePrice} currentForm={this.state.form} />
                        <Time update={this.updateBookingData} nextForm={this.callMagic}/>
                        <Details time={this.state.bookingData.date + this.state.bookingData.hour }
                          nextForm={this.callMagic}/>
                        <Payment price={this.state.price}
                          nextForm={this.callMagic}/>

                            <button style={{display: "block", width: "120px", font: "Helvetica", color: "white", backgroundColor: "#00B2EE", margin:"0 auto",
                            padding: "10px 20px 10px 20px", borderRadius:"10px",
                            borderStyle: "none", marginBottom: "400px"}}
                             onClick={this.callMagic}> {'Continue >'} </button>

                             <br/>
                             <br/>
                             <br/>
                             <br/>
                    </div>

                    </div>
    				</div>
              )
                }
});
module.exports = BookingFrame;
            // {this.state.bookingData.date + this.state.bookingData.hour  }
            // Line 48, useful alert for JSON
