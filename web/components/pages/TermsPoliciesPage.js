import React from "react";
import LegalAside from '../LegalAside';
import PrivacyPolicy from './PrivacyPolicyPage';
import ServiceLevelAgreement from './ServiceLevelAgreementPage';

const HomePage = class extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        API.trackPage(Constants.pages.POLICIES);
    }

    componentDidMount() {
        if (this.props.location.pathname == '/legal') {
            this.context.router.replace('/legal/privacy-policy');
        }
    }

    render = () => {
        const { hasFeature, getValue, params: {section} } = this.props;
        return (
            <div>
                <LegalAside />
                <div className="aside-body">
                    {(() => {
                        switch (section) {
                            case 'privacy-policy':
                            default:
                                return <PrivacyPolicy />;

                            case 'sla':
                                return <ServiceLevelAgreement />;
                        }
                    })()}
                </div>
                <footer className="legalpage clearfix">
                    <div className="clearfix">
                        <div className="brand-footer float-left">
                            <img src="./images/icon-light-2.png" alt="Bullet Train" />
                        </div>
                        <ul className="float-right nav-list">
                            {hasFeature("explain") && (
                                <li><Link to={"/blog/remote-config-and-feature-flags"}>What are feature flags?</Link></li>
                            )}
                            {hasFeature("explain") && (
                                <li><Link to={"/blog/remote-config-and-feature-flags"}>What is remote config?</Link></li>
                            )}
                            <li><Link to={"/demo"}>Demo</Link></li>
                            <li><a href="https://docs.bullet-train.io/">Docs</a></li>
                            <li><Link to={"/pricing"}>Pricing</Link></li>
                            <li><a href="mailto:bullettrain@solidstategroup.com">Support</a></li>
                        </ul>
                    </div>
                    <div className="built-by text-center">
                        <p>Built by <a href="http://www.solidstategroup.com"><img
                            src="./images/ssg-logotype-white-transparent-bg.png" alt="Solid state group" /></a>
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
};
module.exports = ConfigProvider(HomePage);