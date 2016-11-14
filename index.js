var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')




var Acuity = require('acuityscheduling');
/* To be put in config file */
var userId = '12695911';
var apiKey = 'dadea110ddd928442197a1af38936ca2';
var acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});


// Booking.js still needs access to jquery, so make sure its available
var $ = require('jquery');
// Pull in the module, ES2015 imports also works:
// import TimekitBooking from 'timekit-booking'
// var TimekitBooking = require('timekit-booking');
// Booking.js is now available as local var TimekitBooking instead of global window.timekitBooking
// var widget = new TimekitBooking();


//user token: jDS7KZvUz8YEHiOhfYnnxtTMSkH68Xi5 // Booking
//widget token: UnSDH4DSNge7ZNK0l6vQLpAMthMQ4HeP


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// acuity.request('/appointments', function (err, res, appointments) {
//   if (err) return console.error(err);
//   console.log(appointments);
// });

app.listen(process.env.PORT || 8000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});




// Servce static files to client
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


app.post('/test', function(request, response) {
  var body = request.body;
  // var res = res.body;
  console.log(JSON.stringify(body,null, 4));
  // console.log(res);
});

app.post('/acuity', function (request, response) {
  console.log("A Reservation is in the process of being made");
/*
  var body = request.body;
  var acuity = Acuity.basic(config);
  var session = request.session;
  var appointmentType = null;
  var appointmentTypes = session.appointmentTypes || null;
  var appointmentTypeID = session.appointmentTypeID = body.appointmentTypeID || session.appointmentTypeID || null;
  var date = session.date = body.date || session.date || null;
  var time = session.time = body.time || session.time || null;

  // First fetch possible appointment types:
  if (!appointmentTypes) {
    return acuity.request('/appointment-types', function (err, res, appointmentTypes) {
      request.session.appointmentTypes = appointmentTypes;
      response.render('index.html', {
        appointmentTypes: appointmentTypes
      });
    });
  }

  // Grab the selected appointment type:
  appointmentTypes.forEach(function (type) {
    if (type.id == appointmentTypeID) {
      appointmentType = appointmentType = type;
    }
  });

  // Appointment type id:
  if (!appointmentType) {
    return response.render('index.html', {
      appointmentTypes: appointmentTypes
    });
  }

  // Date:
  if (!date) {
    var month = new Date();
    month = month.getFullYear() + '-' + (month.getMonth() + 1);
    return acuity.request('/availability/dates?month=' + month + '&appointmentTypeID=' + appointmentType.id, function (err, res, dates) {
      response.render('index.html', {
        appointmentType: appointmentType,
        dates: dates
      });
    });
  }

  // Time:
  if (!time) {
    return acuity.request('/availability/times?date=' + date + '&appointmentTypeID=' + appointmentType.id, function (err, res, times) {
      response.render('index.html', {
        appointmentType: appointmentType,
        date: date,
        times: times
      });
    });
  }

  // Client info:
  if (!body.firstName || !body.lastName || !body.email) {
    return response.render('index.html', {
      appointmentType: appointmentType,
      date: date,
      time: time
    });
  }
  */
  var time  = "2016-11-15T09:00:00-0700";
  var time2 = "2016-11-15T09:00:00-0800";
  var appointmentTypeID = 2048071; // Corporate
                          // 1800725;  // MobePlus
  // var body = {};
  // body['firstName'] = "Jesse";
  // body['lastName']  = "Ren";
  // body['email']     = "jeren.neurogen@gmail.com";
  // body['phone']     = 8588475518;
  // }

  var body = request.body;
  console.log(JSON.stringify(body,null, 4));
  console.log("FLAG");
  console.log("FLAG");
  console.log("FLAG");

  // "calendarIDs": [
  //           740794
  //       ]

  // Create appointment:
  var options = {
    method: 'POST',
    body: {
      appointmentTypeID: appointmentTypeID,
      datetime:          body.time, 
      firstName:         body.firstname,
      lastName:          body.lastname,
      email:             body.email,
      phone:             body.phone,
      fields: [
         {"id": 2242840, "value": body.cartype},
         {"id": 2242842, "value": body.license},
         {"id": 2242851, "value": body.extrainfo}
       ]
      // cartype:          'toyota white gmc',
      // license:          '123dearme'
    }
  };
  return acuity.request('/appointments', options, function (err, res, appointment) {
    // res.sendFile(path.join(__dirname + '/index.html'));
    if (err) return console.error(err);
  console.log(appointment);
  });
});
