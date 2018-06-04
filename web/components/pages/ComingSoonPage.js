import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
	displayName: 'ComingSoon'
	componentWillMount() {
		API.trackPage(Constants.pages.COMING_SOON)
	}
	render() {
		return (
			<div className={"app-container container"}>
				<h3>Coming Soon</h3>
			</div>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
