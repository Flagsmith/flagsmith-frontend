import React, {Component} from 'react';
import {Link} from 'react-router';

export default class ExampleOne extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {name: ''};
	}


	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	componentDidMount = () => {
		API.trackPage(Constants.pages.CREATE_ORGANISATION);
		this.focusTimeout = setTimeout(() => {
			this.input.focus();
			this.focusTimeout = null;
		}, 500);
	};

	componentWillUnmount() {
		if (this.focusTimeout) {
			clearTimeout(this.focusTimeout);
		}
	}

	onSave = (id) => {
		AppActions.selectOrganisation(id);
		this.context.router.push('/projects');
	};

	render() {
		return (
			<div id="create-org-page" className="container app-container">
				<h3>
					Create your organisation
				</h3>
				<p>
					Organisations allow you to manage multiple projects within a team.
				</p>
				<AccountProvider onSave={this.onSave}>
					{({isSaving}, {selectOrganisation, createOrganisation}) => (
						<form onSubmit={(e) => {
							e.preventDefault();
							createOrganisation(this.state.name);
						}}>
								<InputGroup
									ref={(e) => this.input = e}
									inputProps={{name: 'orgName', className: 'full-width'}}
									title="Organisation Name"
									placeholder="E.g. ACME Ltd"
									onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}/>
								<div className="text-right">
									<Button disabled={isSaving || !this.state.name} id="create-org-btn">
										Create
									</Button>
								</div>
						</form>
					)}
				</AccountProvider>
			</div>
		);
	}
}
