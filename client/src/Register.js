import React, { Component } from 'react';
import './css/Register.css';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			password: '',
			rpassword: '',
			username: '',
			sports: '',
			movies: '',
			books: '',
			music: '',
			games: '',
			television: '',
			status: 0,
			check: Array(9).fill(false)		
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
	
	setUsername(event) { this.setState({username: event.target.value}) }
	
	setPassword(event) { this.setState({password: event.target.value}) }
	
	setRPassword(event) { this.setState({rpassword: event.target.value}) }
	
	settingCheck(string) {
		let expression1 = /(\w+, +\w+|\w+,\w+)/;
		let expression2 = /(, \w+|,\w+)/;
		let expression3 = /(^\w)/;
		let expression4 = /(\w$)/;
		
		if((string.match(expression1) == null) || (string.match(expression2) == null) || (string.match(expression3) == null)|| (string.match(expression4) == null)) {
			return false;
		}
		
		let count1 = string.match(expression1).length;	
		let count2 = string.match(expression2).length;
		let count3 = string.match(expression3).length;
		let count4 = string.match(expression4).length;
		
		if((count1 <= 0) && (count2 < 2) || (count3 <= 0) || (count4 <= 0)) {
			return false;
		}
		return true;
	}
	
	valueCheck(value) {
		let rules = /[\W\s]+/;
		let invalid = rules.test(value);
		
		if((value.length < 7)|| invalid || (value.length > 13)) {
			return true;
		}
		return false;
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
		} if ((this.state.password != this.state.rpassword) || (this.valueCheck(this.state.password))) {
			c[6] = true;
			overallTrue = false;
		} else {
			c[6] = false;
		} if (this.valueCheck(this.state.username)) {
			c[8] = true;
			overallTrue = false;
		} else {
			c[8] = false;
		}	
		
		if (!overallTrue) {
			// let count = 0;
			// for(let i = 0; i < 6; i++) {
				// if(c[i]) {
					// count = count + 1;
				// }
			// }
			// if(c[6]) {
				// alert('Sorry, Password does not match Repeat Password or is invalid, try again please');
			// } if (c[8]){
				// alert('Sorry, username or is invalid, try again please');
			// }	if (count > 0) {
				// alert('Sorry, but you must have 3 or more items in your list. Items are separated by "," try again please');
			// }
			this.setState({check: c});
			return;
		} 
			
		if ((this.state.password == this.state.rpassword) && (this.valueCheck(this.state.password))) {
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
				this.setState({status: response.status})
				return response.json()
			})
			.then((myJson) => {
				console.log(myJson)
				if (this.state.status != 200) {
					//alert('Sorry, this is usename is already taken, try again please');
					c[7] = true;
					console.log(myJson.msg);
				} else {
					this.setState({userId: myJson.userId}) 
					this.props.handlerUserId(this.state.userId)
					c[7] = false;
					this.props.handlerLgRg();
				}

			});
		} 
		this.setState({check: c});		
	}

	render() {
		const pWrong = <p className = "wrong">This is wrong, try again please</p>;
		const usernameWrong = <p className = "wrong">This is usename is already taken, try again please</p>; 
		
		return (
			<div className="Register">
				<label>Username:</label>{ (this.state.check[7] && usernameWrong) || (this.state.check[8] && pWrong) }
				<input 
					type="text" 
					className = { (this.state.check[7] || this.state.check[8]) ? "form-register-invalid" : "form-register" }
					id="username" 
					name="username" 
					value={this.state.username} 
					onChange= {this.setUsername}>
				</input><br></br>
				<label>Password:</label>{ this.state.check[6] && pWrong}
				<input 
					type="password" 
					className = { this.state.check[6] ? "form-register-invalid" : "form-register" }
					id="password" 
					name="password" 
					value={this.state.password} 
					onChange= {this.setPassword}>
				</input><br></br>
				<label>Repeat Password:</label>{ this.state.check[6] && pWrong}
				<input 
					type="password" 
					className = { this.state.check[6] ? "form-register-invalid" : "form-register" } 
					id="rpassword" 
					name="rpassword" 
					value={this.state.rpassword} 
					onChange= {this.setRPassword}>
				</input><br></br>
				<span classsName="UPInfo">Password and Username must contain 6 to 13 characters and not contain !@#$%^&*()?/.,</span><br></br><br></br>
				<h3>Tell us what you like</h3><br></br>
				<p id="listInfo"> Please have at least 3 items in each list. (Items should be separated by ",")</p><br />
				<label>Sports:</label>{ this.state.check[0] && pWrong}
				<input 
					type="text" 
					className = { this.state.check[0] ? "form-register-invalid" : "form-register" }
					id="Sports" 
					name="Sports" 
					value={this.state.sports} 
					onChange= {this.setSport}>
				</input><br></br>
				<label>Movies:</label>{ this.state.check[1] && pWrong}
				<input 
					type="text" 
					className = { this.state.check[1] ? "form-register-invalid" : "form-register" }
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
					onChange= {this.setGame}></input><br></br>
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
				<button value="Register" onClick = {this.handleClick}>Register</button>
				<button  onClick = {this.props.handleClickBack} >Back</button>				

			</div>
		); 
	}
}


//<button  onClick = {this.props.handlerLgRg} >Next</button>
export default Register;