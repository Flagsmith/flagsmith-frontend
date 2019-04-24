import React, {Component, PropTypes} from 'react';
import IdentityStore from '../stores/identity-list-store';

const IdentityListProvider = class extends Component {
	displayName: 'IdentityListProvider'

	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: !IdentityStore.model,
			identities: IdentityStore.model,
		};
		ES6Component(this);
	}

	componentWillMount() {
		this.listenTo(IdentityStore, 'change', () => {
			this.setState({
				isSaving: IdentityStore.isSaving,
				isLoading: IdentityStore.isLoading,
				identities: IdentityStore.model,
			});
		});

		this.listenTo(IdentityStore, 'saved', () => {
			this.props.onSave && this.props.onSave();
		})
	}

	render() {
		return (
			this.props.children({...this.state})
		);
	}
};

IdentityListProvider.propTypes = {};

module.exports = IdentityListProvider;
