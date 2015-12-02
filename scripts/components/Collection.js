/*
	Collection of doodles
*/

import React from 'react';
import Doodle from './Doodle';
import Viewer from './Viewer';

class Collection extends React.Component {

	showDoodle(key) {
		return <Doodle key={key} index={key} details={this.props.doodles[key]}
			removeDoodle={this.props.removeDoodle.bind(this)} editDoodle={this.props.editDoodle.bind(this)} />
		//return <p key={key}>{key}</p>
	}

	render() {
		return (
			<div className="collection">
				<h2>My collection</h2>
				<ul>
					<Viewer current={this.props.current}/>
					{Object.keys(this.props.doodles).map(this.showDoodle.bind(this))}
				</ul>
				<div className="clearfix"></div>
			</div>
		)
	}
}

export default Collection;
