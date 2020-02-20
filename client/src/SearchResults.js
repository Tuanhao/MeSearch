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
				<form>
					<input type="text" id="searchBar" name="searchBar"></input>
					<input type="submit" value="Search"></input>
					<button value="SearchButton">Search</button>
				</form>
				<div className="results">
				</div>
			</div>
		); 
	}
}

export default SearchResults;