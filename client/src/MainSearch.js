import React, { Component } from 'react';
import './css/MainSearch.css';

class MainSearch extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			keyword: '',
			category: 'sports',
			loading: false,
			status: 0,
		};
		this.setCategory = this.setCategory.bind(this);
		this.setKeyword = this.setKeyword.bind(this);
	}



	handleClick = () => {
		this.setState({loading: true});		

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
			this.setState({status: response.status})
			return response.json()
		})
		.then((myJson) => {
			if (this.state.status == 200) {
				this.props.handlerResults(myJson.filteredResults)
				this.props.handlerFSuccess(myJson.filteredResults.filterSuccess)
				this.props.handlerMSearch()
			} else {
				console.log(myJson.msg);
			}
		});
		
		// this.props.handlerResults([{title: "onet i like the computer", url: "http://www.google.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "2t i like the computer", url: "2", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "3t i like the computer", url: "3", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "4 i like the computer", url: "4a", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "5 i like the computer", url: "5google.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "6 i like the computer", url: "6a", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "7 i like the computer", url: "7ogle.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "7 i like the computer", url: "8ogle.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "8 i like the computer", url: "9://www.google.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "9 i like the computer", url: "10w.google.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "10 i like the computer", url: "11.google.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "11 i like the computer", url: "12ogle.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "12 i like the computer", url: "ww.google.ca", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."},
		// {title: "13 i like the computer", url: "http://w", description: "des1  I hate to complain, because it might just be the best Word Processing app out there. But, there are innumerable problems with the interface - especially manipulating/dragging the cursor for editing. Also there are periodic discrepancies in template formatting, indentions, margins and paragraph spaci..."}
		
		// ]);
		// setTimeout(()=>{this.props.handlerMSearch()} , 10500); 		
	}
	
	setCategory(event) { this.setState({category: event.target.value}); }
	
	setKeyword(event) { this.setState({keyword: event.target.value}); }

	render() {
		return (
			<div className="MainSearch">
				<input 
					type="text" 
					className ="form-search" 
					id="keyword" 
					name="keyword"
					placeholder='Search...'
					value={this.state.keyword}
					onChange={this.setKeyword}
					></input><br></br>
				<button value="SearchButton" onClick = {this.handleClick} disabled={this.state.loading} >
					{!this.state.loading &&<i className="fa fa-search"   style={{ marginRight: "5px"}} ></i>}
					{this.state.loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />}
					{!this.state.loading && <span>Search</span>}
					{this.state.loading && <span>Searching for Results</span>}
				</button><br /><br />		
				<label><u>Pick a Category</u></label> <br />
				<div className="category-box">
					<div>			
						<label className="radio-label">
						<input 
							type="radio" 
							value="sports" 
							className="radio-input"
							checked={this.state.category === 'sports'} 
							onChange={this.setCategory} 
						/>Sports</label><br />
						<label className="radio-label">
						<input 
							type="radio" 
							value="movies" 
							className="radio-input"
							checked={this.state.category === 'movies'} 
							onChange={this.setCategory} 
						/>Movies</label>
					</div>
					<div>	
						<label className="radio-label">
						<input 
							type="radio" 
							value="music" 
							className="radio-input"
							checked={this.state.category === 'music'} 
							onChange={this.setCategory} 
						/>Music</label><br />
						<label className="radio-label">
						<input 
							type="radio" 
							value="books" 
							className="radio-input"
							checked={this.state.category === 'books'} 
							onChange={this.setCategory} 
						/>Books</label><br />
						<label className="radio-label">
						<input 
							type="radio" 
							value="smart" 
							className="radio-input"
							checked={this.state.category === 'smart'} 
							onChange={this.setCategory} 
						/>Smart Search</label>
					</div>
					<div>	
						<label className="radio-label">
						<input 
							type="radio" 
							value="games" 
							className="radio-input"
							checked={this.state.category === 'games'} 
							onChange={this.setCategory} 
						/>Games</label>	<br />
						<label className="radio-label">
						<input 
							type="radio" 
							value="television" 
							className="radio-input"
							checked={this.state.category === 'television'} 
							onChange={this.setCategory} 
						/>TV Shows</label>
					</div>
				</div>
			</div>
		); 
	}
}

export default MainSearch;