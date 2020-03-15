import React, { Component } from 'react';
import './css/App.css';
import LoginAndRegistration from './LoginAndRegistration.js';
import MainSearch from './MainSearch.js';
import SearchResults from './SearchResults.js';
import Setting from './Setting.js';

class App extends Component {
	// Initialize state
	state = { 
		userId: '',
		results: [],
		MSearchDone: false,
		LoginDone: false,
		ShowSettings: false
		
	}

	constructor(props) {
		super(props)

		this.handlerLgRg = this.handlerLgRg.bind(this)
		this.handlerMSearch = this.handlerMSearch.bind(this)
		this.handlerRSearch = this.handlerRSearch.bind(this)
		this.handlerUserId = this.handlerUserId.bind(this)
		this.handlerResults = this.handlerResults.bind(this)
		this.handleSetting = this.handleSetting.bind(this)
	}

	handlerLgRg() { this.setState({LoginDone: true}) }

	handlerMSearch() { this.setState({MSearchDone: true}) }
	
	handlerRSearch() { 
		this.setState({ShowSettings: false})
		this.setState({MSearchDone: false})
		this.setState({LoginDone: true})
	}
	
	handleSetting() { 
		this.setState({ShowSettings: true})
		this.setState({MSearchDone: false})
		this.setState({LoginDone: true})
	}
	
	handlerUserId(value) { this.setState({userId: value}) }
	
	handlerResults(value) { this.setState({results: value}) }
	test() {alert('it works');}

	render() {
		return (
			<html>
				<head>
					<title>MeSearch</title>
					<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" />
				</head>
				<body>
					
					<div className="App">
						<h1><span id="me">Me</span>Search</h1>
						{!this.state.LoginDone && <LoginAndRegistration 
							handlerLgRg = {this.handlerLgRg} 
							handlerUserId = {this.handlerUserId} 
						/>}
						{(this.state.LoginDone && !this.state.MSearchDone && !this.state.ShowSettings) && <MainSearch 
							handlerMSearch = {this.handlerMSearch} 
							userId = {this.state.userId}
							handlerResults = {this.handlerResults}
							
						/>}
						{this.state.MSearchDone && <SearchResults
							handlerRSearch = {this.handlerRSearch}
							results = {this.state.results} 
						/>}
						{this.state.ShowSettings && <Setting
							handlerRSearch = {this.handlerRSearch}
						/>}
					</div>
				</body>
				<footer>
					<br /><br />
					{(this.state.LoginDone && !this.state.MSearchDone && !this.state.ShowSettings) && <p id ="settingButton" onClick={this.handleSetting}><u>Preferences Setting</u></p>}
				</footer>
			</html>
		)
	}
}


			

export default App;
