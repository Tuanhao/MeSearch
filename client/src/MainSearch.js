import React, { Component } from 'react';
//import './MainSearch.css';

class MainSearch extends Component {
	constructor() {
		super();
		this.state = { Done: false };
	}

	//handleClick() {}

	render() {
		return (
			<div className="MainSearch">
			<form>
				<input type="text" id="searchBar" name="searchBar"></input><br></br>
				<button value="SearchButton">Search</button>					
			</form>	
			<button  onClick = {this.props.handlerMSearch} >Back to App</button>
			</div>
		); 
	}
}

export default MainSearch;