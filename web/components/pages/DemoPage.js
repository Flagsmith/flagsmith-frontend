import React, {Component, PropTypes} from 'react';


const TheComponent = class extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    displayName: 'DemoPage'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount = () => {
        setTimeout(() => {
            AppActions.login(Project.demoAccount)
        }, 2000)
    };


    render() {
        return (
            <div className={"app-container animated fadeIn"}>
                <AccountProvider onSave={this.onSave}>
                    {({isSaving, error}) => (
                        <div className={"centered-container"}>
                            <div>
                                {error ? (
                                    <div>
                                        <h3>
                                            Oops
                                        </h3>
                                        <p>
                                            We could not login to the demo account please contact <a
                                            href="support@bullet-train.io">Support</a>
                                        </p>
                                    </div>
                                ) : (
                                    <div className={"text-center"}>
                                        <Loader/>
                                        <p className={"faint-lg"}>
                                            Signing you into the demo account
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </AccountProvider>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
