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
		ShowSettings: false,
		sports: '',
		movies: '',
		books: '',
		music: '',
		games: '',
		television: '',
		filterSuccess: true
	}

	constructor(props) {
		super(props)

		this.handlerLgRg = this.handlerLgRg.bind(this)
		this.handlerMSearch = this.handlerMSearch.bind(this)
		this.handlerRSearch = this.handlerRSearch.bind(this)
		this.handlerUserId = this.handlerUserId.bind(this)
		this.handlerResults = this.handlerResults.bind(this)
		this.handleSetting = this.handleSetting.bind(this)
		this.handlerFSuccess = this.handlerFSuccess.bind(this)
		
		this.setSport = this.setSport.bind(this);
		this.setBook = this.setBook.bind(this);
		this.setMovie = this.setMovie.bind(this);
		this.setMusic = this.setMusic.bind(this);
		this.setGame = this.setGame.bind(this);
		this.setTVShow = this.setTVShow.bind(this);
		
		this.LogOut = this.LogOut.bind(this);
	}

	setSport(event) { this.setState({sports: event.target.value}) }
	setMusic(event) { this.setState({music: event.target.value}) }	
	setGame(event) { this.setState({games: event.target.value}) }	
	setBook(event) { this.setState({books: event.target.value}) }	
	setMovie(event) { this.setState({movies: event.target.value}) }	
	setTVShow(event) { this.setState({television: event.target.value}) }	


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
	
	handlerFSuccess(value) { this.setState({filterSuccess: value}) }
	
	LogOut() {
		this.setState({userId: ''})
		
		this.setState({sports: ''}) 
		this.setState({music: ''}) 	
		this.setState({games: ''}) 
		this.setState({books: ''}) 
		this.setState({movies: ''})	
		this.setState({television: ''})	
		this.setState({results: ''}) 

		this.setState({LoginDone: false})
		this.setState({ShowSettings: false})
		this.setState({MSearchDone: false})
	}

	render() {
		return (
			<html>
				<head>
					<title>MeSearch</title>
					<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" />
				</head>
				<body>
					{(this.state.LoginDone) && <p id ="logOut" onClick={this.LogOut}><u>Log Out</u></p>}
					<div className="App">
						<h1><span id="me">Me</span>Search</h1>
						{!this.state.LoginDone && <LoginAndRegistration 
							handlerLgRg = {this.handlerLgRg} 
							handlerUserId = {this.handlerUserId} 
							
							setSport = {this.setSport}
							setBook = {this.setBook}
							setMovie = {this.setMovie}
							setMusic = {this.setMusic}
							setGame = {this.setGame}
							setTVShow = {this.setTVShow}
						/>}
						{(this.state.LoginDone && !this.state.MSearchDone && !this.state.ShowSettings) && <MainSearch 
							handlerMSearch = {this.handlerMSearch} 
							userId = {this.state.userId}
							handlerResults = {this.handlerResults}
							handlerFSuccess = {this.handlerFSuccess}
						/>}
						{this.state.MSearchDone && <SearchResults
							handlerRSearch = {this.handlerRSearch}
							results = {this.state.results} 
							filterSuccess =	{this.state.filterSuccess} 
						/>}
						{this.state.ShowSettings && <Setting
							handlerRSearch = {this.handlerRSearch}
							
							sports= {this.state.sports}
							movies= {this.state.movies}
							books= {this.state.books}
							music= {this.state.music}
							games= {this.state.games}
							television= {this.state.television}
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
