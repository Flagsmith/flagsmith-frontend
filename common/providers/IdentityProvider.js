import React, {Component, PropTypes} from 'react';
import FeatureListStore from '../stores/feature-list-store';
import IdentityStore from "../stores/identity-store";

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: true,
			identity: IdentityStore.model,
			environmentFlags: FeatureListStore.getEnvironmentFlags(),
			projectFlags: FeatureListStore.getProjectFlags(),
			identityFlags: IdentityStore.getIdentityFlags(),
		};
		ES6Component(this);
	}

	componentWillMount() {
		this.listenTo(IdentityStore, 'change', () => {
			this.setState({
				isSaving: IdentityStore.isSaving,
				isLoading: IdentityStore.isLoading || FeatureListStore.isLoading,
				identity: IdentityStore.model,
				identityFlags: IdentityStore.getIdentityFlags()
			});
		});
		this.listenTo(FeatureListStore, 'change', () => {
			this.setState({
				isLoading: IdentityStore.isLoading || FeatureListStore.isLoading,
				environmentFlags: FeatureListStore.getEnvironmentFlags(),
				projectFlags: FeatureListStore.getProjectFlags(),
			});
		});

		this.listenTo(IdentityStore, 'saved', () => {
			this.props.onSave && this.props.onSave();
		})
	}

	toggleFlag = ({identity, projectFlag, environmentFlag, identityFlag, environmentId}) => {
		AppActions.toggleUserFlag({identity, projectFlag, environmentFlag, identityFlag, environmentId});
	};

	editFlag = ({identity, projectFlag, environmentFlag, identityFlag, environmentId}) => {
		AppActions.editUserFlag({identity, projectFlag, environmentFlag, identityFlag, environmentId});
	};

	removeFlag = ({environmentId, identity, identityFlag}) => {
		AppActions.removeUserFlag({environmentId, identity, identityFlag});
	};

	render() {
		const {toggleFlag, editFlag, removeFlag} = this;
		return (
			this.props.children({...this.state}, {toggleFlag, editFlag, removeFlag})
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
