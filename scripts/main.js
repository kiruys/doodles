
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

	/*
		componentDidMount: when the dom is ready, state is synched with Firebase
	*/
	componentDidMount() {
		base.syncState('doodle-store',{
			context: this,
			state : 'doodles'
		});
	}

	/*
		addDoodle: creates a unique doodle key, and adds the new doodle to the doodles 'state'
	*/
	addDoodle(doodle) {
		var timestamp = (new Date).getTime();
		this.state.doodles['doodle-' + timestamp] = doodle;
		this.setState({doodles : this.state.doodles});
	}

	/*
		removesDoodle: removes a doodle from 'doodles' by matching its unique key;
	*/
	removeDoodle(key) {
		if (confirm("are you sure you want to remove this doodle")) {
			this.state.doodles[key] = null;
			this.setState({doodles : this.state.doodles});
		}
	}

	/*
		setPosition: Stores the position of the mouse in the canvas,
		corrects for the positioning of the canvas.
		to do: correct for scroll position
	*/
	setPosition(evt) {
		var top =  evt.target.offsetTop;
		var left = evt.target.offsetLeft;

		this.state.position.x = evt.clientX - left;
		this.state.position.y = evt.clientY - top;

		this.setState({position : this.state.position});
		this.setState({doodles : this.state.doodles});
  	}

	/*
		currentDoodle: Stores the details of the doodle that is currently drawn to 
		render the doodle in the 'viewer'.
	*/
  	currentDoodle(doodle) {
  		this.state.currentDoodle.image = doodle.image;
  		this.state.currentDoodle.name = doodle.name;
  		this.setState({currentDoodle : this.state.currentDoodle});
  	}

	/*
		resetCurrentDoodle: Deletes the details of the doodles,
		when a doodle is added to the collection ('Save doodle')
		to do: make the doodle disappear in the 'viewer' when the state is cleared.
	*/
  	resetCurrentDoodle() {
  		this.state.currentDoodle = {image : '', name : ''};
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
					removeDoodle={this.removeDoodle.bind(this)} />
				<div className='clearfix'></div>
			</div>
		)	
	}
}

export default App;


ReactDOM.render(<App/>, document.querySelector('#main'));

