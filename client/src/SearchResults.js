import React, { Component } from 'react';
//import './css/SearchResults.css';

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			results: this.props.results
		};
	}
	
	createResults() {
		let res = this.state.results;
		let tab = []

		for (let i = 0; i < res.length ; i++) {
		  tab.push(
			<tr>
				<a href={res[i].url}>{res[i].title}</a><br />
				<p> {res[i].description} </p>
			</tr>
		  )
		}
		return tab
  }
   
	render() {
		const result = this.createResults()
		
		return (		
			<div className="SearchResults">
				<h1>MeSearch</h1>
				<button value="BackButton" onClick = {this.props.handlerRSearch}>Back to Search</button>
				<hr></hr>
				<div className="results">
					<table>
						{ result }
					</table>
				</div>
			</div>
		); 
	}
}

export default SearchResults;