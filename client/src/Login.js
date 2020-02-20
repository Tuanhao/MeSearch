import React, { Component } from 'react';
//import './Login.css';

class Login extends Component {
	constructor() {
		super();
		this.state = { Done: false };
	}

	handleClick = () => {
		fetch('/api/login')
		.then(res => console.log('res', res))
		//this.props.handlerLgRg();
	}

	render() {
		return (
			<div className="Login">
				<form >
					<label>Username:</label>
					<input type="text" id="username" name="username"></input><br></br>
					<label>Password:</label>
					<input type="password" id="password" name="password"></input><br></br>
					<button  value="Login"  onClick = {this.handleClick} >Login</button>
				</form>	
				<button  onClick = {this.props.handlerLgRg} >Back to App</button>
			</div>
		); 
	}
}

export default Login;