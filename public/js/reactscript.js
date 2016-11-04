/* React */
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
var VacancySign = React.createClass({
  revealCal: function(){
    var m = document.getElementsByClassName("cal1")[0];
    console.log(m);
    m.style.display = "block";
  },
  render: function() {
    var buttonStyle={
      argin: "auto",
      paddingLeft:"10px",
      paddingRight:"10px"
    }
    var avatarStyle={

      margin: "auto",
      width:"128px",
      height:"128px",
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
      backgroundColor: '#444444b',
      borderColor:"black",
      color: 'white'
    };


    var op1 = ['S','M','T','W','T','F','S'];
    var op2 = ['30','31','1','2','3','4','5'];
    var op3 = ['6','7','8','9','10','11','12'];
    var op4 = ['13','14','15','16','17','18','19'];
    var op5 = ['20','21','22','23','24','25','26'];
    var op6 = ['27','28','29','30','1','2','3'];


    // var test = function(firstday, prevmonth){
    //   var res = [];
    //   var temp = [];
    //   var i = 0, j = 0;
    //
    //   while(i<35){
    //
    //
    //     if(j>6){
    //       j = 0;
    //       temp = [];
    //       res.push(temp);
    //     }
    //     temp.push(i+)
    //     j++;
    //     i++;
    //   }
    // };






    var res = function(arr){arr.map(function(item){
        return <th style={topStyle}>{item}</th>;
      });
    };

    var r1 = op1.map(function(item){
        return <th style={headStyle}>{item}</th>;
    });
    var r2 = op2.map(function(item){
        return <th style={topStyle}>{item}</th>;
    });
    var r3 = op3.map(function(item){
        return <th style={topStyle}>{item}</th>;
    });
    var r4 = op4.map(function(item){
        return <th style={topStyle}>{item}</th>;
    });
    var r5 = op5.map(function(item){
        return <th style={topStyle}>{item}</th>;
    });
    var r6 = op6.map(function(item){
        return <th style={topStyle}>{item}</th>;
    });



    var text;
    if (this.props.hasvacancy) {
      text = 'Vacancy';
    } else {
      text = 'No Vacancy';
    }
    return <div>


    <button style={buttonStyle} onClick={this.revealCal}> Corporate </button>

     <div className="cal1" style={{display:"none"}}>
    <img style={avatarStyle} src="daybreakgames.jpg"></img>
     </div>
      <div style={{height:"600px", width:"60%", borderRadius:"10px", backgroundColor:"white", borderColor:"black"}}>
        <div style={{fontFamily: "Helvetica", height:"50px", width:"100%", backgroundColor:"white", borderColor:"grey",borderRadius:"10px"}}>
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
      </div>;
    </div>;
  }
});

ReactDOM.render(
  <VacancySign hasvacancy={false} />,
  document.getElementById('container')
);
