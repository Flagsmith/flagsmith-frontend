import React from "react";

import LegalAside from '../LegalAside';
import PrivacyPolicy from './PrivacyPolicyPage';
import ServiceLevelAgreement from './ServiceLevelAgreementPage';
import Footer from '../Footer';

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
                <Footer className="legalpage" />
            </div>
        );
    }
};
module.exports = ConfigProvider(HomePage);