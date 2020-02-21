import React, { Component } from 'react';
//import './SearchResults.css';

class SearchResults extends Component {
	constructor() {
		super();
		this.state = { Done: false };
	}
	
//handleClick() {}
	
	render() {
		return (
			<div className="SearchResults">
				<h3>MeSearch</h3>
				<input type="text" class ="form-control" id="searchBar" name="searchBar"></input>
				<button value="SearchButton">Search</button>
				<hr></hr>
				<div className="results">
				</div>
			</div>
		); 
	}
}

export default SearchResults;