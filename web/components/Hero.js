const TheComponent = class extends React.Component {
	displayName:'TheComponent'

	constructor (props, context) {
		super(props, context);
		this.state = { value: props.defaultValue };
	}

	toggle = () => {
		this.setState({ value: !this.state.value });
	}

	render () {
		return (
			<div>
				<nav className={"navbar navbar-fixed-top navbar-light"}>
					<div className="navbar-left">
						<div className="navbar-nav">
							<Link to={"/"} className="nav-item nav-item-brand nav-link">
								<Row>
									<img height={34} src={"/images/icon-light.png"}/>
									Bullet Train
								</Row>
							</Link>
						</div>
					</div>
					<div className="navbar-right">
						<div className="navbar-nav">
							<Link to={this.props.loginLink} className="nav-item nav-link">Login</Link>
						</div>
					</div>
				</nav>
				<div className={"hero"}>
					<img height={256} src={"/images/icon-big.svg"}/>
					<h1>
						Ship features with confidence
					</h1>
					<p className="col-md-6 push-lg-3">
						Bullet Train lets you manage features flags across web, mobile
						and server side applications. Get builds out faster. Control who has access to new features.
					</p>
					<p className="col-md-6 push-lg-3">
						We're <a href="https://github.com/SolidStateGroup/Bullet-Train-API">100% Open Source</a>. Host with us or on your own infrastructure.
					</p>
					{this.props.children}
				</div>
			</div>
		);
	}
};

TheComponent.propTypes = {
	children: RequiredElement,
	toggleComponent: OptionalFunc,
	title: RequiredString,
	defaultValue: OptionalBool,
};

module.exports = TheComponent;
