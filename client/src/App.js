import React, { Component } from 'react';
import './css/App.css';
import LoginAndRegistration from './LoginAndRegistration.js';
import MainSearch from './MainSearch.js';
import SearchResults from './SearchResults.js';
//import './css/bootstrap.css';

class App extends Component {
	// Initialize state
	state = { 
		userId: '',
		results: []
	}

	constructor(props) {
		super(props)

		this.handlerLgRg = this.handlerLgRg.bind(this)
		this.handlerMSearch = this.handlerMSearch.bind(this)
		this.handlerRSearch = this.handlerRSearch.bind(this)
		this.handlerUserId = this.handlerUserId.bind(this)
		this.handlerResults = this.handlerResults.bind(this)
	}

	handlerLgRg() { this.setState({LoginDone: true}) }

	handlerMSearch() { this.setState({MSearchDone: true}) }
	
	handlerRSearch() { 
		this.setState({MSearchDone: false})
		this.setState({LoginDone: true})
	}
	
	handlerUserId(value) { this.setState({userId: value}) }
	
	handlerResults(value) { this.setState({results: value}) }

	render() {
		return (
			<div className="App">
				{!this.state.LoginDone && <LoginAndRegistration 
					handlerLgRg = {this.handlerLgRg} 
					handlerUserId = {this.handlerUserId} 
				/>}
				{(this.state.LoginDone && !this.state.MSearchDone) && <MainSearch 
					handlerMSearch = {this.handlerMSearch} 
					userId = {this.state.userId}
					handlerResults = {this.handlerResults}
					
				/>}
				{this.state.MSearchDone && <SearchResults
					handlerRSearch = {this.handlerRSearch}
					results = {this.state.results} 
					
					
				/>}
			</div>
		)
	}
}

export default App;
