var React = require('react');
var ReactRouter = require('react-router');

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
    backgroundColor: '#797979', opacity: 100
}

    var hover = {
      position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: '#C32025' , opacity: 1
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

module.exports = Hover;
