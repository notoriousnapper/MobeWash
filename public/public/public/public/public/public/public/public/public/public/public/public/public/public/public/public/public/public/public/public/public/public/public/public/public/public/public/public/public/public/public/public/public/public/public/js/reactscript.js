var Hover = React.createClass({
  getInitialState: function(){
    return { hover: false}
  },
  onMouseEnterHandler: function(){
    this.setState({
      hover: true
    })
    console.log("Entered");
  },
  onMouseLeaveHandler: function(){
    this.setState({
      hover: false
    })
    console.log("Left");
  },
  render: function(){
    var outer = {
    height: '100%', width: '100%', margin: '0px',
    cursor: 'pointer', position: 'relative'
}

    var normal = {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: '#7A7A7A', opacity:100
}

    var hover = {
      position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: '#C32025', opacity: 1
    }
    /* Magic code */
    var inner = normal;
            if(this.state.hover) {
                inner = hover;
            }
    return <div style={outer}>
                <div style={inner}
                    onMouseEnter={this.onMouseEnterHandler}
                    onMouseLeave={this.onMouseLeaveHandler} >
                    {this.props.children}
                </div>
            </div>
  }

});

// these are labels for the days of the week
cal_days_labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
// cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.html = '';
  }
/* React */
    // Somehow this code doesn't translate past - etc.
    // var cal = new Calendar(11,2016);
    // cal.generateHTML();
    // var html = cal.getHTML();
    //var html = document.write(cal.getHTML());


// Helper Functions
var getDaysInMonth = function(month, year){
  return new Date(year, month, 0).getDate();
}
// Initializations
var curr = new Date();
var m = curr.getMonth();
var y = curr.getFullYear();
var temp = [], temp2 = [], comp = [], day = 1, item = [];

var Calendar_C = React.createClass({
  getInitialState: function(){
    return {
      month: m,
      year: y,
      dayCount: getDaysInMonth(y, m)
    }
  },
  render: function(){
    var topStyle={
      height: '100px', width: '100px', textAlign: 'right', marginTop: '10px', paddingLeft: '4px', paddingRight: '4px',
      fontFamily: 'Helvetica', backgroundColor: '#444444b', borderColor:"black"
    };
    var headStyle={
      height: '30px', width: '100px', textAlign: 'center', marginTop: '10px', marginBottom: '0px', paddingTop: '10px',
      paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '14px', backgroundColor: '#444444',
      borderColor:"black", color: '#ADADAB' };
    var chosenStyle={
      height: '40px', width: '100px', textAlign: 'right', marginTop: '10px', marginBottom: '0px', paddingTop: '10px',
      paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '12px', backgroundColor: '#7A7A7A',
      borderColor:"black", color: '#ADADAB'
    };
    var hoverStyle={
      height: '40px', width: '100px', textAlign: 'center',
      paddingLeft: '4px',  fontFamily: 'Helvetica', fontSize: '12px', backgroundColor: '#7A7A7A',
      borderColor:"black", color: '#ADADAB', padding: "0", margin: "0"
    };
    var defaultStyle={
      height: '40px', width: '100px', textAlign: 'right', verticalAlign: 'top',
      paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '12px', backgroundColor: 'white',
      borderColor:"black", color: '#ADADAB' , padding: '0', margin: '0'
    };

    var companyData =
    [
      {
        name: "DayBreak Games",
        day: 3,
        location: "2222 San Francisco",
        range: "11:00am-5pm" // Should be changed to time objects -- Later iteration
      },
      {
        name: "Illumina",
        day: 4,
        location: "2222 San Francisco",
        range: "11:00am-5pm" // Should be changed to time objects -- Later iteration
      },
    ]

  /* Major code for filling in days */
  // get first day of month
  var day = 1;
  var validDay = false;
  var firstDay = new Date(this.state.year, this.state.month, 1);
  var startingDay = firstDay.getDay(); // find number of days in month
  var weekday = 6;           // Weekday counter
  var monthLength = cal_days_in_month[this.state.month];
  // compensate for leap year
  if (this.state.month == 1) { // February only!
    if((this.state.year % 4 == 0 && this.state.year % 100 != 0) || this.state.year % 400 == 0){
      monthLength = 29;
    }
    }

  function decorateCell(companyData, day, validDay, weekday){
    var days     = companyData.map(function(c){
      return c.day
    })
    // Default Options
    var company        = null;
    var rowStyle = defaultStyle;
    var content     = <div></div>
    var clicker  = ()=>{};

    // Company Options
    if(validDay){
      // Default
      content = <div style={{}}>{day}</div>
      for(var k = 0; k <days.length; k++){
        if(weekday == days[k]){
          // rowStyle = chosenStyle;
          rowStyle = hoverStyle;
          company  = companyData[k];
          content  = <Hover><div style={{textAlign:'right'}}>{day}</div> {company.name}  <br/>  {company.range} </Hover>;
          // clicker  = self.selectDate;
          break;
        }
      }
          console.log("weekday" + weekday);
          console.log("corporate" + days[k]);
    }
    else{
    day = null;
    }
    return <th style={rowStyle} ><div style={{height:'40px', width:'100px'}}> {content} </div></th>
  }

    comp.push(<tr> <th style={{textAlign:"center"}} colSpan="7"> {cal_months_labels[this.state.month]}</th></tr>);
    // Week Day Labels
    for(var i = 0; i <= 6; i++ ){
      temp = <th style={headStyle}>{cal_days_labels[i]} <br/>{}</th>;
      temp2.push(temp);
    }
    comp.push(<tr> {temp2} </tr>);
    temp = [];
    temp2 = [];


    for (var i = 0; i < 5; i++) {  // this loop is for is weeks (rows)
      for (var j = 0; j <= 6; j++) {  // this loop is for weekdays (cells)
        if (day <= monthLength && (i > 0 || j >= startingDay)) {  // Sets up for starting day
          item = day;
          day++;
          validDay = true;
          console.log(day);
        }
        // temp = <th style={defaultStyle}>{item} <br/>{}</th>;
        temp = decorateCell(companyData, day, validDay, weekday);
        temp2.push(temp);
        if(weekday<6) weekday++;  else { weekday = 0; } // Update weekday
      }
      comp.push(<tr> {temp2} </tr>);
      // stop making rows if we've run out of days
      if (day > monthLength) {
        break;
      } else {
      }
      // Clear temporaries
      temp = [];
      temp2 = [];
      item = [];
      validDay = false;
    }
    return <div> <table> <tbody> {comp} </tbody> </table></div>
  }
})




