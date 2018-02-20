import React, {Component} from 'react'
import Spinner from '../components/Spinner'

class RedditPosts extends Component {
	render() {

		let content = this.props.requesting ? <Spinner /> : this.props.posts

		return (
			<div className="content">
				<h1>Reddit Posts</h1>
				{content}
			</div>
		)
	}
}

export default RedditPosts