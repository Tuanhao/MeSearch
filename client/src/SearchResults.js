import React, { Component } from 'react';
//import './css/SearchResults.css';

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			results: this.props.results,
			test: true
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
				//<button id="view" onclick="generate();">View QR Code</button>
				//<div id="qrResult" style="height: 100px;width: 100px"></div>
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
					{this.state.test && <p>hhhh</p>}
				</div>
			</div>
		); 
	}
}


// <div id="qrResult" style="height: 100px;width: 100px">
// </div>

// <script type="text/javascript">
	// var qrcode=new QRCode(document.getElementById('qrResult'),{
		// width:200,
		// height:200
	// });

// function generate(){
	// var message=document.getElementById('qr');
	// var buttton = document.getElementById('view');
	// if(!message.value){
		// alert("Input a text");
		// message.focus();
		// return;
	// }

	// qrcode.makeCode(message.value);
// }

// </script>


export default SearchResults;