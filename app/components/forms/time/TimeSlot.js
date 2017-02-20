/*
* Timeslot generated by available timeslot data
* Available timeslots are non-interactive.
*
* @ Jesse Ren 2016
*/
var React = require('react');
var ReactRouter = require('react-router');
var $ = require('jquery');

var TimeSlot = React.createClass({
  getInitialState: function(){
    return {
      day: "15",
      hour: "9:00"
    }
  },
  // scrollDown: function(){
  //   $("html, body").animate({
  //     scrollTop: $(document).height() }, "slow");
  // },
  revealInfoBox: function(e){
    // var t1 = "2016-11";
    // var time = "2016-11-15T09:00:00-0800";
    // var l = $('.bookform')[0][0];
    // document.getElementsByClassName("hideaway")[0];
    // var m = document.getElementsByClassName("bookform")[0];
    // var n = document.getElementsByClassName("timeslot")[0];
    $('.continue').css("display", "none");
    $(e.target).parent().children('.continue').css("display", "inline-block");
    var hour = ($(e.target).parent().children('.test2').text()).split(" ")[0];
    var ampm = ($(e.target).parent().children('.test2').text()).split(" ")[1];
    if(hour.length == 4){ // If hour is single digits, prepend a 0 in front
      hour = "0" + hour;
    }
    if(ampm=="pm"){
      if(hour == "12"){ hour == "0"} // for 12pm
      hour = (parseInt(hour) + 12).toString();
    }
    var time = "T" + hour + ":00";
    this.props.parentFn(time);
    // this.scrollDown();
    // console.log('before: ' + l.value);
    // l.value = time;  // The part that changes the value we need
    console.log("time is : ");
    console.log(time);
    // console.log("l is " + JSON.stringify(l,null,4));
    // console.log("n is " + JSON.stringify(n,null,4));
    // console.log(l.value);
    console.log("button inside is: " + hour);
    // m.style.display = "block";
    // document.getElementById('masterform').scrollIntoView();
    // $('html, body').animate({
    //     scrollTop: $("#masterform").offset().top
    // }, 700);
    // n.style.display = "none";
  },
  updateForm: function(){
    this.props.nextForm();
  },
  render: function() {
    var rowStyle = {
      padding: "10px",
      paddingLeft: "20px",
      backgroundColor:"#F9F9F9",
      height: "50px"
    };
    var buttonStyle = {
      margin: "auto",
      backgroundColor:"#00B2EE",
      borderColor:"#00B2EE",
      borderStyle: "solid",
      borderRadius:"5px",
      height: "30px",
      width: "50%",
      color: "white"
    };
    var buttonStyle2 = {
          display:"none" ,
          backgroundColor: "white",
          width:"23%",
          padding: "5px 10px",
          borderStyle: "solid",
          marginLeft: "10px",
          borderColor: "00B2EE"
      };

    var times = [
      "9:00 am",
      "10:00 am",
      "11:00 am",
      "12:00 pm",
      "1:00 pm",
      "2:00 pm",
      "3:00 pm",
      "4:00 pm"
    ];
    var self = this.revealInfoBox;
    var self2 = this.updateForm;
    // this.props.nextForm();
    var i = 0;
    var list = times.map(function(item){
      i++;
      return <tr style={rowStyle}>
      <td>
      <div style={rowStyle}>
        <div className="test2" style={{width:"100px", display:"inline-block"}}>{item} </div>
        <button className="test" style={buttonStyle} key={i} onClick={self}> Open </button>
        <button className="continue" style={buttonStyle2} onClick={self2} > Continue >> </button>
      </div>
      </td>
      </tr>;
    });
    // console.log('list is: ' + JSON.stringify(list, null, 4));
    // list.map(function(item){
    //   // console.log(JSON.stringify(item, null, 4));
    // })
    return <div className="timeslot" style={{display:"none", height: "500px", width:"500px", margin: "0 auto"}}>
    <div style={{backgroundColor:"white", display:"flex"}}> Please Select a TimeSlot </div>
      <table style={{ border:"1px solid black", borderColor:"black", width:"100%"}}>
        <tbody>
        {list}
        </tbody>
        </table>
      <div style={{flex:"1"}}></div>

    </div>;
  }
});



module.exports = TimeSlot;
