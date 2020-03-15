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
			QRResult: "None"
		};
		this.QRoff = this.QRoff.bind(this);
		this.QRon = this.QRon.bind(this);
	}
		
	createResults() {
		let res = this.state.results;
		let tab = []

		for (let i = 0; i < res.length ; i++) {
		  tab.push(
			<tr>
				<div className="URL-box">
					<a href={res[i].url} target="_blank">{res[i].title}</a><br />
					<p><i> {res[i].description} </i></p>
				</div><div className="QRCode-box">	
					<button value="QRButton" onClick = { () => this.setQRCode( res[i].url )}>Generate QRCode for Search Result {i + 1}</button>
				</div>
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
	
	QRGenerater() {
		let result = this.createResults()
		let qrresult = this.state.QRResult
		let showqr = this.state.ShowQR
	
		return (
			<div>
				<QrCode id='QRCode' size={290} value={qrresult}/>
			</div>
		);
	}
  
    
	render() {
		const result = this.createResults()
		const showqr = this.state.ShowQR
		const qrresult = this.state.QRResult
		const rButton = this.state.ShowQR;
		
		return (		
			<div className="SearchResults">
				<button value="BackButton" onClick = {this.props.handlerRSearch}>Back to Search</button>
					{rButton && <button value="removeQR" onClick = {this.QRoff} >Remove QRCode</button>}
					
				<hr></hr>
				<div className="results">
					{showqr && <div ><QrCode id='QRCode' size={290} value={qrresult}/></div>}
					<table>
						{ result }
					</table>
					
				</div>
			</div>
		); 
	}
}

export default SearchResults;