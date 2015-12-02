
/*
  My drawing
*/

import React from 'react';

var MyDrawing = React.createClass({

class MyDrawing extends React.Component {

	
	
  // componentDidMount: function() {
  //   var context = ReactDOM.findDOMNode(this).getContext('2d');
  // },

  componentDidUpdate() {
    //var context = ReactDOM.findDOMNode(this).getContext('2d');

    	this.props.saveDoodle();
  }

  paint(evt) {
    var context = ReactDOM.findDOMNode(this).getContext('2d');
  	var pos = this.props.position;
  	var canvas = evt.target;

  	context.beginPath(); // begin

  	context.lineWidth = 5;
  	context.lineCap = 'round';
  	context.strokeStyle = '#c0392b';

  	context.moveTo(pos.x, pos.y); // from
  	this.props.setPosition(evt);
  	context.lineTo(pos.x, pos.y); // to

  	context.stroke(); // draw it!
  }

  render() {
  	var style = {
  		width : 400,
  		height : 400
  	}
    return <canvas width={400} height={400} onMouseEnter={this.props.setPosition.bind(this)} onMouseMove={this.paint.bind(this)} onMouseDown={this.props.setPosition.bind(this)} style={style}/>;
  }

}

export default MyDrawing;

