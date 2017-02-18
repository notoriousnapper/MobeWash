var React = require('react');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
var FontAwesome = require('react-fontawesome');
var $ = require('jquery');


var monthExp = [ '01', '02', '03', '04',
        '05', '06', '07', '08', '09', '10', '11', '12'
];

function genYears(){
  var currentYear = new Date().getFullYear();
  var arr = [];
  var temp;
  for(var i = 0; i < 25; i++){
    currentYear+= 1;
    temp = currentYear.toString().substr(2,3);
    arr.push(temp);
  }
  // alert(arr);
  return arr;
}
var yearExp = genYears();



var Payment = React.createClass({
// -- Beginning of script loading for Stripe
  mixins: [ ReactScriptLoaderMixin ],

  getInitialState: function() {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      month: "01",
      year: "01",
      monthVal: 0,
      yearVal: 2017,
      price: 0,
      finalPrice: 0
    };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      price: nextProps.price,
      finalPrice: nextProps.price
    });
},
  verifyCoupon: function(){
    if($('#couponCode').val()=="MobeWelcome"){
      console.log("Correct coupon entered");
      var temp = this.state.price / 2; // Prevents from continuous halving
      this.setState({
        finalPrice: temp
      });
    }
    else{
      console.log("Invalid code entered");
    }
    // alert($('#finalPrice').val());
    // alert(this.state.finalPrice);
  },
  revealCoupon: function(){
    $('#couponLine').show();
    $('#couponButton').hide();
  },
  selectMonth: function(event){
    var str = event.target.value;
    var val = 0;
    if(str[0]==="0"){
      val = parseInt(str[1]);
    }
    else{
      val = parseInt(str);
    }
    alert(val + 1);
    this.setState({
      month: event.target.value,
      monthVal: val
    });
  },
  selectYear: function(event){
    var str = event.target.value;
    var val = 0;
    if(str[0]==="0"){
      val = 2000 + parseInt(str[1]);
    }
    else{
      val = parseInt(str);
    }
    this.setState({
      year: event.target.value,
      yearVal: val
    });
    console.log("year selected: " + val);
  },


  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function() {
    if (!Payment.getStripeToken) {

      // Put your publishable key here
      Stripe.setPublishableKey('pk_live_oLPX7Pgdfh60DUZTlJgnWR1A');
      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  },

  onScriptError: function() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  },

//End Script loading code



// having form with className form two works well, but not in design
componentDidMount: function(){
  this.setState(
    {
      price: this.props.price,
      finalPrice: this.props.price
    }
  );
  $("#couponLine").hide();
  $("#checkout-form").keypress(function(e){
    if (e.which == 13) {
       var tagName = e.target.tagName.toLowerCase();
       if (tagName !== "textarea") {
           return false;
           }
       }
  });


  console.log('Payment form loaded');
  var $form = $('#checkout-form');
  console.log($form);

  // No Resubmits after success
  var month = this.state.monthVal;
  var year = this.state.yearVal;
  $form.submit(function(e){ // Redefining the submit
    // e.stopImmediatePropagation();
    // e.preventDefault(e);
    // alert("Stop!");
    // alert(JSON.stringify($form.find('button'), null, 4));
    // $form.find('button').prop('disabled', true);
    console.log("Payment Processing");
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
      number: $('.card-number').val(),
      cvc: $('.card-cvc').val(),
      exp_month: month,
      exp_year: year,
      address_zip: $('.address_zip').val()
    }, stripeResponseHandler);
    return false;

    function stripeResponseHandler(status, res){
      if(res.error){
        // Show errors on the form
        $form.find('.charge-error').text(res.error.message);
        $form.find('button').prop('disabled', false); // Re-enable submission
      }
      else{
        var token = res.id;
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        alert(token);
        //Submit the form;
        $form.get(0).submit();
      }
    }
});




},

render: function(){
    // alert(this.state.price);

  // Generating expiration months
  var monthOptions = monthExp.map(function(item){
    return (<option value={item}> {item} </option>);
  });

  // Generating expiration years
  var yearOptions = yearExp.map(function(item){
    return (<option value={item}> {item} </option>);
  });


return (

  <div>
  <div id="charge-error"></div>


  <form  id="checkout-form" className="form form_three" style={{backgroundColor: "#D4E1E7", display:"none", margin: "auto", fontFamily: "Helvetica",
   height: "400px", padding: "10px 20% 10px 20%"}} method="POST" action="/booking">
          <div>
            <button id="couponButton" type="button" onClick={this.revealCoupon} style={{backgroundColor:"#5CA6E8", color:"white", borderRadius:"5px",
            borderColor:"#4E8DC6", padding: "3px 20px"}}> Redeem Coupon </button>
            <div id="couponLine">
              <div> Coupon </div>
              <input  id="couponCode" text="really"/>
              <button id="applyButton" type="button" onClick={this.verifyCoupon}> Apply </button>
            </div>
          </div>


          <div className="fire" id="form_container">
            <div id="input_container">
              <input className="card-number full" type="text" id="input" placeholder="Card number"  />
              <FontAwesome id="input_img" name='credit-card' size="2x" />
            </div>
            <div id="input_container">

              <input className="half" type="text" id="input" placeholder="CardHolder Address"  />
              <FontAwesome id="input_img" name='location-arrow' size="2x" />
              <input className="half" type="text" id="input" placeholder="CVC"  />
              <FontAwesome id="input_img_half" name='lock' size="2x" />
            </div>

            <div id="input_container">
              <div type="text" id="input" style={{backgroundColor:"white", width: "100%", height: "45px", display:"flex", padding: "5px 25px", fontWeight:"bold", fontSize:"20px"}} >
              <div className="styled-select slate" style={{flex:"1", backgroundColor:"white"}}>
                  <select name='expireMM' id='expireMM' value={this.state.month} onChange={this.selectMonth}>
                    {monthOptions}
                  </select>
                </div>


                {' / '}
              <div className="styled-select slate" style={{flex:"1", backgroundColor:"white"}}>
                <select name='expireYY' id='expireYY' value={this.state.year} onChange={this.selectYear}>
                  {yearOptions}
                </select>
                </div>

              </div>
              <FontAwesome id="input_img" name='calendar-check-o' size="2x"  />
            </div>
            <div id="input_container" style={{height:"20px", display:"flex", padding:"0", margin:"0",paddingLeft:"30px"}}>
                  <h1 className="date-label"> Month </h1>
                  <h1 className="date-label"> Year </h1>
            </div>
  <input type="submit" style={{centerAlign: "center"}} value="Submit"/>
  <input id="#finalPrice" type="hidden" name="price" value={this.state.finalPrice} />
            </div>
  </form>
  </div>
);
}
});
module.exports = Payment;

//             Expiration Date:
// <input class="inputCard" type="hidden" name="expiry" id="expiry" maxlength="4"/>
