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
		const {onDemoClick} = this.props;
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
							<ul className="nav-list dark list-unstyled">
								<li><a href="">Demo</a></li>
								<li><a href="https://docs.bullet-train.io/">Docs</a></li>
								<li><Link to={this.props.loginLink} className="bold-link login">Login <ion className="ion-ios-arrow-dropright"/></Link></li>
							</ul>
						</div>
					</div>
				</nav>
				<div className={"hero"}>
					<div className="col-md-6 col-xs-12">
						<div className="col-md-8 push-md-4 text-left">
							<img height={256} src={"/images/icon-big.svg"} className="hero-brand"/>
							<h1>Ship features with confidence</h1>
							<p className="">
								Bullet Train lets you manage features flags and remote config across web, mobile and server side applications. Deliver true Continuous Integration. Get builds out faster. Control who has access to new features.
							</p>
							<p className="">
								We're <a href="https://github.com/SolidStateGroup/Bullet-Train-API">100% Open Source</a>. Host with us or on your own infrastructure.
							</p>
							{onDemoClick && (
                                <div className="hero-cta">
                                    <p className="text-left text-small">Want to find out more?</p>
                                    <button onClick={onDemoClick} className={"btn btn-primary"}>Try our Demo Account
                                    </button>
                                </div>
							)}

						</div>

					</div>
					<div className="col-md-6 col-xs-12">
						{this.props.children}
					</div>
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
