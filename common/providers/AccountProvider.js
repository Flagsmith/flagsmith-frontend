import React, {Component, PropTypes} from 'react';
import AccountStore from '../stores/account-store';

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: AccountStore.isLoading,
			organisation: AccountStore.getOrganisation(),
			user: AccountStore.getUser()
		};

		ES6Component(this);

		this.listenTo(AccountStore, 'change', () => {
			this.setState({
				isLoading: AccountStore.isLoading,
				isSaving: AccountStore.isSaving,
				organisation: AccountStore.getOrganisation(),
				user: AccountStore.getUser(),
				error: AccountStore.error,
			});
		});

		this.listenTo(AccountStore, 'loaded', () => {
			this.props.onLogin && this.props.onLogin();
		})

		this.listenTo(AccountStore, 'saved', () => {
			this.props.onSave && this.props.onSave(AccountStore.savedId);
		});

		this.listenTo(AccountStore, 'logout', () => {
			this.setState({
				isLoading: false,
				isSaving: false,
				organisation: AccountStore.getOrganisation(),
				user: AccountStore.getUser()
			});
			this.props.onLogout && this.props.onLogout();
		});
		this.listenTo(AccountStore, 'no-user', () => {
			this.setState({
				isSaving: false,
				isLoading: false,
				organisation: AccountStore.getOrganisation(),
				user: AccountStore.getUser()
			});
			this.props.onNoUser && this.props.onNoUser();
		});
		this.listenTo(AccountStore, 'problem', () => {
			this.setState({
				isLoading: AccountStore.isLoading,
				isSaving: AccountStore.isSaving,
				error: AccountStore.error
			})
		});

	}


	login = (details) => {
		AppActions.login(details)
	};

	loginDemo = () => {
		AppActions.login(Project.demoAccount)
	};

	register = (details,isInvite) => {
		AppActions.register(details,isInvite)
	};

	render() {
		var {isLoading, isSaving, user, organisation, error} = this.state
		return (
			this.props.children({
				isLoading,
				isSaving,
				user,
				organisation,
				error
			}, {
				loginDemo: this.loginDemo,
				login: this.login,
				register: this.register,
				selectOrganisation: AppActions.selectOrganisation,
				createOrganisation: AppActions.createOrganisation,
				editOrganisation: AppActions.editOrganisation,
				acceptInvite: AppActions.acceptInvite
			})
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
