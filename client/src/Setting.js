import React, { Component } from 'react';
import './css/Register.css';

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			userId: this.props.userId,
			sports: this.props.sports,
			movies: this.props.movies,
			books: this.props.books,
			music: this.props.music,
			games: this.props.games,
			television: this.props.television,
			check: Array(6).fill(false)	
		}
		this.setSport = this.setSport.bind(this);
		this.setBook = this.setBook.bind(this);
		this.setMovie = this.setMovie.bind(this);
		this.setMusic = this.setMusic.bind(this);
		this.setGame = this.setGame.bind(this);
		this.setTVShow = this.setTVShow.bind(this);
		
	}
	
	setSport(event) { this.setState({sports: event.target.value}) 
		this.props.setSport(event) }

	setMusic(event) { this.setState({music: event.target.value}) 
		this.props.setMusic(event) }
	
	setGame(event) { this.setState({games: event.target.value}) 
		this.props.setGame(event) }
	
	setBook(event) { this.setState({books: event.target.value}) 
		this.props.setBook(event) }
	
	setMovie(event) { this.setState({movies: event.target.value}) 
		this.props.setMovie(event) }
	
	setTVShow(event) { this.setState({television: event.target.value}) 
		this.props.setTVShow(event) }
	
	
	settingCheck(string) {
		let expression1 = /(\w+, +\w+|\w+,\w+)/g;
		let expression2 = /(, \w+)|(,\w+)/g;
		let expression3 = /(^\w)/;
		let expression4 = /(\w$)/;
		
		if((string.match(expression1) == null) || (string.match(expression2) == null) || (string.match(expression3) == null)|| (string.match(expression4) == null)) {
			return false;
		}
		
		let count1 = string.match(expression1).length;	
		let count2 = (string.match(expression2)).length;
		let count3 = string.match(expression3).length;
		let count4 = string.match(expression4).length;
		
		if((count1 <= 0) || (count2 < 2) || (count3 <= 0) || (count4 <= 0)) {
			return false;
		}
		return true;
	}

	handleClick = () => {
		let overallTrue = true;
		let c = this.state.check.slice();
		
		if(!this.settingCheck(this.state.sports)) {
			c[0] = true;
			overallTrue = false;
		} else {
			c[0] = false;
		} if (!this.settingCheck(this.state.movies)) {
			c[1] = true;
			overallTrue = false;
		} else {
			c[1] = false;
		}  if (!this.settingCheck(this.state.books)) {
			overallTrue = false;
			c[2] = true;
		} else {
			c[2] = false;
		} if (!this.settingCheck(this.state.games)) {
			overallTrue = false;
			c[3] = true;
		} else {
			c[3] = false;
		} if (!this.settingCheck(this.state.music)) {
			overallTrue = false;
			c[4] = true;
		} else {
			c[4] = false;
		} if (!this.settingCheck(this.state.television)) {
			c[5] = true;
			overallTrue = false;
		} else {
			c[5] = false;
		} 	 		
		
		if (!overallTrue) {
			alert('Sorry, but you must have 3 or more items in your list. Items are separated by ","');
			this.setState({check: c});
			return;
		} 
		
		fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: this.state.userId,
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
		});
		
	}

	render() {
		const pWrong = <p className = "wrong">This is wrong, try again please</p>;
		
		return (
			<div className="Register">
				<h3>Tell us what you like</h3><br></br>
				<p id="listInfo"> Please have at least 3 items in each list. (Items are separated by ",")</p><br />
				<label>Sports:</label>{ this.state.check[0] && pWrong}
				<input 
					type="text" 
					className ={ this.state.check[0] ? "form-register-invalid" : "form-register" }
					id="Sports" name="Sports" 
					value={this.state.sports} 
					onChange= {this.setSport}>
				</input><br></br>
				<label>Movies:</label>{ this.state.check[1] && pWrong}
				<input 
					type="text" 
					className ={ this.state.check[1] ? "form-register-invalid" : "form-register" } 
					id="Movies" 
					name="Movies" 
					value={this.state.movies} 
					onChange= {this.setMovie}>
				</input><br></br>
				<label>Books:</label>{ this.state.check[2] && pWrong}
				<input 
					type="text" 
					className ={ this.state.check[2] ? "form-register-invalid" : "form-register" }
					id="Books" 
					name="Books" 
					value={this.state.books} 
					onChange= {this.setBook}>
				</input><br></br>
				<label>Games:</label>{ this.state.check[3] && pWrong}
				<input 
					type="text" 
					className ={ this.state.check[3] ? "form-register-invalid" : "form-register" } 
					id="Games" 
					name="Games" 
					value={this.state.games} 
					onChange= {this.setGame}>
				</input><br></br>
				<label>Music:</label>{ this.state.check[4] && pWrong}
				<input 
					type="text" 
					className ={ this.state.check[4] ? "form-register-invalid" : "form-register" }
					id="Music" 
					name="Music" 
					value={this.state.music} 
					onChange= {this.setMusic}>
				</input><br></br>
				<label>TV Shows:</label>{ this.state.check[5] && pWrong}
				<input 
					type="text" 
					className ={ this.state.check[5] ? "form-register-invalid" : "form-register" }
					id="television" 
					name="television" 
					value={this.state.television} 
					onChange= {this.setTVShow}>
				</input><br></br>
				<button value="SaveButton" onClick = {this.handleClick}>Save Changes</button>		
				<button value="BackButton" onClick = {this.props.handlerRSearch}>Back to Search</button>				
			</div>
		); 
	}
}

export default Setting;