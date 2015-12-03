/*
	Viewer
*/

import React from 'react';

 class Viewer extends React.Component {
 	
	render() {
		var details = this.props.current;

		return (
			<li className="current">
				<h3>{details.name}</h3>
				<p className="time">{details.date}</p>
				<img src={details.image} />
			</li>
		)
	}
};

Viewer.propTypes = {
	current: React.PropTypes.object.isRequired
}

export default Viewer;

