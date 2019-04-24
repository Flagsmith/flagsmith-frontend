import React, {Component, PropTypes} from 'react';


const InvitePage = class extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	displayName: 'InvitePage'

	constructor(props, context) {
		super(props, context);
		this.state = {};
		AppActions.acceptInvite(this.props.params.id);
	}

    componentWillMount = () => {
        API.trackPage(Constants.pages.INVITE);
    };

	onSave = (id)=>{
		AppActions.selectOrganisation(id);
		this.context.router.replace("/projects?new=1");
	};

	render() {
		return (
			<div className={"app-container"}>
				<AccountProvider onSave={this.onSave}>
					{({isSaving, error}) => (
						<div className={"centered-container"}>
							<div>
								{error ? (
									<div>
										<h3>
											Oops
										</h3>
										<p>
											We could not validate your invite, please check the invite URL you have
											entered is correct.
										</p>
									</div>
								) : (
									<Loader/>
								)}

							</div>
						</div>
					)}
				</AccountProvider>
			</div>
		);
	}
};

InvitePage.propTypes = {};

module.exports = InvitePage;
