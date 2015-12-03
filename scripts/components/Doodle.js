/*
	Doodle
*/

import React from 'react';


class Doodle extends React.Component {

	render() {
		var details = this.props.details;
		var index = this.props.index;

		return (
			<li>
				<h3>{details.name}</h3>
				<p className="time">{details.date}</p>
				<img src={details.image} />
				<div className="clearfix"></div>
				<button onClick={this.props.removeDoodle.bind(null,index)}>remove</button>
			</li>
		)
	}
};

Doodle.propTypes = {
	index: React.PropTypes.string.isRequired,
	details: React.PropTypes.object.isRequired,
	removeDoodle: React.PropTypes.func.isRequired,
}

export default Doodle;