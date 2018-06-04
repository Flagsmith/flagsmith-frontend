import React, {Component, PropTypes} from 'react';
import InviteUsersModal from '../modals/InviteUsers';
import AccountStore from "../../../common/stores/account-store";

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {};
		AppActions.getOrganisation(AccountStore.getOrganisation().id);
	}

	render() {
		return (
			<div className="app-container container">
				<OrganisationProvider>
					{({isLoading, name, projects, users}) => (
						<div>
							{isLoading && <div className="centered-container"><Loader/></div>}
							{!isLoading && (
								<div>
									<FormGroup>
										<PanelSearch
											title="Users"
											items={users}
											renderRow={({id, first_name, last_name, email}) =>
												<div key={id}>
													{first_name ? first_name + " " + last_name : email + ' <Pending Invite>'}
												</div>
											}
											renderNoResults={<div>You have no users in this organisation.</div>}
											filterRow={(item, search) => {
												//TODO:
												return true;
											}}
										/>
									</FormGroup>
									<div className="text-right">
										<Button onClick={() => openModal(<InviteUsersModal/>)}>
											Invite Users
										</Button>
									</div>
								</div>
							)}
						</div>
					)}
				</OrganisationProvider>
			</div>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
