import React, {Component} from 'react'

import './Spinner.css'

class Spinner extends Component {
	render() {
		return (
			<div className="cssload-container">
				<div className="cssload-whirlpool"></div>
			</div>
		)
	}
}

export default Spinner