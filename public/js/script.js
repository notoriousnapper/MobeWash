// alert("Yo!");

$(document).ready(function () {
  //your code here




  // $('.box').click(function() {
  //     $('.box').each( function() {
  //         if ($(this).offset().left < 0) {
  //             $(this).css("left", "150%");
  //         }
  //     });
  //
  //     $(this).animate({
  //          left: '-50%'
  //      }, 500);
  //
  //      if ($(this).next().size() > 0) {
  //          $(this).next().animate({
  //              left: '50%'
  //          }, 500);
  //      } else {
  //          $(this).prevAll().last().animate({
  //              left: '50%'
  //          }, 500);
  //      }
  // });
  //


var alertWorld = function(){
  alert("Yo!");
}

  $('#form2').hide();
  $('#form3').hide();


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
