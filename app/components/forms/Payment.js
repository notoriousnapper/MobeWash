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
    currentYear+= i;
    temp = currentYear.toString().substr(2,3);
    arr.push(temp);
  }
  alert(arr);
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
      month: 0,
      date: 2017
    };
  },


  selectMonth: function(event){
    this.setState({
      month: event.target.value
    });
  },
  selectYear: function(event){
    this.setState({
      year: event.target.value
    });
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
  console.log('Payment form loaded');
  var $form = $('#checkout-form');
  console.log($form);

  // No Resubmits after success
  $form.submit(function(e){ // Redefining the submit
    e.stopImmediatePropagation();
    // e.preventDefault(e);
    // alert("Stop!");
    // alert(JSON.stringify($form.find('button'), null, 4));
    // $form.find('button').prop('disabled', true);


    console.log("Payment Processing");
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
      number: $('.card-number').val(),
      cvc: $('.card-cvc').val(),
      exp_month: this.state.month,
      exp_year:  2000 + this.state.year,
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

  <form  id="checkout-form" className="form form_three" style={{backgroundColor: "white", display:"none", margin: "auto", fontFamily: "Helvetica",
   height: "400px", padding: "10px 20% 10px 20%"}} method="POST" action="/booking">
          <div className="fire" id="form_container">
            <div id="input_container">
              <input className="card-number full" type="text" id="input" placeholder="Card number"  />
              <FontAwesome id="input_img" name='credit-card' size="2x" />
            </div>
            <div id="input_container">
              <div className="half" type="text" id="input" style={{width: "100px"}} >
                  <select name='expireMM' id='expireMM' value={this.state.month} onChange={this.selectMonth}>
                  {monthOptions}
                </select>
                {' / '}
                <select name='expireYY' id='expireYY' value={this.state.year} onChange={this.selectYear}>
                  {yearOptions}
                </select>
              </div>


              <FontAwesome id="input_img" name='calendar-check-o' size="2x" />
              <input className="half" type="text" id="input" placeholder="CVC"  />
              <FontAwesome id="input_img_half" name='lock' size="2x" />
            </div>
  <input type="submit" style={{centerAlign: "center"}} value="Submit"/>

            </div>
  </form>
  </div>
);
}
});
module.exports = Payment;

//             Expiration Date:
// <input class="inputCard" type="hidden" name="expiry" id="expiry" maxlength="4"/>
