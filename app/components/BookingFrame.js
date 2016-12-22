var React = require('react');
var ReactRouter = require('react-router');
var LabelCarousel = require('../components/custom/LabelCarousel');
var CorporateCalendar = require('../components/CorporateCalendar');

var BookingFrame = React.createClass({
        getInitialState: function(){
          return {
            checked: false,
           }
        },
        callmagic: function(){
          this.setState({checked: true});
          // this.setState({checked: false});
          console.log("checked");
          alert("Hello");
        },
        render: function(){
        return(
        		<div style={{padding:"0px", margin: "0px", backgroundColor: "black", width: "100%", height: "1000px"}}>
                  <LabelCarousel checked={this.state.checked}/>
                    <div style={{width:"100%", backgroundColor:"blue", height:"400px", width: "100%"}}>
                    <CorporateCalendar />

                    <button onClick={this.callmagic}> Test </button>
                    </div>
    				</div>
              )
                }
});

module.exports = BookingFrame;
