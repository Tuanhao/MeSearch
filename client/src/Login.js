import React, { Component } from 'react';
import './css/Login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			username: '',
			password: '',
			userId: '',
			status: 0,
			check: false	

		};
		this.setUsername = this.setUsername.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}

	handleClick = () => {
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			
			})
		})
		.then((response) => {
			this.setState({status: response.status})
			return response.json()
		})
		.then((myJson) => {
			if (this.state.status != 200) {
				//alert('Sorry, username or password is wrong, try again please');
				this.setState({check: true})
				return;
			} else {
				this.setState({userId: myJson.userId}) 
				this.props.handlerUserId(this.state.userId)
				this.setState({check: false})
				this.props.handlerLgRg();
			}
		});
		
	}
	
	setUsername(event) { this.setState({username: event.target.value}); }
	
	setPassword(event) { this.setState({password: event.target.value}); }

	render() {
		const pWrong = <p className = "wrong">This is wrong, try again please</p>;
		
		return (
			<div className="Login">
				<label>Username:</label>{ this.state.check && pWrong}
				<input 
					type="text" 
					className ={ this.state.check ? "form-login-invalid" : "form-login" }
					id="username" 
					name="username"
					value={this.state.username}
					onChange={this.setUsername}
				></input><br></br>
				<label>Password:</label>{ this.state.check && pWrong}
				<input 
					type="password" 
					className ={ this.state.check ? "form-login-invalid" : "form-login" }
					id="password" 
					name="password"
					value={this.state.password}
					onChange={this.setPassword}
				></input><br></br>
				<button  value="Login"  onClick = {this.handleClick} >Login</button>
				<button  value="BackButton"  onClick = {this.props.handleClickBack} >Back</button>
			</div>
		); 
	}
}

export default Login;