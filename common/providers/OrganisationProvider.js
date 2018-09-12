import React, {Component, PropTypes} from 'react';
import OrganisationStore from '../stores/organisation-store';
import AccountStore from '../stores/account-store';
import data from '../data/base/_data';

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: !OrganisationStore.getProjects(),
			projects: OrganisationStore.getProjects(),
			users: OrganisationStore.getUsers(),
			invites: OrganisationStore.getInvites(),
			name: AccountStore.getOrganisation() && AccountStore.getOrganisation().name,
		};
		ES6Component(this);
		this.listenTo(OrganisationStore, 'change', () => {
			this.setState({
				isSaving: OrganisationStore.isSaving,
				isLoading: OrganisationStore.isLoading,
				projects: OrganisationStore.getProjects(),
				users: OrganisationStore.getUsers(),
				invites: OrganisationStore.getInvites(),
			});
		})
		this.listenTo(OrganisationStore, 'saved', () => {
			this.props.onSave && this.props.onSave(OrganisationStore.savedId);
		})
	}

	createProject = (name) => {
		AppActions.createProject(name)
	};

	render() {
		return (
			this.props.children(
				{
					...this.state,
					createProject: this.createProject,
				},
			)
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
