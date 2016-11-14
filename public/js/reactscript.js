/* React */

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
    var n = document.getElementsByClassName("cal2")[0];
    var hour = ($(e.target).parent().children('.test2').text()).split(" ")[0];
    var time = t1 + "-" + this.state.day + "T" + hour + ":00-0800";
    console.log('before: ' + l.value);
    l.value = time;  // The part that changes the value we need

    console.log("l is " + JSON.stringify(l,null,4));
    console.log("n is " + JSON.stringify(n,null,4));
    console.log(l.value);
    console.log("button inside is: " + hour);
    m.style.display = "block";
    n.style.display = "none";
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
    return <div className="cal2" style={{display:"none", margin:"auto", width: "400px"}}>
    <div  style={{margin:"auto", backgroundColor:"white"}}> Please Select a TimeSlot </div>
    <table style={{ border:"1px solid black", borderColor:"black", width:"500px"}}>
      <tbody>
      {list}
      </tbody>
      </table>
    </div>;
  }
});

var Row = React.createClass({
  render: function() {
    var res = this.props.elems.map(function(item){
      return <tr> {item} </tr>;
    });
    return <div>
      {res}
    </div>;
  }
});
var Calendar = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  selectDate: function(){
    // alert("date selected");
    var m = document.getElementsByClassName("cal1")[0];
    var n = document.getElementsByClassName("cal2")[0];
    var o = document.getElementById("select");


    m.style.display = "none";
    o.style.display = "none";
    n.style.display = "block";
  },
  revealCal: function(){
    // var m = document.getElementsByClassName("cal1")[0];
    var m = document.getElementById("select");
    // var n = document.getElementsByClassName("logoImg")[0];
    var o = document.getElementsByClassName("corporateBtn")[0];
    console.log(m);
    m.style.display = "block";
    o.style.display = "none";
    // n.style.display = "block";
  },
  render: function() {
    var buttonStyle={
      display: "block",
      margin: "auto",
      backgroundColor:"#5CB85C",
      borderColor:"#5CB85C",
      borderStyle: "solid",
      borderRadius:"5px",
      height: "40px",
      width: "180px",
      color: "white",
      fontFamily: "19px"
    }

    var avatarStyle={
      disply: "none",
      margin: "auto",
      width:  "128px",
      height: "128px",
      // margin: "10px",
      border:"10px solid white",
      borderRadius: "500px",
      webkitBorderRadius: "500px",
      mozBorderRadius: "500px"
    }


    var topStyle={
      height: '100px',
      width: '100px',
      textAlign: 'right',
      marginTop: '10px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontFamily: 'Helvetica',
      backgroundColor: '#444444b',
      borderColor:"black"
    };
    var headStyle={
      height: '40px',
      width: '100px',
      textAlign: 'center',
      marginTop: '10px',
      marginBottom: '0px',
      paddingTop: '10px',
      // paddingBottom:'10px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontFamily: 'Helvetica',
      fontSize: '14px',
      backgroundColor: '#444444b',
      borderColor:"black",
      color: '#ADADAB'
    };
    var chosenStyle={
      height: '40px',
      width: '100px',
      textAlign: 'right',
      marginTop: '10px',
      marginBottom: '0px',
      paddingTop: '10px',
      // paddingBottom:'10px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontFamily: 'Helvetica',
      fontSize: '12px',
      backgroundColor: '#7A7A7A',
      borderColor:"black",
      color: '#ADADAB'
    };
    var defaultStyle={
      height: '40px',
      width: '100px',
      textAlign: 'right',
      marginTop: '10px',
      marginBottom: '0px',
      paddingTop: '10px',
      // paddingBottom:'10px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontFamily: 'Helvetica',
      fontSize: '12px',
      backgroundColor: 'white',
      borderColor:"black",
      color: '#ADADAB'
    };


    var op1 = ['S','M','T','W','T','F','S'];
    var op2 = ['30','31','1','2','3','4','5'];
    var op3 = ['6','7','8','9','10','11','12'];
    var op4 = ['13','14','15','16','17','18','19'];
    var op5 = ['20','21','22','23','24','25','26'];
    var op6 = ['27','28','29','30','1','2','3'];


    var res = function(arr){arr.map(function(item){
        return <th style={topStyle}>{item}</th>;
      });
    };


    // Function that dynamically selects day of the week to add in custom html
    // arr = array of values representing table cells
    // selectedDays are the days chosen.  Ranges from [0-6]


    var self = this; // For binding purposes
    function generateTr(arr, days, selStyle, content){
      var rowStyle;
      var i = 0, j = 0;
      var cont = <div></div>;
      var clicker = ()=>{console.log('sigh');}
      console.log(days);
      console.log(days[0]);
      console.log(days[1]);
      return arr.map(function(item){
            // Reset style & content
            cont     = <div></div>;
            rowStyle = defaultStyle;
            clicker  =  ()=>{console.log('sigh');}

            for(j = 0; j <days.length; j++){
              if(i == days[j]){
                console.log(i + " " + days[j]);
                rowStyle = selStyle;
                cont = content;
                clicker = self.selectDate
                break;
              }
            }
            i++;
            return <th style={rowStyle} onClick={clicker}>{item}<br/>{cont}</th>;
      });
    };

    // Data to be used for calendar function
    var selDays = 4; // Thursday for DayBreak Games
    var content = <div style={{textAlign:"left"}} > DayBreak Games <br/> 9am-4pm </div>;

    var r1 = generateTr(op1, [0,1,2,3,4,5,6], headStyle, null);
    var r2 = generateTr(op2, [], chosenStyle, null);
    var r3 = generateTr(op3, [], chosenStyle, null);
    var r4 = generateTr(op4, [4], chosenStyle, content);
    var r5 = generateTr(op5, [], chosenStyle, null);
    var r6 = generateTr(op6, [], chosenStyle, null);


    var text;
    if (this.props.hasvacancy) {
      text = 'Vacancy';
    } else {
      text = 'No Vacancy';
    }
    return <div>
    <button className="corporateBtn" style={buttonStyle} onClick={this.revealCal}> Corporate </button>
    <div  style={{display:"none"}}>
    <img style={avatarStyle} src="img/daybreakgames.jpg"></img>
     </div>
      <div className="cal1" style={{margin: "auto", display:"none", height:"600px", width:"60%", borderRadius:"10px", backgroundColor:"white", borderColor:"black"}}>
        <div style={{padding: "10px", fontFamily: "Helvetica", height:"50px", width:"100%", backgroundColor:"white", borderColor:"grey",borderRadius:"10px"}}>
        DayBreak Games
        </div>

        <table style={{borderColor:"black", width:"100%"}}>
          <tbody>
            <tr style={{backgroundColor: "#444444"}}>{r1}</tr>
            <tr>{r2}</tr>
            <tr>{r3}</tr>
            <tr>{r4}</tr>
            <tr>{r5}</tr>
            <tr>{r6}</tr>
          </tbody>
        </table>
      </div>
    </div>
  }
});

var Master = React.createClass({
  render: function() {
    return <div>
    <Calendar/>
    <TimeSlot/>
    </div>;
  }
});

ReactDOM.render(
  <Master />,
  document.getElementById('container')
);
