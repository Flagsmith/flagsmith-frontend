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
    }

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
                                    <FormGroup>
                                        <PanelSearch
                                            title="Flags"
                                            items={flags}
                                            renderRow={({ feature, enabled }, i) =>
                                                <Row key={feature.id} space>
                                                    <div>
                                                        <strong>
                                                            <code>{feature.name.replace(/ /g, '_').toLowerCase()}</code>
                                                            - {feature.name}
                                                        </strong>
                                                    </div>
                                                    <Switch onChange={() => toggleFlag(i)} checked={enabled}/>
                                                </Row>
                                            }
                                            renderNoResults={<div>You have no features in your project.</div>}
                                            filterRow={({feature}, search) => {
                                                return feature.name.toLowerCase().indexOf(search) > -1;
                                            }}
                                        />
                                    </FormGroup>

                                    <p>
                                        Override features for particular users within the environment
                                    </p>

                                    <IdentityListProvider>
                                        {({ isLoading, identities }) => (
                                            <div>
                                                {isLoading && <div className="centered-container"><Loader/></div>}
                                                {!isLoading && (
                                                    <FormGroup>

                                                        <PanelSearch
                                                            title="Features"
                                                            items={identities}
                                                            renderRow={({ id, name }) =>
                                                                <Row key={id}>
                                                                    <Flex><a href='javascript:void(0)'
                                                                             onClick={() => this.editIdentity(id, flags)}>{name}</a></Flex>
                                                                </Row>
                                                            }
                                                            renderNoResults={<div>You have no identities in your project.</div>}
                                                            filterRow={(flag, search) => {
                                                                //TODO:
                                                                return true;
                                                            }}
                                                        />
                                                    </FormGroup>
                                                )}
                                            </div>
                                        )}
                                    </IdentityListProvider>

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
