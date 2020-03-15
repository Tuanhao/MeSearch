import React, { Component } from 'react';
import './css/Register.css';
//import './css/bootstrap.css';

class Register extends Component {
	constructor() {
		super();
		this.state = { 
			password: '',
			rpassword: '',
			username: '',
			sports: '',
			movies: '',
			books: '',
			music: '',
			games: '',
			television: ''
		}
		this.setUsername = this.setUsername.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.setSport = this.setSport.bind(this);
		this.setBook = this.setBook.bind(this);
		this.setMovie = this.setMovie.bind(this);
		this.setMusic = this.setMusic.bind(this);
		this.setGame = this.setGame.bind(this);
		this.setTVShow = this.setTVShow.bind(this);
		this.setRPassword = this.setRPassword.bind(this);
		
	}

	

	setSport(event) { this.setState({sports: event.target.value}) }

	setMusic(event) { this.setState({music: event.target.value}) }
	
	setGame(event) { this.setState({games: event.target.value}) }
	
	setBook(event) { this.setState({books: event.target.value}) }
	
	setMovie(event) { this.setState({movies: event.target.value}) }
	
	setTVShow(event) { this.setState({television: event.target.value}) }
	
	setUsername(event) { this.setState({username: event.target.value}) }
	
	setPassword(event) { 
		this.setState({password: event.target.value}) 
	}
	
	setRPassword(event) { 
		this.setState({rpassword: event.target.value}) 
	}
	
	settingCheck(list) {
		//let list = event.target.value;
		let count = 0;
		
		for(let i =0;i <list.length; i++) {
			if(list.charAt(i) == ',') {
				count = count + 1;
			} 
		}
		
		// console.log(count);
		
		if(count < 2) {
			return false;
		}
		return true;
	}

	handleClick = () => {
		let overallTrue = false;
		overallTrue = this.settingCheck(this.state.sports);
		overallTrue = this.settingCheck(this.state.movies);
		overallTrue = this.settingCheck(this.state.books);
		overallTrue = this.settingCheck(this.state.music);
		overallTrue = this.settingCheck(this.state.games);
		overallTrue = this.settingCheck(this.state.television);
		if (!overallTrue) {
			alert('Sorry, but you must have 3 or more items in your list. Items are separated by ","');
			return;
		}
		
		if (this.state.password == this.state.rpassword) {
			fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					password: this.state.password,
					username: this.state.username,
					sports: this.state.sports,
					movies: this.state.movies,
					books: this.state.books,
					music: this.state.music,
					games: this.state.games,
					television: this.state.television
				})
			})
			.then((response) => {
				return response.json()
			})
			.then((myJson) => {
				console.log(myJson)
				this.setState({userId: myJson.userId}) 
				this.props.handlerUserId(this.state.userId)
			});
			//this.props.handlerLgRg();
		} else {
			alert('Sorry, Password does not match Repeat Password');
		}
	}

	render() {
		return (
			<div className="Register">
				<label>Username:</label>
				<input type="text" className ="form-register" id="username" name="username" value={this.state.username} onChange= {this.setUsername}></input><br></br>
				<label>Password:</label>
				<input type="password" className ="form-register" id="password" name="password" value={this.state.password} onChange= {this.setPassword}></input><br></br>
				<label>Repeat Password:</label>
				<input type="password" className ="form-register" id="rpassword" name="rpassword" value={this.state.rpassword} onChange= {this.setRPassword}></input><br></br><br></br>
				<h3>Tell us what you like</h3><br></br>
				<p id="listInfo"> Please have at least 3 items in each list. (Items should be separated by ",")</p><br />
				<label>Sports:</label>
				<input type="text" className ="form-register" id="Sports" name="Sports" value={this.state.sports} onChange= {this.setSport}></input><br></br>
				<label>Movies:</label>
				<input type="text" className ="form-register" id="Movies" name="Movies" value={this.state.movies} onChange= {this.setMovie}></input><br></br>
				<label>Books:</label>
				<input type="text" className ="form-register" id="Books" name="Books" value={this.state.books} onChange= {this.setBook}></input><br></br>
				<label>Games:</label>
				<input type="text" className ="form-register" id="Games" name="Games" value={this.state.games} onChange= {this.setGame}></input><br></br>
				<label>Music:</label>
				<input type="text" className ="form-register" id="Music" name="Music" value={this.state.music} onChange= {this.setMusic}></input><br></br>
				<label>TV Shows:</label>
				<input type="text" className ="form-register" id="television" name="television" value={this.state.television} onChange= {this.setTVShow}></input><br></br>
				<button value="Register" onClick = {this.handleClick}>Register</button>
				<button  onClick = {this.props.handleClickBack} >Back</button>				
				<button  onClick = {this.props.handlerLgRg} >Next</button>
				
			</div>
		); 
	}
}

export default Register;