import React, { Component } from 'react';
//import './SearchResults.css';
//import MainSearch from './MainSearch.css';

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			results: [],
		};
		
	}
	
	createResults() {
		//this.setState(results: this.props.results);
		let res = this.props.results;
		let table = []

		for (let i = 0; i < res.length ; i++) {
		  table.push(
			<tr>
				<a href={res[i].url}>{res[i].title}</a><br />
				<p> {res[i].description} </p>
			</tr>
		  )
		}
		return table
  }
	
	
	render() {
		return (
			<div className="SearchResults">
				<h3>MeSearch</h3>
				<button value="BackButton" onClick = {this.props.handlerRSearch}>Back to Search</button>
				<hr></hr>
				<div className="results">
					<table>
						{this.createResults()}
					</table>
				</div>
			</div>
		); 
	}
}

export default SearchResults;