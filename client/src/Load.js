import React, { Component } from 'react';
import Loading from './Loading.gif';

class Load extends Component {
	render() {	
		return (
			<div className="Loading">
				<img src={Loading} alt="Loading Results" />
			</div>
		);
	}
}

export default Load;