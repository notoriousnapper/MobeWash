/* Start of Tutorial Code */
var publicStripeApiKey = 'pk_live_oLPX7Pgdfh60DUZTlJgnWR1A';
var publicStripeApiKeyTesting = 'pk_test_uAebO3XYb3lPE6SJjQ0LQKVj';

Stripe.setPublishableKey(publicStripeApiKey);

function stripeResponseHandler (status, response) {
  if (response.error) {
    $('#error').text(response.error.message);
    $('#error').slideDown(300);
    $('#stripe-form .submit-button').removeAttr("disabled");
    return;
  }

  var form = $("#payment-form");
  form.append("<input type='hidden' name='stripeToken' value='" + response.id + "'/>");

  $.post(
    form.attr('action'),
    form.serialize(),
    function (status) {
      if (status != 'ok') {
        $('#error').text(status);
        $('#error').slideDown(300);
      }
      else {
        $('#error').hide();
        $('#success').slideDown(300);
      }
      $('.submit-button').removeAttr("disabled");
    }
  );
}

// http://stripe.com/docs/tutorials/forms
$("#payment-form").submit(function(event) {
  $('#error').hide();
  // disable the submit button to prevent repeated clicks
  $('.submit-button').attr("disabled", "disabled");

  var amount = $('#cc-amount').val(); // amount you want to charge in cents
  Stripe.createToken({
    number: $('.card-number').val(),
    cvc: $('.card-cvc').val(),
    exp_month: $('.card-expiry-month').val(),
    exp_year: $('.card-expiry-year').val()
  }, amount, stripeResponseHandler);

  // prevent the form from submitting with the default action
  return false;
});


// End of Tutorial Code








$(function() {
    $('#select').change(function(){
        if ($(this).val() == "2") {
            $('#warning').show();
            $('#warning').show();
            $('.cal1').show();
        } else {
            $('#warning').hide();
        }
    });
});

// // Stripe Handler
// var $form = $('#payment-form');
//  $form.submit(function(event) {
//    // Disable the submit button to prevent repeated clicks:
//    $form.find('.submit').prop('disabled', true);
//    // Request a token from Stripe:
//    Stripe.card.createToken($form, stripeResponseHandler);
//    // Prevent the form from being submitted:
//    return false;
//  });
//
//  function stripeResponseHandler(status, response) {
//   // Grab the form:
//   var $form = $('#payment-form');
//
//   if (response.error) { // Problem!
//
//     // Show the errors on the form:
//     $form.find('.payment-errors').text(response.error.message);
//     $form.find('.submit').prop('disabled', false); // Re-enable submission
//
//   } else { // Token was created!
//
//     // Get the token ID:
//     var token = response.id;
//
//     // Insert the token ID into the form so it gets submitted to the server:
//     $form.append($('<input type="hidden" name="stripeToken">').val(token));
//
//     // Submit the form:
//     $form.get(0).submit();
//   }
// };

$(document).ready(function () {
var canSubmit = false;
$( "#masterform" ).submit(function( event ) {
  // alert( "Handler for .submit() called." );
  if(canSubmit==false)
  event.preventDefault();
});
$( "#stripe" ).submit(function( event ) {
  alert( "Handler for .submitstripe() called." );
  // event.preventDefault();
  canSubmit=true;
  document.getElementById("masterform").submit();
});

var baseTime = "2016";
var year = "2016"; //Always for now
var month = "2016"; //Always November for now
var day = "15"; // Changes based off of button

var selectedTime = "2016-11-04T09:00:00-0800";
var times = [
"2016-11-04T09:00:00-0700",
"2016-11-04T10:00:00-0700",
"2016-11-04T11:00:00-0700",
"2016-11-04T12:00:00-0700",
"2016-11-04T13:00:00-0700",
"2016-11-04T14:00:00-0700",
"2016-11-04T15:00:00-0700",
"2016-11-04T16:00:00-0700",
]
var selectedTime = year+"-"+month+"-"+day;
  $('#calendar1').hide();
  // $('#form1').hide();
  $('#form2').hide();
  $('#form3').hide();
  // $('#masterform').show();

$('#calClick').click(function(e){
  console.log("first button clicked");
  $('#calendar1').show();
});

$('.avail').click(function(e){
  console.log("transition to final form begins.");
  $('#table1').fadeOut(200);
  $('#masterform').fadeIn(1000);
  var index = parseInt($(this).children().attr('class'));
  selectedTime = times[index-1]; // Offset 1
  $('#hiddenTime').attr('value', selectedTime);
  // console.log("selected time is: " + selectedTime);
  console.log("selected time is: " + $('#hiddenTime').attr('value'));
});


$('#button1').click(function(){
  console.log("first button clicked");
  $('#form1').fadeOut(100);
  $('#form2').fadeIn(1500);
});

$('#button2').click(function(){
  console.log("second button clicked");
  $('#form2').fadeOut(100);
  $('#form3').fadeIn(1000);
  $('#stripe').fadeIn(1000);
});

$('#button3').click(function(){
  console.log("second button clicked");
  $('#form3').fadeOut(100);
  // $('#form1').fadeIn(1000);
});





});
