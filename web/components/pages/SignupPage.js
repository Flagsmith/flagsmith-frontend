import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {};

	}

	componentDidMount = () => {
		var el = document.getElementById("username");
		el && el.focus();
	};

	render() {
		let redirect = document.location.href.indexOf("login") == -1 && document.location.href.indexOf("signup") == -1
			? "&redirect=" + document.location.href : "";

		if (this.state.isSaving) {
			return (
				<div className="no-aside">
					<div className="content">
						<div className="padded centered-container ">
							<p>Creating your account</p>
							<Loader/>
						</div>
					</div>
				</div>
			)
		}
		const {email, password, organisation_name, first_name, last_name} = this.state;
		return (
			<div className="login-page">
				<div className="centered-container content">
					<div className="padded2 col-md-4">
						<FormGroup>
							<Row>
								<Column>
									<h3>Sign In</h3>
								</Column>
								<Column>
									<Link to={"/login"}>
										Already a member?
									</Link>
								</Column>
							</Row>
						</FormGroup>
						<div className="card container animated fadeIn container full-card">
							<AccountProvider>
								{({isLoading, isSaving, error}, {login, register}) => (
									<FormGroup>
										<form id="form" name="form" onSubmit={(e) => {
											Utils.preventDefault(e);
											register({email, password, organisation_name, first_name, last_name});
										}}>
											<FormGroup>
												<fieldset id="details">
													<div className={"row"}>
														<div className={"col-md-6"}>
															<InputGroup
																inputProps={{
																	className: "full-width",
																	error: error && error.first_name
																}}
																title={"First Name"}
																onChange={(e) => {
																	this.setState({first_name: Utils.safeParseEventValue(e)})
																}}
																className="input-default full-width"
																placeholder="First Name"
																type="text"
																name="email" id="email"/>
														</div>
														<div className={"col-md-6"}>
															<InputGroup
																inputProps={{
																	className: "full-width",
																	error: error && error.last_name
																}}
																title={"Last Name"}
																onChange={(e) => {
																	this.setState({last_name: Utils.safeParseEventValue(e)})
																}}
																className="input-default full-width"
																placeholder="Last Name"
																type="text"
																name="email" id="email"/>
														</div>
													</div>
													<FormGroup>
														<InputGroup
															inputProps={{className: "full-width"}}
															title={
																<span>
															Organisation Name {(
																	<Tooltip place="right">
																		{Constants.strings.ORGANISATION_DESCRIPTION}
																	</Tooltip>
																)}
															</span>
															}
															onChange={(e) => {
																this.setState({organisation_name: Utils.safeParseEventValue(e)})
															}}
															className="input-default full-width"
															placeholder="ACME Ltd"
															type="text"
															name="organisation" id="organisation"/>
													</FormGroup>
													<FormGroup>
														<InputGroup
															inputProps={{
																className: "full-width",
																error: error && error.email
															}}
															title={"Email Address"}
															onChange={(e) => {
																this.setState({email: Utils.safeParseEventValue(e)})
															}}
															className="input-default full-width"
															placeholder="Email/Username"
															type="text"
															name="email" id="email"/>
													</FormGroup>
													<FormGroup>
														<InputGroup
															inputProps={{
																className: "full-width",
																error: error && error.password1
															}}
															title={"Password"}
															onChange={(e) => {
																this.setState({password: Utils.safeParseEventValue(e)})
															}}
															className="input-default full-width" placeholder="Password"
															type="password"
															name="password"
															id="password"
														/>
													</FormGroup>
													<button
														disabled={isLoading || isSaving}
														className="btn btn-primary full-width" type="submit">
														Sign Up Free
													</button>
												</fieldset>
											</FormGroup>
											<FormGroup>
												{error && <div className="alert alert-danger">
													Please check your details and try again
												</div>}
											</FormGroup>
										</form>
									</FormGroup>
								)}
							</AccountProvider>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
