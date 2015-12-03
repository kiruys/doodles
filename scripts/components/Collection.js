/*
	Collection of doodles
*/

import React from 'react';
import Doodle from './Doodle';
import Viewer from './Viewer';

class Collection extends React.Component {
	/*
		showDoodle: renders each doodle from doodles state in the collection.
	*/
	showDoodle(key) {
		return (<Doodle key={key} index={key} details={this.props.doodles[key]}
			removeDoodle={this.props.removeDoodle.bind(this)} />
		)
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

Collection.propTypes = {
	doodles: React.PropTypes.object.isRequired,
	current: React.PropTypes.object.isRequired,
	removeDoodle: React.PropTypes.func.isRequired,
}

export default Collection;
