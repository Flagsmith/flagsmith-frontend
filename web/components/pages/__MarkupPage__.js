import React, {Component} from 'react';
import {Link} from 'react-router';
import {ButtonSecondary, ButtonWhite} from "../base/forms/Button";
import PricingPanel from "../PricingPanel";

export default class ExampleOne extends Component {
    static displayName = 'CreateOrganisastionPage'

	constructor(props, context) {
		super(props, context);
		this.state = {name: ''};
	}

	render() {
		return (
			<div className="mt-5">
				<div className="container">
					<section className="pt-5 pb-3">
						<h2>Typeography</h2>
						<h1>Heading H1</h1>
						<h2>Heading H2</h2>
						<h3>Heading H3</h3>
						<h4>Heading H4</h4>
						<h5>Heading H5</h5>
						<h6>Heading H6</h6>
						<p className="no-mb">This is a paragraph.</p>
						<p className="text-small no-mb">This is some small paragraph text.</p>
						<p>
							View and manage <Tooltip title={<a className="dark" href={"#"}>feature flags</a>}
													 place="right">{Constants.strings.FEATURE_FLAG_DESCRIPTION}</Tooltip> and {" "}
							<Tooltip title={<a className="dark" href={"#"}>remote config</a>}
									 place="right">{Constants.strings.REMOTE_CONFIG_DESCRIPTION}</Tooltip> for
							your selected environment.
						</p>
					</section>

					<section className="pt-5 pb-3">
						<h2 className="mb-3">Colour</h2>

						<h4>Brand</h4>
						<div className="colour-block colour-block--brand-primary"/>
						<div className="colour-block colour-block--brand-dark-green"/>
						<div className="colour-block colour-block--brand-secondary"/>

						<h4>Gradients</h4>

						<div className="colour-block colour-block--brand-primary-gradient"/>

						<h4>Utility</h4>

						<div className="colour-block colour-block--brand-orange"/>
						<div className="colour-block colour-block--brand-purple"/>
						<div className="colour-block colour-block--brand-red"/>

					</section>

					<section className="pt-5 pb-3">
						<h2>Buttons</h2>
						<FormGroup>
							<Button className="mr-3">Primary</Button>

                            <ButtonSecondary className="mr-3">Secondary</ButtonSecondary>

							<ButtonWhite>White</ButtonWhite>

						</FormGroup>

					</section>

					<section className="pt-5 pb-3">
						<h2>Forms</h2>

						<Input inputProps={{
							name: "firstName",
							className: "full-width",
						}}
							   className="input-default full-width"
							   placeholder="First name"
							   type="text"
							   name="firstName" id="firstName"/>


						<FormGroup className="mt-3">
						<InputGroup
							inputProps={{
								className: "full-width",
								name: "featureID"
							}}
							value={null}
							type="text" title="ID"
							placeholder="E.g. header_size"/>
						</FormGroup>


					</section>

					<section className="pt-5 pb-3">
						<h2>Components</h2>
						<PricingPanel />
					</section>

				</div>
			</div>
		);
	}
}
