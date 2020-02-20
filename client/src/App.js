import React, { Component } from 'react';
import './App.css';
//import LoginAndRegistration from './LoginAndRegistration.js';

class App extends Component {
  // Initialize state
  state = { passwords: [1, 2, 3] }
  
  constructor(props) {
    super(props)

    this.handlerLgRg = this.handlerLgRg.bind(this)
	this.handlerMSearch = this.handlerMSearch.bind(this)
  }
  
  handlerLgRg() {
    this.setState({
      LoginDone: true
    })
  }
  
    handlerMSearch() {
    this.setState({
      MSearchDone: true
    })
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    //fetch('/api/passwords')
      //.then(res => res.json())
      //.then(passwords => this.setState({ passwords }));
  }

  render() {
    const { passwords } = this.state;

		return (
		  <div className="App">
			{passwords}
			{!this.state.LoginDone && <LoginAndRegistration handlerLgRg = {this.handlerLgRg} />}
			{(this.state.LoginDone && !this.state.MSearchDone) && <MainSearch handlerMSearch = {this.handlerMSearch} />}
			{this.state.MSearchDone && <SearchResults />}
		  </div>
		 )
  }
}

///////////COLE"S CODE/////////////////////


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
		{this.state.isShowLG && <Login handlerLgRg = {this.props.handlerLgRg} />}

		{!(this.state.isShowLG || this.state.isShowRG) && <button onClick={this.handleClickRG}>Register</button>}
		{this.state.isShowRG && <Register  handlerLgRg = {this.props.handlerLgRg} />}	
	</div>
	);
  }
}

class Login extends Component {
	constructor() {
    super();
    this.state = { Done: false };
	
	// this.handleClick = this.handleClick.bind(this);
  }
	
	handleClick = () => {
		fetch('/api/login')
		.then(res => console.log('res', res))
		// this.props.handlerLgRg();
  }
	
  render() {
	return (
	  <div className="Login">
		<form >
			<label for="username">Username:</label>
			<input type="text" id="username" name="username"></input><br></br>
			<label for="password">Password:</label>
			<input type="text" id="password" name="password"></input><br></br>
			<input type="submit" value="Login" onClick={this.handleClick}></input>
		</form>	
		<button  onClick = {this.props.handlerLgRg} >Back to App</button>
	  </div>
	); 
  }
}

class Register extends Component {
	constructor() {
    super();
    this.state = { Done: false };
  }
	
// handleClick() {

  // }
	
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
		<button  onClick = {this.props.handlerLgRg} >Back to App</button>
	  </div>
	); 
  }
}


class MainSearch extends Component {
	constructor() {
    super();
    this.state = { Done: false };

  }
	
handleClick() {

  }
	
  render() {
	return (
	  <div className="MainSearch">
		<form>
			<input type="text" id="searchBar" name="searchBar"></input><br></br>
			<input type="submit" value="Search"></input>	
		</form>	
		<button  onClick = {this.props.handlerMSearch} >Back to App</button>
	  </div>
	); 
  }
}

class SearchResults extends Component {
	constructor() {
    super();
    this.state = { Done: false };

  }
	
handleClick() {

  }
	
  render() {
	return (
  <div className="SearchResults">
		<form>
			<input type="text" id="searchBar" name="searchBar"></input>
			<input type="submit" value="Search"></input>	
		</form>	
	  </div>
	); 
  }
}

////////////////////////
export default App;
