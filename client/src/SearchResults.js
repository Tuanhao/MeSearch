import React, { Component } from 'react';
//import './css/SearchResults.css';
//import './js/bootstrap.js';
import {render} from 'react-dom'
import QrCode from 'react.qrcode.generator';
import Load from './Load.js';


class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			results: this.props.results,
			ShowQR: false,
			QRResult: "None",
			test: false
		};
		this.off = this.off.bind(this);
		this.on = this.on.bind(this);
	}
		
	createResults() {
		let res = this.state.results;
		let tab = []

		//setTimeout(()=>{this.setState({test: true})} , 2500);
		//this.setState({test: true});
		for (let i = 0; i < res.length ; i++) {
		  tab.push(
			<tr>
				<a href={res[i].url}>{res[i].title}</a><br />
				<p> {res[i].description} </p>
				<button value="BackButton" onClick = { () => this.setQRCode( res[i].url )}>Generate QRCode</button>
				<button value="BackButton" onClick = {() => this.off()}>Off</button>
			</tr>
		  )
		}
		
		return tab
	}
  
	setQRCode(value) {
		//let show = false
		
		// if(this.state.ShowQR) {
			// this.setState({ShowQR: false});
		// } else {
			 //this.setState({ShowQR: true});
		// }
		this.on();
		
		this.setState({
			QRResult: value
		});
	  
	}
	off() {
		this.setState({ShowQR: false});
		//document.body.removeChild('QRCode');
	}
	on() {
		this.setState({ShowQR: true});
		//document.body.appendChild('QRCode');
	}
	
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
		//var QRCode = require('qrcode.react');
		const result = this.createResults()
		const showqr = this.state.ShowQR
		const qrresult = this.state.QRResult
		//const QR = this.QRGenerater()
		
		return (		
			<div className="SearchResults">
				<h1>MeSearch</h1>
				<button value="BackButton" onClick = {this.props.handlerRSearch}>Back to Search</button>
				<hr></hr>
				<div className="results">
					<table>
						{ result }
					</table>
					{showqr && <div ><QrCode id='QRCode' size={290} value={qrresult}/></div>}
				</div>
				{this.state.test && <Load />}
			</div>
		); 
	}
}
//<QrCode id='QRCode' size={290} value={qrresult}/>}

//onEscapeOutside={}
export default SearchResults;