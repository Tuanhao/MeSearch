import React, { Component } from 'react';
import './css/Login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			username: '',
			password: '',
			userId: ''

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
			return response.json()
		})
		.then((myJson) => {
			console.log(myJson)
			this.setState({userId: myJson.userId}) 
			this.props.handlerUserId(this.state.userId)
		});
		this.props.handlerLgRg();
	}
	
	setUsername(event) { this.setState({username: event.target.value}); }
	
	setPassword(event) { this.setState({password: event.target.value}); }

	render() {
		return (
			<div className="Login">
				<label>Username:</label>
				<input 
					type="text" 
					className ="form-control" 
					id="username" 
					name="username"
					value={this.state.username}
					onChange={this.setUsername}
				></input><br></br>
				<label>Password:</label>
				<input 
					type="password" 
					className ="form-control" 
					id="password" 
					name="password"
					value={this.state.password}
					onChange={this.setPassword}
				></input><br></br>
				<button  value="Login"  onClick = {this.handleClick} >Login</button>
			</div>
		); 
	}
}

export default Login;