import React, { Component } from 'react';
//import './css/MainSearch.css';
import './css/font-awesome.css';
import Load from './Load.js';

class MainSearch extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			keyword: '',
			category: '',
			//loading: false
		};
		this.setCategory = this.setCategory.bind(this);
		this.setKeyword = this.setKeyword.bind(this);
	}



	handleClick = () => {
		//this.setState({loading: true});		

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
			console.log(myJson.filteredResults)
			//this.props.handlerResults(myJson.filteredResults)
			
		});
		
		this.props.handlerResults([{title: "onet", url: "http://www.google.ca", description: "des1"}, {title: "one2", url: "url2", description: "des3"}]);
		//setTimeout(()=>{this.props.handlerMSearch()} , 2500); 
		this.props.handlerMSearch();
		
	}
	
	setCategory(event) { this.setState({category: event.target.value}); }
	
	setKeyword(event) { this.setState({keyword: event.target.value}); }

	render() {
		return (
			<div className="MainSearch">
				<h1>MeSearch</h1>
				<input 
					type="text" 
					className ="" 
					id="keyword" 
					name="keyword"
					value={this.state.keyword}
					onChange={this.setKeyword}
					></input><br></br>
				<button value="SearchButton" onClick = {this.handleClick} >Search</button><br /><br />			
				<div>
					<label>Pick a Category</label> <br />				
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
//{this.state.loading && <Load />}
// disabled={this.state.loading}
					// {this.state.loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />}
					// {!this.state.loading && <span>Search</span>}
					// {this.state.loading && <span>Searching for Results</span>}

export default MainSearch;