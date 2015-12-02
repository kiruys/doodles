/*
	Drawingboard
*/

import React from 'react';
import ReactDOM  from 'react-dom';


class Drawingboard extends React.Component {

	createDoodle(evt) {
		evt.preventDefault();

		var now = new Date;
		var hours = this.AddZero(now.getHours());
		var minutes = this.AddZero(now.getMinutes());
		
		var image = this.refs.drawing.toDataURL();
		var val = '';
		
		if (this.refs.name.value != '') {
			val = this.refs.name.value;
		}

		var doodle = {
			name : val,
			date : now.getDate() + '-' + (now.getMonth() + 1) + ' ' + now.getFullYear() + ' ' + hours + ':' + minutes,
			image : image
		}

		this.props.addDoodle(doodle);
		this.clearDrawingboard();
	}

	AddZero(number) {
		return (number < 10) ? ('0' + number) : number;
	}

	paint(evt) {
		var context = ReactDOM.findDOMNode(this.refs.drawing).getContext('2d');
		var pos = this.props.position;

		context.beginPath(); // begin

		context.lineWidth = 2;
		context.lineCap = 'round';
		context.strokeStyle = '#c0392b';

		context.moveTo(pos.x, pos.y); // from
		this.props.setPosition(evt);
		context.lineTo(pos.x, pos.y); // to

		context.stroke(); // draw it!

		this.updateCurrent();
	}

	clearDrawingboard() {
		var context = ReactDOM.findDOMNode(this.refs.drawing).getContext('2d');
		context.clearRect(0, 0, 200, 200);
		this.refs.name.value = '';
	}

	updateCurrent() {
		var doodle = new Object;
		doodle.image = this.refs.drawing.toDataURL();

		if (this.refs.name.value != '' && this.refs.name.value != undefined ) {
			doodle.name = this.refs.name.value;
		}

		this.props.currentDoodle(doodle);
	}

	render() {
		//var linkState = this.props.linkState;

		var style = {
	  		width : 200,
	  		height : 200
	  	};
		return (
			<div className="drawing-board">
				<h2>Drawingboard</h2>
				<canvas width={200} height={200} ref='drawing' style={style} position={this.props.position} 
					onMouseEnter={this.props.setPosition} onMouseMove={this.paint.bind(this)}
					onMouseDown={this.props.setPosition} />
				<div className="clearfix"></div>
				<br />
				<div className="input-container">
					<input ref="name" type="text" placeholder="Funky doodle name" onChange={this.updateCurrent.bind(this)}/>
					<div className="clearfix"></div>
					<button onClick={this.createDoodle.bind(this)}>Save doodle</button>
				</div>
				<div className="clearfix"></div>
				<br />
			</div>
		)
	}
}

export default Drawingboard;

//<label>Funky doodle name &nbsp;</label>