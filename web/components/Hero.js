const TheComponent = class extends React.Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {value: props.defaultValue};
    }

    toggle = () => {
        this.setState({value: !this.state.value});
    }


    render() {
        const {hasFeature} = this.props;
        const explain = hasFeature("explain");
        return (
            <div>
                <div className={"hero"}>
                    <div className="col-md-6 col-xs-12">
                        <div className="col-md-8 push-md-4 text-left">
                            <img height={256} src={"/images/bullet-train-1.svg"} className="hero-brand" alt="Feature Flags, Feature Toggles and Remote Config"/>
                            <h1>Ship features with confidence</h1>
                            <p className="">
                                Bullet Train lets you manage {explain ? <Link to={"/blog/remote-config-and-feature-flags"}>feature
                                flags</Link>: "feature flags"} and {explain?<Link to={"/blog/remote-config-and-feature-flags"}>remote
                                config</Link>:"remote config"} across web, mobile and
                                server side applications. Deliver true Continuous Integration. Get builds out faster.
                                Control who has access to new features.
                            </p>
                            <p className="">
                                We're <a href="https://github.com/SolidStateGroup?utf8=%E2%9C%93&q=bullet-train"
                                         target="_blank">100% Open Source</a>. Host with us or on your own
                                infrastructure.
                            </p>
                            <div className="hero-cta mt-1">
                                <a href="#sign-up" className="btn">Start free trial</a>
                                <p className="text-left text-small">Not ready to sign up yet?  Try the fully featured BulletTrain <Link to={"/demo"}>Demo Account</Link></p>
                            </div>

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

module.exports = ConfigProvider(TheComponent);
