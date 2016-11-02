var Acuity = require('acuityscheduling');
var userId = null;
var apiKey = null;

var acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});

acuity.request('/appointments', function (err, res, appointments) {
  if (err) return console.error(err);
  console.log(appointments);
});



var alertWorld = function(){
  alert("Yo!");
}
