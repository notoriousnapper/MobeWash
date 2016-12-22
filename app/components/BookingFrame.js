var React = require('react');
var ReactRouter = require('react-router');
var LabelCarousel = require('../components/custom/LabelCarousel');
var CorporateCalendar = require('../components/forms/CorporateCalendar');
var Details = require('../components/forms/Details');

var BookingFrame = React.createClass({
        getInitialState: function(){
          return {
            checked: false,
            form: 1,
            bookingData: {
              location: "",
              date: "",
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              car: {
                type: "white gmc sonoma", // type: "gmc sonoma"
                license: 123456 // first 6 digits
              }
              // Later needs calendar id/ etc.
            }
           }
        },
        revealCal: function(){
          if (this.state.form==1){
            var m = document.getElementsByClassName("form_one")[0]; // Works because named class within component
            var n = document.getElementsByClassName("form_two")[0];
          console.log("first form is" + m);
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
            // var o = document.getElementsByClassName("form_three")[1];
            n.style.display = "none";
          // o.style.display = "block";
            this.setState({
              checked: true,
              form: this.state.form + 1,
              bookingData: this.state.bookingData
            });
          }
          else {}
          // p.style.display = "none";
        },
        callmagic: function(){
          // this.setState({checked: true});
          this.revealCal();
          // this.setState({checked: false});
          console.log("checked");
          // alert("Hello");
        },
        render: function(){
        return(
        		<div style={{padding:"100px", margin: "0 auto", backgroundColor: "#FBFDFF", width: "80%", height: "700px"}}>
                  <LabelCarousel checked={this.state.checked}/>
                    <div style={{display: "block", margin: "auto", width:"100%", backgroundColor:"white", height:"400px", width: "100%"}}>
                      <div className="form_one" style={{display: "block", margin: "auto", width: "100%"}} ><CorporateCalendar /></div>
                      <Details />
                      <div className="form_three" ><Details /></div>
                        <div style={{width:"100%", paddingTop: "100px"}}>
                          <button style={{display: "block", width: "120px", font: "Helvetica", color: "white", backgroundColor: "#00B2EE", margin:"0 auto",
                          padding: "10px 20px 10px 20px", borderRadius:"10px",
                          borderStyle: "none"}}
                           onClick={this.callmagic}> Submit </button>
                        </div>
                    </div>
    				</div>
              )
                }
});

module.exports = BookingFrame;
