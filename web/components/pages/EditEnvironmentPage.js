import React, {Component, PropTypes} from 'react';
import EditIdentityModal from './UserPage';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getEnv(this.props.params.id);
        AppActions.getIdentities(this.props.params.id);
    }

    onSave = () => {
        toast('Environment Saved');
    };

    editIdentity = (id, envFlags) => {
        openModal(<EditIdentityModal id={id} envFlags={envFlags}/>);
    };

    render() {
        return (
            <div className="app-container container">

                <EnvironmentProvider onSave={this.onSave}>
                    {({ isLoading, flags, isSaving, name, toggleFlag, setName, saveEnv, reset, error, identities }) => (
                        <div>
                            {isLoading && <div className="centered-container"><Loader/></div>}
                            {!isLoading && (
                                <div>
                                    <InputGroup
                                        inputProps={{ className: "full-width" }}
                                        onChange={setName}
                                        isValid={name}
                                        value={name}
                                        type="text" title="Environment Name*"
                                        placeholder="My Environment Name"/>

                                    <div className="pull-right">
                                        <Row>
                                            <div className="flex-column">
                                                <Button onClick={reset}>
                                                    Reset
                                                </Button>
                                            </div>
                                            <Button disabled={!name || isSaving} onClick={saveEnv}>
                                                {isSaving ? 'Saving' : 'Save Changes'}
                                            </Button>
                                        </Row>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </EnvironmentProvider>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
