import React, { Component, PropTypes } from 'react';

const LegalAside = class extends Component {
	static displayName = 'LegalAside'

	static contextTypes = {
	    router: React.PropTypes.object.isRequired,
	};

	constructor(props, context) {
	    super(props, context);
	    this.state = {};
	}

	render() {
	    return (
    <Flex className={`aside ${this.props.className || ''}`}>
        <div className="brand-container text-center">
            <Link to="/">
                <Row>
                    <img height={34} src="/images/icon-2.png"/>
							Bullet Train

                </Row>
            </Link>
        </div>
        <Flex>
            <Flex className="links">
                <h3 className="link-header">Agreeements</h3>
                <Link
                  activeClassName="active"
                  to="/legal/tos"
                >
Terms of Service
                </Link>
                <Link
                  activeClassName="active"
                  to="/legal/sla"
                >
Service Level Agreement
                </Link>
                <h3 className="link-header">Policies</h3>
                <Link
                  activeClassName="active"
                  to="/legal/privacy-policy"
                >
Privacy Policy
                </Link>
            </Flex>
        </Flex>
    </Flex>
	    );
	}
};

LegalAside.propTypes = {};

module.exports = LegalAside;
