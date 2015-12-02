
import React from 'react';
import ReactDOM  from 'react-dom';

//Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://doodle-app.firebaseio.com');

import Catalyst from 'react-catalyst';

import Header from './components/Header';
import Drawingboard from './components/Drawingboard';
import Viewer from './components/Viewer';
import Collection from './components/Collection';
import Doodle from './components/Doodle';



class App extends React.Component {
	constructor() {
		super();

		this.state = {
			doodles : {},
			position : {x : 0, y : 0},
			currentDoodle : {image : '', name : ''}
		}
	}

	componentDidMount() {
		base.syncState('doodle-store',{
			context: this,
			state : 'doodles'
		});
	}

	addDoodle(doodle) {
		var timestamp = (new Date).getTime();
		this.state.doodles['doodle-' + timestamp] = doodle;
		this.setState({doodles : this.state.doodles});
	}

	removeDoodle(key) {
		if (confirm("are you sure you want to remove this doodle")) {
			this.state.doodles[key] = null;
			this.setState({doodles : this.state.doodles});
		}
	}

	editDoodle(key) {
		alert('edit');
	}

	setPosition(evt) {
		var top =  evt.target.offsetTop;
		var left = evt.target.offsetLeft;

		this.state.position.x = evt.clientX - left;
		this.state.position.y = evt.clientY - top;

		this.setState({position : this.state.position});
		this.setState({doodles : this.state.doodles});
  	}

  	currentDoodle(doodle) {
  		this.state.currentDoodle.image = doodle.image;
  		this.state.currentDoodle.name = doodle.name;
  		this.setState({currentDoodle : this.state.currentDoodle});
  	}

  	resetCurrentDoodle() {
  		// this.state.currentDoodle.image = '';
  		// this.state.currentDoodle.name = '';
  		this.state.currentDoodle = null;
  		this.setState({currentDoodle : this.state.currentDoodle});
  	}

	render() {
		return (
			<div>
				<Header />
				<Drawingboard ref='board'
					addDoodle={this.addDoodle.bind(this)}
					setPosition={this.setPosition.bind(this)}
					position={this.state.position}
					currentDoodle={this.currentDoodle.bind(this)}
					resetCurrentDoodle={this.resetCurrentDoodle.bind(this)} />
				<Collection doodles={this.state.doodles} current={this.state.currentDoodle}
					removeDoodle={this.removeDoodle.bind(this)}
					editDoodle={this.editDoodle.bind(this)} />
				<div className='clearfix'></div>
			
			</div>
		)	
	}
}

export default App;



ReactDOM.render(<App/>, document.querySelector('#main'));

