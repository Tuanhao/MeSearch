import React, { Component } from 'react';
import './App.css';
import LoginAndRegistration from './LoginAndRegistration.js';
import MainSearch from './MainSearch.js';
import SearchResults from './SearchResults.js';

class App extends Component {
	// Initialize state
	state = { passwords: [1, 2, 3] }

	constructor(props) {
		super(props)

		this.handlerLgRg = this.handlerLgRg.bind(this)
		this.handlerMSearch = this.handlerMSearch.bind(this)
	}

	handlerLgRg() { this.setState({LoginDone: true}) }

	handlerMSearch() { this.setState({MSearchDone: true}) }

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
				{!this.state.LoginDone && <LoginAndRegistration handlerLgRg = {this.handlerLgRg} />}
				{(this.state.LoginDone && !this.state.MSearchDone) && <MainSearch handlerMSearch = {this.handlerMSearch} />}
				{this.state.MSearchDone && <SearchResults />}
			</div>
		)
	}
}
// { passwords }
export default App;
