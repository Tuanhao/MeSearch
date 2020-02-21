import React, { Component } from 'react';
//import './MainSearch.css';
//import Register from './Register.js';

class MainSearch extends Component {
	constructor() {
		super();
		this.state = { 
			userId: 'None',
			keyword: 'None',
			category: 'None'
		};
		this.setCategory = this.setCategory.bind(this);
		this.setKeyword = this.setKeyword.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleClick = () => {
		fetch('/api/search', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userId: this.props.userId,
			keyword: this.state.keyword,
			category: this.state.category
		
		})
		})
		.then((response) => {
			return response.json()
		})
		.then((myJson) => {
			console.log(myJson)
		});
		//this.props.handlerMSearch();
		//this.handleSubmit();
	}
	
	setCategory(event) { this.setState({category: event.target.value}); }

	
	// handleSubmit(event) {
		// event.preventDefault();
    
		//alert(`You chose the ${this.state.category} `);
	// }
	
	setKeyword(event) { this.setState({keyword: event.target.value}); }

	render() {
		return (
			<div className="MainSearch">
			{this.state.keyword}
				<h1>MeSearch</h1>
				<input 
					type="text" 
					className ="form-control" 
					id="keyword" 
					name="keyword"
					value={this.state.keyword}
					onChange={this.setKeyword}
					></input><br></br>
				<button value="SearchButton" onClick = {this.handleClick} >Search</button>					
				<button  onClick = {this.props.handlerMSearch}>Back to App</button>
				<div>
					<label>
					<input 
						type="radio" 
						value="sports" 
						checked={this.state.category === 'sports'} 
						onChange={this.setCategory} 
					/>Sports</label>
					<label>
					<input 
						type="radio" 
						value="movies" 
						checked={this.state.category === 'movies'} 
						onChange={this.setCategory} 
					/>Movies</label>
					<label>
					<input 
						type="radio" 
						value="music" 
						checked={this.state.category === 'music'} 
						onChange={this.setCategory} 
					/>Music</label>
					<label>
					<input 
						type="radio" 
						value="books" 
						checked={this.state.category === 'books'} 
						onChange={this.setCategory} 
					/>Books</label>
					<label>
					<input 
						type="radio" 
						value="games" 
						checked={this.state.category === 'games'} 
						onChange={this.setCategory} 
					/>Games</label>
					<label>
					<input 
						type="radio" 
						value="television" 
						checked={this.state.category === 'television'} 
						onChange={this.setCategory} 
					/>TV Shows</label>
				</div>
			</div>
		); 
	}
}


//value={this.state.keyword}
//onChange={this.setKeyword}
//onClick = {this.handleClick}
			// <form onSubmit={this.handleSubmit}>
	// <button type="submit" className="submit-button">Make your choice</button>
			// </form>
export default MainSearch;