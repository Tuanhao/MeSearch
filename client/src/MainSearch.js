import React, { Component } from 'react';
import './MainSearch.css';

class MainSearch extends Component {
	constructor() {
		super();
		this.state = { Done: false };
	}

	//handleClick() {
	//	this.props.handlerMSearch();
	//}

	render() {
		return (
			<div className="MainSearch">
				<h1>MeSearch</h1>
				<input type="text" className ="form-control" id="searchBar" name="searchBar"></input><br></br>
				<button value="SearchButton">Search</button>					
				<button  onClick = {this.props.handlerMSearch}>Back to App</button>
			</div>
		); 
	}
}

export default MainSearch;