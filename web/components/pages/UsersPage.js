import React, {Component, PropTypes} from 'react';
import EditIdentityModal from './UserPage';

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

    componentDidMount() {
        AppActions.getIdentities(this.props.params.environmentId);
        API.trackPage(Constants.pages.USERS);
    }

    onSave = () => {
		toast('Environment Saved');
	};

	editIdentity = (id, envFlags) => {
		openModal(<EditIdentityModal id={id} envFlags={envFlags}/>);
	};

	render() {
		return (
			<div className="app-container container">

				<div>
					<div>
						<h3>Users</h3>
						<p>
							View and manage features for individual users.
						</p>
						<IdentityListProvider>
							{({isLoading, identities}) => (
								<div>
									{isLoading && <div className="centered-container"><Loader/></div>}
									{!isLoading && (
										<FormGroup>
											<PanelSearch
												id="usersList"
												title="Users"
												className={"no-pad"}
												icon={"ion-md-person"}
												items={identities}
												renderRow={({identifier}) =>
													<Row className={"list-item"} key={identifier}>
														<Flex>
															<Link
																to={`/project/${this.props.params.projectId}/environment/${this.props.params.environmentId}/users/${identifier}`}
															>{identifier}</Link>
														</Flex>
													</Row>
												}
												renderNoResults={<FormGroup className={"text-center"}>You have no users
													in your
													project.</FormGroup>}
												filterRow={(flag, search) => {
													return flag.identifier.indexOf(search) != -1
												}}
											/>
										</FormGroup>
									)}
								</div>
							)}
						</IdentityListProvider>
						<CodeHelp
							showInitially={true}
							title={"Creating users and getting their feature settings"}
							snippets={Constants.codeHelp.CREATE_USER(this.props.params.environmentId)}/>
					</div>
				</div>
			</div>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
