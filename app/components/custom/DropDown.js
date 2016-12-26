var React = require('react');
var ReactRouter = require('react-router');

var DropDown = React.createClass({
  getInitialState: function(){
    return {
      value: 'visa',
      options: this.props.options
    }
  },
  handleChange: function(event){
    this.setState({value: event.target.value, options: this.props.options});
    alert(this.state.value);
  },
  render: function(){
  var ops = this.props.options.map(function(item){
    return (<option value={item}> {item}</option>);
  });
  return(
    <div style={{backgroundColor: "black"}}>
      <select value={this.state.value} onChange={this.handleChange}>
        {ops}
      </select>
        {this.state.value}

    </div>
  )
  }
});

module.exports = DropDown;
