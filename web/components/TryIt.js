import React, {Component, PropTypes} from 'react';
import Highlight from './Highlight';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    request = () => {
        const {environmentId, userId} = this.props;
        this.setState({isLoading: true});
        API.trackEvent(Constants.events.TRY_IT);
        fetch(userId ? `${Project.api}flags/${userId}/` : `${Project.api}flags/`, {
            headers: {'X-Environment-Key': environmentId}
        })
            .then((res) => res.json())
            .then((data) => {
                var res = {};
                data.map(({feature, type, enabled, feature_state_value}) => {
                    res[feature.name] = feature.type == "FLAG" ? {
                        enabled
                    } : res[feature.name] ={
                        value: feature_state_value,
                    }
                });
                res = JSON.stringify(res, null, 2);
                this.setState({isLoading: false, data:res});
                toast("Retrieved results");
            })


    };

    render() {
        const {hasFeature} = this.props;
        return  hasFeature("try_it") ? (
            <Panel
                icon={"ion-md-code"}
                title={"Try it out"}
            >
                <div>
                    <div className={"text-center"}>
                        <p className={"faint-lg"}>
                            {this.props.title}
                        </p>
                        <div>
                            <Button id="try-it-btn" disabled={this.state.isLoading} onClick={this.request}>
                                {this.state.data ? "Test again" : "Run test"}
                            </Button>
                        </div>
                    </div>
                    {this.state.data && (
                        <div id="try-it-results">
                            <FormGroup/>
                            <Highlight className={"json"}>
                                {this.state.data}
                            </Highlight>
                        </div>
                    )}
                    {this.state.isLoading && !this.state.data && <div className={"text-center"}>
                        <Loader/>
                    </div>}
                </div>
            </Panel>
        ): <div/>;
    }
};

TheComponent.propTypes = {};

module.exports = ConfigProvider(TheComponent);