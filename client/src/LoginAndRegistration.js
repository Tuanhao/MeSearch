import React, { Component } from 'react';
import Login from './Login.js';
import Register from './Register.js';

class LoginAndRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			isShowLG: false,
			isShowRG: false,
			//userId: ''	
		}
		this.handleClickLG = this.handleClickLG.bind(this);
		this.handleClickRG = this.handleClickRG.bind(this);
		this.handleClickBack = this.handleClickBack.bind(this);
	}	
	
	handleClickLG() {this.setState({ isShowLG: true })}
	
	handleClickRG() {this.setState({ isShowRG: true })}
	
	//handlerUserId(value) {this.setState({ userId: value })}
	
	handleClickBack() {
		this.setState({ isShowRG: false })
		this.setState({ isShowLG: false })
	}

	render() {
		return (
			<div>
				{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickLG}>Login</button>}
				{this.state.isShowLG && <Login 
					handlerLgRg = {this.props.handlerLgRg} 
					handlerUserId = {this.props.handlerUserId} 
					handleClickBack ={this.handleClickBack}
				/>}

				{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickRG} >Register</button>}
				{this.state.isShowRG && <Register  
					handlerLgRg = {this.props.handlerLgRg}  
					handlerUserId = {this.props.handlerUserId} 
					handleClickBack ={this.handleClickBack}
										
					setSport = {this.props.setSport}
					setBook = {this.props.setBook}
					setMovie = {this.props.setMovie}
					setMusic = {this.props.setMusic}
					setGame = {this.props.setGame}
					setTVShow = {this.props.setTVShow}
				/>}	
			</div>
		);
	}
}


export default LoginAndRegistration;