// alert("Yo!");

$(document).ready(function () {

var alertWorld = function(){
  alert("Yo!");
}

  $('#form2').hide();
  $('#form3').hide();
  $('#masterform').show();


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
  $('#form1').fadeIn(1000);
});


});
