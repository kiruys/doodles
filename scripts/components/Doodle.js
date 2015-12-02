/*
	Doodle
*/

import React from 'react';


class Doodle extends React.Component {

	render() {
		var details = this.props.details;
		var index = this.props.index;

		return (
			<li onClick={this.props.editDoodle.bind(null, index)} >
				<h3>{details.name}</h3>
				<p className="time">{details.date}</p>
				<img src={details.image} />
				<div className="clearfix"></div>
				<button onClick={this.props.removeDoodle.bind(null,index)}>remove</button>
			</li>
		)
	}
}

export default Doodle;