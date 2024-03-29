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
      companySelected: "DayBreak Games",
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
      companySelected: this.state.companySelected,
      bookingData: this.state.bookingData
    });
  },

  updateCompanyData: function(companyData){
    this.setState({
      checked: false,
      form: this.state.form,
      companySelected: companyData,
      price: this.state.price,
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

  goBack: function(){
    if (this.state.form==2){
      var n = document.getElementsByClassName("form_one")[0]; // Works because named class within component
      var m = document.getElementsByClassName("form_two")[0];
      console.log("first form is" + m);
      console.log("first form is" + n);
      m.style.display = "none";
      n.style.display = "block";
      this.setState({
        checked: true,
        form: this.state.form - 1,
        bookingData: this.state.bookingData
      });
    }

    else if (this.state.form == 3){
      var o = document.getElementsByClassName("form_two")[0];
      var n = document.getElementsByClassName("form_three")[0];
      n.style.display = "none";
      o.style.display = "block";
      this.setState({
        checked: true,
        form: this.state.form - 1,
        bookingData: this.state.bookingData
      });
    }
    else {}
  },
  reveal: function(){
    // Go to Details Page
    if (this.state.form==1){
      var m = document.getElementsByClassName("form_one")[0]; // Works because named class within component
      var n = document.getElementsByClassName("form_two")[0];
      console.log("first form is" + m);
      console.log("first form is" + n);
      m.style.display = "none";
      n.style.display = "block";
      // $('html, body').animate({
      //   scrollTop: $('.form_two').offset().top
      // }, 1000); // Change Responsiveness
      this.setState({
        checked: true,
        form: this.state.form + 1,
        bookingData: this.state.bookingData
      });
    }

    // Go to Payment Page
    else if (this.state.form == 2){
      // alert(JSON.stringify($('.form_two').serialize(), null, 4));
      var bookingData = ($('.form_two').serializeObject = function() {
        var o = {};
        var a = $('.form_two').serializeArray();
        $.each(a, function() {
          if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
          } else {
            o[this.name] = this.value || '';
          }
        });
        return o;
      })();
      // alert(JSON.stringify(bookingData, null, 4));

      // var bookingData = getFormDataAsJSON($('.form_two').serialize());
      var n = document.getElementsByClassName("form_two")[0];
      var o = document.getElementsByClassName("form_three")[0];
      n.style.display = "none";
      o.style.display = "block";
      this.setState({
        checked: true,
        form: this.state.form + 1,
        bookingData: bookingData
      });
    }

    // About to Submit both forms
    else if (this.state.form == 3){
      $.ajax({
        url:'/acuity',
        type:'post',
        data: this.state.bookingData,
        success:function(){
          alert("worked");
        }
      });
      // $.ajax({
      //   url:'/booking',
      //   type:'post',
      //   data: this.state.bookingData,
      //   success:function(){
      //     alert("worked");
      //   }
      // });
    }
    else {}
    },
    callMagic: function(){
      this.reveal();
      console.log("checked");
      $("#continueButton").css("display", "block");
      $("#serviceInfo").css("display", "none");
      // alert(JSON.stringify(this.state, null, 4));
    },
    // Serviceinfo id is named within component
    render: function(){
      return(
        <div style={{display: "block", margin: "auto", backgroundColor:"white", height:"400px", width: "100%", padding: "0px"}}>
        <div style={{padding:"0px", margin: "0 auto", width: "100%", height: "700px"}}>
        <LabelCarousel checked={this.state.checked}/>
        <div style={{display: "block", margin: "0 auto", backgroundColor: "white", textAlign: "center"}} >
        <ServiceInfo  magic={this.revealCal} priceChange={this.updatePrice} updateCompany={this.updateCompanyData} currentForm={this.state.form} />
        <Time  update={this.updateBookingData} nextForm={this.callMagic} companyData={this.state.companySelected} />
        <Details id="#detailForm" back={this.goBack} next={this.callMagic} time={this.state.bookingData.date + this.state.bookingData.hour }
        />
        <Payment id="#paymentForm" back={this.goBack} price={this.state.price}
        next={this.callMagic}/>

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
