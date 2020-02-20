import React, { Component } from 'react';
//import './Register.css';

class Register extends Component {
	constructor() {
		super();
		this.state = { 
			password: "None",
			username: "None",
			sports: "None",
			movies: "None",
			books: "None",
			music: "None",
			games: "None",
			televisions: "None"
		}
		this.setUsername = this.setUsername.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.setSport = this.setSport.bind(this);
		this.setBook = this.setBook.bind(this);
		this.setMovie = this.setMovie.bind(this);
		this.setMusic = this.setMusic.bind(this);
		this.setGame = this.setGame.bind(this);
		this.setTVShow = this.setTVShow.bind(this);
		
	}

	setSport(event) {
		 this.setState({sports: event.target.value})
	}

	setMusic(event) {
		this.setState({music: event.target.value})
	}
	
	setGame(event) {
		this.setState({games: event.target.value})
	}
	
	setBook(event) {
		this.setState({books: event.target.value})
	}
	
	setMovie(event) {
		this.setState({movies: event.target.value})
	}
	
	setTVShow(event) {
		this.setState({televisions: event.target.value})
	}
	
	setUsername(event) {
		this.setState({username: event.target.value})
	}
	
	setPassword(event) {
		this.setState({password: event.target.value})
	}
	
	

	handleClick = () => {
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				password: this.state.password,
				username: this.state.username,
				sports: this.state.sports,
				movies: this.state.movies,
				books: this.state.books,
				music: this.state.music,
				games: this.state.games,
				televisions: this.state.televisions	
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((myJson) => {
			console.log(myJson)
		});
		
	}

	render() {
		return (
			<div className="Register">
				
					<label>Username:</label>
					<input type="text" id="username" name="username" value={this.state.value} onChange= {this.setUsername}></input><br></br>
					<label>Password:</label>
					<input type="text" id="password" name="password" value={this.state.value} onChange= {this.setPassword}></input><br></br>
					<label>Repeat Password:</label>
					<input type="text" id="rpassword" name="rpassword"></input><br></br>
					<label>Tell US What You Like</label>
					<label>Sports:</label>
					<input type="text" id="Sports" name="Sports" value={this.state.value} onChange= {this.setSport}></input><br></br>
					<label>Movies:</label>
					<input type="text" id="Movies" name="Movies" value={this.state.value} onChange= {this.setMovie}></input><br></br>
					<label>Books:</label>
					<input type="text" id="Books" name="Books" value={this.state.value} onChange= {this.setBook}></input><br></br>
					<label>Games:</label>
					<input type="text" id="Games" name="Games" value={this.state.value} onChange= {this.setGame}></input><br></br>
					<label>Music:</label>
					<input type="text" id="Music" name="Music" value={this.state.value} onChange= {this.setMusic}></input><br></br>
					<label>TV Shows:</label>
					<input type="text" id="TVShows" name="TVShows" value={this.state.value} onChange= {this.setTVShow}></input><br></br>
					<button value="Register" onClick = {this.handleClick}>Register</button>	
					
				<button  onClick = {this.props.handlerLgRg} >Back to App</button>
			</div>
		); 
	}
}

export default Register;