var Calendar = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  toggleHover: function(){
    this.setState({hover: !this.state.hover})
  },
  selectDate: function(){
    var m = document.getElementsByClassName("cal1")[0];
    var n = document.getElementsByClassName("timeslot")[0];
    n.style.display = "block";
  },
  revealCal: function(){
    var m = document.getElementsByClassName("cal1")[0];
    var o = document.getElementsByClassName("corporateBtn")[0];
    var p = document.getElementsByClassName("corporateBtn")[1];
    console.log(m);
    m.style.display = "block";
    o.style.display = "none";
    p.style.display = "none";
  },
  render: function() {
    var topStyle={
      height: '100px', width: '100px', textAlign: 'right', marginTop: '10px', paddingLeft: '4px', paddingRight: '4px',
      fontFamily: 'Helvetica', backgroundColor: '#444444b', borderColor:"black"
    };
    var headStyle={
      height: '40px', width: '100px', textAlign: 'center', marginTop: '10px', marginBottom: '0px', paddingTop: '10px',
      paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '14px', backgroundColor: '#444444b',
      borderColor:"black", color: '#ADADAB' };
    var chosenStyle={
      height: '40px', width: '100px', textAlign: 'right', marginTop: '10px', marginBottom: '0px', paddingTop: '10px',
      paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '12px', backgroundColor: '#7A7A7A',
      borderColor:"black", color: '#ADADAB'
    };
    var defaultStyle={
      height: '40px', width: '100px', textAlign: 'right', marginTop: '10px', marginBottom: '0px', paddingTop: '10px',
      paddingLeft: '4px', paddingRight: '4px', fontFamily: 'Helvetica', fontSize: '12px', backgroundColor: 'white',
      borderColor:"black", color: '#ADADAB'
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

    return <div>
    <button className="corporateBtn" onClick={this.revealCal}> Corporate </button>
    <div  style={{}}>
     </div>
      <div className="cal1" style={{display:"none", height:"600px", width:"100%", borderRadius:"10px", backgroundColor:"white", borderColor:"black"}}>
         <select>
             <option value="1">Select Company</option>
             <option value="2">DayBreak Games </option>
         </select>

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
    };

    // <img style={avatarStyle} src="img/daybreakgames.jpg"></img>
    return <div>
    <div style={{display:"flex"}}>
    <Calendar style={{flex:"3"}} />
    <Calendar_C />
    <Hover/>
    </div>
    </div>
    ;
  }
});

ReactDOM.render(
  <Master />,
  document.getElementById('container')
);
