import React, { Component } from 'react';
//import './css/LoginAndRegistration.css';
import Login from './Login.js';
import Register from './Register.js';

class LoginAndRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			isShowLG: false,
			isShowRG: false,
			userId: ''
		}
		this.handleClickLG = this.handleClickLG.bind(this);
		this.handleClickRG = this.handleClickRG.bind(this);
	}
	
	handleClickLG() {this.setState({ isShowLG: true })}
	
	handleClickRG() {this.setState({ isShowRG: true })}
	
	handlerUserId(value) {this.setState({ userId: value })}

	render() {
		return (
			<div>
				{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickLG}>Login</button>}
				{this.state.isShowLG && <Login handlerLgRg = {this.props.handlerLgRg} handlerUserId = {this.props.handlerUserId} />}

				{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickRG}>Register</button>}
				{this.state.isShowRG && <Register  handlerLgRg = {this.props.handlerLgRg}  handlerUserId = {this.props.handlerUserId}/>}	
			</div>
		);
	}
}


export default LoginAndRegistration;