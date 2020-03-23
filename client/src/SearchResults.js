import React, { Component } from 'react';
import './css/SearchResults.css';
import {render} from 'react-dom'
import QrCode from 'qrcode.react';

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			results: this.props.results,
			ShowQR: false,
			QRResult: "None",
			More: false
		};
		this.QRoff = this.QRoff.bind(this);
		this.QRon = this.QRon.bind(this);
		this.handlerMore = this.handlerMore.bind(this);
	}
		
	createResults(more) {
		let res = this.state.results;
		let tab = []
		let size = 10;
		let value = 0;
			
		if(more) {
			size = res.length;
			value = 10;
		}

		for (let i = value; i < size ; i++) {
		  tab.push(
			<tr>
				<div className="URL-box">
					<a href={res[i].url} target="_blank" dangerouslySetInnerHTML={{__html: res[i].title}}></a>
					<button value="QRButton" className="QRCode-button" onClick = { () => this.setQRCode( res[i].url )}>Generate QRCode</button><br />
					<p><i> {res[i].description} </i></p>
				</div><div className="QRCode-box"></div>
			</tr>
		  )
		}
		
		return tab
	}
  
	setQRCode(value) {
		this.QRon();
		this.setState({ QRResult: value });
	}
	
	QRoff() { this.setState({ShowQR: false}); }	
	QRon() { this.setState({ShowQR: true}); }
	handlerMore() { this.setState({More: true}); } // INCOMPLETE
     
	render() {
		const result = this.createResults(false)
		const resultMore = this.createResults(true)
		
		return (		
			<div className="SearchResults">
				<button value="BackButton" onClick = {this.props.handlerRSearch}>Back to Search</button>
					{this.state.ShowQR && <button value="removeQR" onClick = {this.QRoff} >Remove QRCode</button>}
					
				<hr></hr>
				<div className="results">
					{!this.props.filterSuccess && <span className="filterSuccess">*Sorry your Search was not able to go with your preferences, so here is a general search*</span>}
					{this.state.ShowQR && <div><QrCode id='QRCode' size={290} value={this.state.QRResult}/></div>}
					<table>
						{ result }
					</table>

					<table>
						{ this.state.More && resultMore }
					</table>
					<hr />
					{!this.state.More && <button value="moreButton" className="moreButton" onClick = {this.handlerMore} >More Results</button>}
				</div>
			</div>
		); 
	}
}

export default SearchResults;