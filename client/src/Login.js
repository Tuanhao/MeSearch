import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
	constructor() {
		super();
		this.state = { 
			username: "None",
			password: "None"

		};
	}

	handleClick = () => {
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: 'username',
				password: 'password'
			
			})
		})
		.then((response) => {
			return response.json()
		})
		.then((myJson) => {
			console.log(myJson)
		});
		//this.props.handlerLgRg();
	}

	render() {
		return (
			<div className="Login">
				<label>Username:</label>
				<input type="text" className ="form-control" id="username" name="username"></input><br></br>
				<label>Password:</label>
				<input type="password" className ="form-control" id="password" name="password"></input><br></br>
				<button  value="Login"  onClick = {this.handleClick} >Login</button>
				<button  onClick = {this.props.handlerLgRg} >Back to App</button>
			</div>
		); 
	}
}

export default Login;