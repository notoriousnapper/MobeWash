// alert("Yo!");



$(document).ready(function () {

var selectedTime = "2016-11-04T09:00:00-0700";
var times = [
"2016-11-04T09:00:00-0700",
"2016-11-04T10:00:00-0700",
"2016-11-04T11:00:00-0700",
"2016-11-04T12:00:00-0700",
"2016-11-04T13:00:00-0700",
"2016-11-04T14:00:00-0700",
"2016-11-04T15:00:00-0700",
"2016-11-04T16:00:00-0700",
"2016-11-04T17:00:00-0700",
"2016-11-04T18:00:00-0700"
]


  $('#calendar1').hide();
  $('#form2').hide();
  $('#form3').hide();
  // $('#masterform').show();

$('#calClick').click(function(e){
  console.log("first button clicked");
  $('#calendar1').show();
});

$('.avail').click(function(e){
  console.log("first button clicked");
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
});

$('#button3').click(function(){
  console.log("second button clicked");
  $('#form3').fadeOut(100);
  // $('#form1').fadeIn(1000);
});





});
