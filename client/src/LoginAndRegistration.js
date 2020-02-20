import React, { Component } from 'react';
//import App from './App.js';
//import './LoginAndRegistration.css';
//import Login from './Login.js';

class LoginAndRegistration extends Component {
  constructor() {
	super();
	this.state = { 
		isShowLG: false,
		isShowRG: false 
	}
	this.handleClickLG = this.handleClickLG.bind(this);
	this.handleClickRG = this.handleClickRG.bind(this)
  }
  handleClickLG() {
	this.setState({ isShowLG: true })
	
  }
   handleClickRG() {
	this.setState({ isShowRG: true })
	
  }
  render() {
	return (
	<div>
		{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickLG}>Login</button>}
		{this.state.isShowLG && <Login />}

		{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickRG}>Register</button>}
		{this.state.isShowRG && <Register />}
		
	</div>
	);
  }
}



class LoginAndRegistration extends Component {
	constructor(props) {
    super(props);
    this.state = { Done: false };
	this.value= false;

  }
	
  render() {
	return (
	  <div className="LoginAndRegistration">
		<Foo />
	  </div>
	) 
  }
}

class Login extends Component {
	constructor() {
    super();
    this.state = { Done: false };
  }
	
	handleClick() {
	
  }
	
  render() {
	return (
	  <div className="Login">
		<form method= "post" action="http://www.randyconnolly.com/tests/process.php">
			<label for="username">Username:</label>
			<input type="text" id="username" name="username"></input><br></br>
			<label for="password">Password:</label>
			<input type="text" id="password" name="password"></input><br></br>
			<input type="submit" value="Login"></input>
		</form>	
	  </div>
	); 
  }
}

class Register extends Component {
	constructor() {
    super();
    this.state = { Done: false };

  }
	
handleClick() {

  }
	
  render() {
	return (
	  <div className="Register">
		<form>
			<label for="username">Username:</label>
			<input type="text" id="username" name="username"></input><br></br>
			<label for="password">Password:</label>
			<input type="text" id="password" name="password"></input><br></br>
			<label for="rPassword">Repeat Password:</label>
			<input type="text" id="username" name="username"></input><br></br>
			<input type="submit" value="Register"></input>	
		</form>	
	  </div>
	); 
  }
}

//<button className="LoginButton" onClick ={this.handleClick()} >Register</button>


export default LoginAndRegistration;