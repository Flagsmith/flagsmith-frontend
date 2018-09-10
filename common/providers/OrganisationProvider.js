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
			name: AccountStore.getOrganisation() && AccountStore.getOrganisation().name,
		};
		ES6Component(this);
		this.listenTo(OrganisationStore, 'change', () => {
			this.setState({
				isSaving: OrganisationStore.isSaving,
				isLoading: OrganisationStore.isLoading,
				projects: OrganisationStore.getProjects(),
				users: OrganisationStore.getUsers(),
			});
		})
		this.listenTo(OrganisationStore, 'saved', () => {
			this.props.onSave && this.props.onSave(OrganisationStore.savedId);
		})
	}

	createProject = (name) => {
		AppActions.createProject(name)
	};

	inviteUsers = (emailAddresses) => {
		this.setState({isSaving: true});

		data.post(`${Project.api}organisations/${AccountStore.organisation.id}/invite/`, {
			emails: emailAddresses.split(",").map((e)=>{
                API.trackEvent(Constants.events.INVITE);
				return e.trim()
            }),
			frontend_base_url: this.props.baseURL
		}).then(() => {
			this.setState({isSaving: false});
			this.props.onSave && this.props.onSave();
			toast('Invite(s) sent successfully');
		}).catch((e) => {
			console.error(e);
			this.setState({isSaving: false});
			toast(`Failed to send invite(s). ${e && e.error ? e.error : 'Please try again later'}`);
		});
	}

	render() {
		return (
			this.props.children(
				{
					...this.state,
					createProject: this.createProject,
					inviteUsers: this.inviteUsers,
				},
			)
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
