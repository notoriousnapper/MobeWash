


var TimeSlot = React.createClass({
  getInitialState: function(){
    return {
      day: "15",
      hour: "9:00"
    }
  },
  revealInfoBox: function(e){
    var t1 = "2016-11";
    // var time = "2016-11-15T09:00:00-0800";
    var l = $('.bookform')[0][0];
    // document.getElementsByClassName("hideaway")[0];
    var m = document.getElementsByClassName("bookform")[0];
    var n = document.getElementsByClassName("timeslot")[0];
    var hour = ($(e.target).parent().children('.test2').text()).split(" ")[0];
    var time = t1 + "-" + this.state.day + "T" + hour + ":00-0800";
    console.log('before: ' + l.value);
    l.value = time;  // The part that changes the value we need

    console.log("l is " + JSON.stringify(l,null,4));
    console.log("n is " + JSON.stringify(n,null,4));
    console.log(l.value);
    console.log("button inside is: " + hour);
    m.style.display = "block";
    // document.getElementById('masterform').scrollIntoView();
    $('html, body').animate({
        scrollTop: $("#masterform").offset().top
    }, 700);
    // n.style.display = "none";
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
      backgroundColor:"#5CB85C",
      borderColor:"#5CB85C",
      borderStyle: "solid",
      borderRadius:"5px",
      height: "30px",
      width: "300px"
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
    var i = 0;
    var list = times.map(function(item){
      i++;
      return <tr style={rowStyle}>
      <td>
      <div style={rowStyle}>
        <div className="test2" style={{width:"100px", display:"inline-block"}}>{item} </div>
        <button className="test" style={buttonStyle} key={i} onClick={self}> Open </button>
      </div>
      </td>
      </tr>;
    });
    // console.log('list is: ' + JSON.stringify(list, null, 4));
    // list.map(function(item){
    //   // console.log(JSON.stringify(item, null, 4));
    // })
    return <div className="timeslot" style={{display:"none", height: "500px"}}>
    <div style={{backgroundColor:"white"}}> Please Select a TimeSlot </div>
    <table style={{ border:"1px solid black", borderColor:"black", width:"500px"}}>
      <tbody>
      {list}
      </tbody>
      </table>
    </div>;
  }
});



Module.exports =
