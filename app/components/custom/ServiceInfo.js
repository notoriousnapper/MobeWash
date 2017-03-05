var React = require('react');
var Hover = require('../custom/Hover');
var $ = require('jquery');

// var companyData = [
//                   'DayBreakGames',
//                   'Alexandria'
// ];




var companyData =
[
  {
    name: "DayBreak Games",
    day: 3,
    location: "2222 San Francisco",
    range: "11:00 am-5:00 pm" // Should be changed to time objects -- Later iteration
  }
  , {
    name: "Illumina",
    day: 4,
    location: "0000 San Francisco",
    range: "11:00 am-5:00 pm" // Should be changed to time objects -- Later iteration
  }
]


var FontAwesome = require('react-fontawesome');
var ServiceInfo = React.createClass({
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      currentForm: nextProps
    });
  },
  getInitialState: function(){
    return {
      company: companyData[0].name,
      ctr: 0,
      currentForm: this.props.currentForm,
      mobeSelected: true,
      plusSelected: false,
      mobePrice: 2400,
      mobeAdditional: 600,
      plusPrice: 3500,
      plusAdditional: 1000,
      indicatorMessage:  'I would Like to schedule...', // Lets you know which option selected
      additionDescription:  '+25 minutes @ $',
      currentAdditionDescription:  "6.00", // Turns into string for ^ line
      checked:  false  //
    };
  },
  revealOnce: function(){
    if(this.state.ctr==0) this.props.magic();
    this.setState({ctr: this.state.ctr + 1});
  },
  selectCompany: function(event){
    var companyName = event.target.value;
    // Temporary for performance

    var i = 0;
    var fin = false;
    for(var i = 0; i < companyData.length; i++){
      if((companyData[i]).name == companyName) break;
        // Should at least get one company
        // FIX THIS TO BE SAFER
    }
    this.setState({
      company: companyName
    });
    this.props.updateCompany(companyData[i]);
  },
  /*
   * Function changes state of checked at end
   */
  /* Eventually put everything in here */
  masterChange: function(bool){
    var text = (bool)? this.state.mobeAdditional : this.state.plusAdditional;
    var dollars = text/100;
    // text = text.toString();
    text = dollars + "." + "00";
    // text = text.substring(0, text.length - 1);
    // var text = text.slice(0, 1) + "." + text.slice(1);
      this.setState({
        currentAdditionDescription: text
      });
  },
  priceIncrease:function(){
    if(this.props.currentForm== 1){
      if(!this.state.checked){ //If unchecked, a run through of this will make tru  e
          var newMobe = this.state.mobePrice + this.state.mobeAdditional;
          var newPlus = this.state.plusPrice + this.state.plusAdditional;
          this.setState({
            mobePrice: newMobe,
            plusPrice: newPlus
          });
          // Propagates prices up
          if(this.state.mobeSelected){ // Changing price overall
            this.props.priceChange(newMobe);  // Because state isn't updated when this calls
          } else {
            this.props.priceChange(newPlus);
          }
      }
      else{
          // Changes prices back
          var newMobe = this.state.mobePrice - this.state.mobeAdditional;
          var newPlus = this.state.plusPrice - this.state.plusAdditional;
          this.setState({
            mobePrice: newMobe,
            plusPrice: newPlus
          });

          // Propagates changed prices up
          if(this.state.mobeSelected){
          this.props.priceChange(newMobe);
          } else {
          this.props.priceChange(newPlus);
          }

        }
    }
    /* At the end, change state */
          this.setState({
            checked: !this.state.checked
          });
  },
  optionClick1: function(){
    if(this.props.currentForm== 1){
      this.setState({mobeSelected: true,
        plusSelected: false,
        indicatorMessage: 'Mobe selected!' });
    $('.option1').addClass('selected');
    $('.option2').removeClass('selected');
    $('.masteropt').css("height", "100%");
    this.props.priceChange(this.state.mobePrice);
    this.revealOnce();
    this.masterChange(true);
    // $('body').scrollTo('#componentTime'); // Scroll screen to target element
    }
  },
  optionClick2: function(){
    if(this.props.currentForm== 1){
      this.setState({mobeSelected: false,
        plusSelected: true,
        indicatorMessage: 'MobePlus selected!' });

    $('.option2').addClass('selected');
    $('.option1').removeClass('selected');
    $('.masteropt').css("height", "100%");
    this.props.priceChange(this.state.plusPrice);
    // $('body').scrollTo('#componentTime'); // Scroll screen to target element
    this.revealOnce();
    this.masterChange(false);
    }
  },
  render:function(){

    var innerStyle= {
        fontSize: "12px", color: '#696969',
        font: 'Arial'
    };
    var titleStyle= {
        fontWeight:" bold", fontSize:"14", color:"#444343", padding:"0", margin:"0", marginBottom:"4px",
        font: 'Helvetica Neue Neue'
    };

    var boxStyle= {
        flex:"1", display:"block", margin:"10", padding:"10px 20px", width:"45%", height:"150px",
        textAlign: "left", borderStyle:"solid", borderColor:"#E2E2E2", borderWidth:"1px"
    };
    var boxStyle2= { ...boxStyle, ...{height: "75px", width:"100%"} };
    // indicator Message = If you want to leave an inndicator of which message
    var companies = companyData.map(function(item){
      return (<option value={item.name}> {item.name} </option>);
    });

    return (
                <div id="serviceInfo" className="form masteropt" style={{padding: "10px 20px 10px 20px", width: "100%", height: "500px", backgroundColor:"#FBFDFF"}} >


                <div style={{margin:"0 auto", marginBottom: "20px", padding: "10px"}}>
                  <div> {'Please select your company to get started'} </div>
                  <br/>
                  <div className="styled-select slate" style={{margin: "0 auto", flex:"1", backgroundColor:"white", width: "400px"}}>
                      <select name='expireMM' id='expireMM' style={{width: "100px !important"}} value={this.state.company} onChange={this.selectCompany}>
                        {companies}
                      </select>
                    </div>
                </div>


                <div> {'I would like to schedule...'} </div>
                  <div  style={{display:"flex"}}>

                    <div className="opt option1" onClick={this.optionClick1} style={boxStyle}>
                        <div style={innerStyle}>
                          <h1 style={titleStyle}> Mobe</h1>

                          55 Minutes @ $24
                          <br />
                          The Full Exterior Car Wash Service
                          <br />
                          Quality Hand Wash with Wheel & Tire Shine
                        </div>
                     </div>


                      <div className="opt option2" onClick={this.optionClick2}style={boxStyle}>
                          <div style={innerStyle}>
                            <h1 style={titleStyle}> MobePlus </h1>
                            1 hour 30 minutes @ $35
                            <br />
                            The Full Exterior and Interior Car Wash Service
                            <br />
                            Quality Hand Wash with Wheel & Tire Shine
                            <br />
                            Floor & Seat Vacuum
                            <br />
                            Dash & Panel Clean
                            <br />
                            {'Interior Window Wipedown'}
                            <br />
                          </div>
                       </div>

                     </div>
                     <div  style={{...{fontWeight:" bold", fontSize:"14", color:"#444343", font: 'Helvetica Neue Neue'}, ...boxStyle2 }}>
                       <input style={{display: "inline-block", marginRight: "10px"}} type="checkbox" name="additional" checked={this.state.checked} onChange={this.priceIncrease} />
                       {'Is your car a SUV, Van, or Truck? *'}
                       <div style={innerStyle}> {this.state.additionDescription + this.state.currentAdditionDescription} </div>
                    </div>

                   </div>
    )
  }
});

module.exports = ServiceInfo;
                      // <input type="radio" value="sth"/>  <div> Do you have a truck </div>
                        // <img style={{width: "50px", height:"50px"}} src="/img/Sparkle_MobePlus.png"/>
                            // <FontAwesome name='truck' size="2x" />
