import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount = () => {
        API.trackPage(Constants.pages.DOCUMENTATION);
    };

    render() {
        const {environmentId} = this.props.location.query;
        return (
            <div className={"app-container container"}>
                <h3 id={"setup"}>
                    Installation
                </h3>
                <p>
                    First, add the SDK to your project.
                </p>
                <CodeHelp
                    hideHeader={true}
                    snippets={Constants.codeHelp.INSTALL}/>

                <h3 id={"setup"}>
                    Initialising the SDK
                </h3>

                {environmentId ? (
                    <div>
                    <p>
                        Initialise the client with one of your project's environment keys.
                    </p>
                        <div className={"alert alert-success"}>
                            Your last visited environment has the key <strong>{environmentId}</strong>.
                        </div>
                    </div>
                ) : (
                    <p>
                        Initialise the client with one of your project's environment keys.
                        For example the "Develop" environment for "Demo Project".
                    </p>
                )}


                <CodeHelp
                    hideHeader={true}
                    snippets={Constants.codeHelp.INIT(environmentId || "<YOUR_ENVIRONMENT_KEY>")}
                />

            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;