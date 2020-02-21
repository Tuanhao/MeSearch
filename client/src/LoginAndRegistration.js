import React, { Component } from 'react';
//import './LoginAndRegistration.css';
import Login from './Login.js';
import Register from './Register.js';

class LoginAndRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			isShowLG: false,
			isShowRG: false,
			Done: false
		}
		this.handleClickLG = this.handleClickLG.bind(this);
		this.handleClickRG = this.handleClickRG.bind(this);
	}
	
	handleClickLG() {this.setState({ isShowLG: true })}
	
	handleClickRG() {this.setState({ isShowRG: true })}

	render() {
		return (
			<div>
				<h1>MeSearch</h1>
				{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickLG}>Login</button>}
				{this.state.isShowLG && <Login handlerLgRg = {this.props.handlerLgRg} />}

				{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickRG}>Register</button>}
				{this.state.isShowRG && <Register  handlerLgRg = {this.props.handlerLgRg} />}	
			</div>
		);
	}
}


export default LoginAndRegistration;