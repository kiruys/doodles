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
}

export default Viewer;


			// <div className="viewer">
			// 	<h2>View Doodle</h2>
			// 	<div>
			// 		<h3>{details.name}</h3>
			// 		<p>{details.date}</p>
			// 		<img src={details.image} />
			// 	</div>
			// </div>