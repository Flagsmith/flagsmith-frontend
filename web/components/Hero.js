const TheComponent = class extends React.Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {value: props.defaultValue};
    }

    toggle = () => {
        this.setState({value: !this.state.value});
    };

    scrollToSignUp = () => {
        Utils.scrollToElement('.signup-form');
    };


    render() {
        const {hasFeature} = this.props;
        const explain = hasFeature("explain");
        // const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : "";

        return (
            <div className={"hero"}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 offset-md-1 features-cta">
                            <h1 className="margin-bottom margin-top">Release features with confidence</h1>
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
                                <a href="/#sign-up" className="btn" onClick={this.scrollToSignUp}>Start free trial</a>
                                <p className="text-small">No payment card required</p>
                            </div>

                        </div>
                        <div className="col-md-6 offset-md-1">
                            <img src="/images/bullet-train-illustration.svg" className="hero-illustration"/>
                        </div>
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
