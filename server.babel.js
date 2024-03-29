//
// import express from 'express';
//
// const app = express();
//
// app.use('/', express.static('public'));
//
// app.listen(process.env.PORT || 3000);
var stripeApiKey = "sk_live_j6IlQpiF6Yxa8xsjZZt2OJax";
var stripeApiKeyTesting = "sk_test_qJDADwvdjliJBbkP1Ng0epVR";
// Because randomly adds a whitespace
var trimmedKey = stripeApiKeyTesting.trim(" ");
// console.log("KEY FOR TESTING IS" + stripeApiKeyTesting + "[ENDS HERE]..hopefully");
// console.log("KEY FOR TESTING IS" + trimmedKey + "[ENDS HERE]..hopefully");



var stripe = require('stripe')(stripeApiKey);

var express = require('express');
var cors = require('cors');
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
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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


app.post('/payment', function(req, res){
  // Set your secret key: remember to change this to your live secret key in production
  //Initializations
   var amount = 100; // 1 dollar

   var stripeToken = req.body.stripeToken;
   console.log("A Booking Process is in the works");
   console.log("Amount Charged: " + JSON.stringify(req.body.price, null, 4));
   console.log("Stripe Token is: " + stripeToken);

  /*
  stripe.customers.create({
     card : stripeToken,
     email : "jeren.neurogen@gmail.com" // customer's email (get it from db or session)
    //  plan : "browserling_developer"
   }, function (err, customer) {
     if (err) {
       var msg = customer.error.message || "unknown";
       res.send("Error while processing your payment: " + msg);
     }
     else {
       var id = customer.id;
       console.log('Success! Customer with Stripe ID ' + id + ' just signed up!');
       // save this customer to your database here!
      //  res.send('ok');
     }
   });
   */
   var price = req.body.price;
   // Charging Action Is Here
    var charge = stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: price
    },
    function(err, charge) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(204);
        }
    });
});


app.get('/acuity', function (request, response) {
  console.log("Getting Data");
  var body = request.body;
  console.log(JSON.stringify(body,null, 4));

  var appointmentTypeID = 2048071; // Corporate // 1800725;  // MobePlus
  var daybreakCalID = 874123;
  var options = {
    method: 'GET',
    body: {
      appointmentTypeID: appointmentTypeID,
      calendarType: daybreakCalID,
      minDate: "2017-03-02T10:15:00-0700",
      maxDate: "2017-13-02T10:15:00-0700"
    }
  };
  return acuity.request('/appointments', options, function (err, res, appointment) {
    // res.sendFile(path.join(__dirname + '/index.html'));
  response.end(JSON.stringify(appointment, null, 4));
  // response.end(JSON.stringify(appointment,);
  console.log("Getting Data");
    if (err) return console.error(err);
    console.log(appointment);

});

});


app.post('/acuity', function (request, response) {
  console.log("A Reservation is in the process of being made");
  console.log("Body is");
 console.log(JSON.stringify(request.body, null, 4));
 //  console.log("Query is");
 // console.log(request);
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
  var appointmentTypeID = 2048071; // Corporate // 1800725;  // MobePlus
  var daybreakCalID = 874123;

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
  var extra = "";
  var options = {
    method: 'POST',
    body: {
      calendarType: daybreakCalID,
      appointmentTypeID: 2407455,
      // appointmentTypeID,
      datetime:          body.time,
      firstName:         body.firstname,
      lastName:          body.lastname,
      email:             body.email,
      phone:             body.phone,
      fields: [
         { "id":2242842, "value": body.license, "name": "Last 4 Digits of License Plate" },
         { "id":2371519, "value": body.cartype, "name": "Car Make &amp; Model (e.g. Toyota Camry)"},
         { "id":2371528, "value": body.carcolor, "name": "Car Color" }
       ]
    }
  };
  return acuity.request('/appointments', options, function (err, res, appointment) {
    // res.sendFile(path.join(__dirname + '/index.html'));
    if (err) return console.error(err);
  console.log(appointment);
  console.log(options);
  });
});
        //  {"id":2242842, "formID":549637, "value": "111", "name":"Last 4 Digits of License Plate"}
        //  {"id": 2242851, "value": extra}
        //  { "id": 208390875, "fieldID": 2242842, "value": body.license, "name": "Last 4 Digits of License Plate" },
        //  { "id": 208390878, "fieldID": 2371519, "value": body.cartype, "name": "Car Make &amp; Model (e.g. Toyota Camry)"},
        //  { "id": 208390881, "fieldID": 2371528, "value": body.carcolor, "name": "Car Color" }

        //  { "id": 208390875, "value": "111111"},
        //  { "id": 208390878, "fieldID": 2371519, "value": "111","name": "Car Make &amp; Model (e.g. Toyota Camry)"},
        //  { "id": 208390881, "fieldID": 2371528, "value": "111", "name": "Car Color" }
      // cartype:          'toyota white gmc',
      // license:          '123dearme'
      // Calendar for daybreak:  874123
