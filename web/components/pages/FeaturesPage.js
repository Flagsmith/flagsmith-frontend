import React, {Component, PropTypes} from 'react';
import EditIdentityModal from './UserPage';
import CreateFlagModal from '../modals/CreateFlag';
import ConfirmToggleFeature from '../modals/ConfirmToggleFeature';
import TryIt from '../TryIt';
import ConfirmRemoveFeature from '../modals/ConfirmRemoveFeature';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getFeatures(this.props.params.projectId, this.props.params.environmentId);
    }

    newFlag = () => {
        openModal('New Feature', <CreateFlagModal
            environmentId={this.props.params.environmentId}
            projectId={this.props.params.projectId}/>)
    };


    editFlag = (projectFlag, environmentFlag) => {
        openModal('Edit Feature', <CreateFlagModal
            isEdit={true}
            environmentId={this.props.params.environmentId}
            projectId={this.props.params.projectId}
            projectFlag={projectFlag}
            environmentFlag={environmentFlag}
        />)
    };


    componentWillReceiveProps(newProps) {
        if (newProps.params.environmentId != this.props.params.environmentId) {
            AppActions.getFeatures(newProps.params.projectId, newProps.params.environmentId);
        }
    }

    onSave = () => {
        toast('Environment Saved');
    };

    editIdentity = (id, envFlags) => {
        openModal(<EditIdentityModal id={id} envFlags={envFlags}/>);
    }

    confirmToggle = (projectFlag, environmentFlag, cb) => {
        openModal("Toggle Feature", <ConfirmToggleFeature environmentId={this.props.params.environmentId}
                                                          projectFlag={projectFlag} environmentFlag={environmentFlag}
                                                          cb={cb}/>)
    }
    confirmRemove = (projectFlag, cb) => {
        openModal("Remove Feature", <ConfirmRemoveFeature environmentId={this.props.params.environmentId}
                                                          projectFlag={projectFlag}
                                                          cb={cb}/>)
    }

    render() {
        return (
            <div id="featuresPage" className="app-container container">
                <FeatureListProvider onSave={this.onSave}>
                    {({isLoading, projectFlags, environmentFlags}, {environmentHasFlag, toggleFlag, editFlag, removeFlag}) => (
                        <div>
                            {isLoading && <div className="centered-container"><Loader/></div>}
                            {!isLoading && (
                                <div>
                                    {projectFlags && projectFlags.length ? (
                                        <div>
                                            <FormGroup>
                                                <PanelSearch
                                                    className={"no-pad"}
                                                    id="featuresList"
                                                    icon={"ion-ios-rocket"}
                                                    title={"Features"}
                                                    items={projectFlags}
                                                    renderRow={({name, id, enabled, created_date}, i) =>
                                                        <Row className={"list-item"} key={id} space>
                                                            <div>
                                                                <Row>
                                                                    <a onClick={() => this.editFlag(projectFlags[i], environmentFlags[id])}
                                                                       href={"#"}>
                                                                        {name}
                                                                    </a>
                                                                    <Column>
														<span className={"subtitle"}>
															{environmentFlags[id] && environmentFlags[id].feature_state_value}
														</span>
                                                                    </Column>
                                                                </Row>
                                                                <div className={"list-item-footer faint"}>
                                                                    Created {moment(created_date).format("DD/MMM/YYYY")}
                                                                </div>
                                                            </div>
                                                            <Row>
                                                                <Column>
                                                                    <Switch
                                                                        checked={environmentFlags[id] && environmentFlags[id].enabled}
                                                                        onChange={() => this.confirmToggle(projectFlags[i], environmentFlags[id], (environments) => {
                                                                            toggleFlag(i, environments)
                                                                        })}/>
                                                                </Column>
                                                                <Column>
                                                                    <a
                                                                        onClick={() => this.confirmRemove(projectFlags[i], () => {
                                                                            removeFlag(this.props.params.projectId, projectFlags[i])
                                                                        })}
                                                                        className={"btn btn-link"}>
                                                                        Remove
                                                                    </a>
                                                                </Column>
                                                            </Row>
                                                        </Row>
                                                    }
                                                    renderNoResults={<div className={"text-center"}>
                                                        {/*<FormGroup>*/}
                                                        {/*<button onClick={this.newFlag}*/}
                                                        {/*className={"btn btn-primary btn-lg"}*/}
                                                        {/*id="showCreateFeatureBtn">*/}
                                                        {/*<ion className="icon ion-ios-rocket"/>*/}
                                                        {/*Create your first feature*/}
                                                        {/*</button>*/}
                                                        {/*</FormGroup>*/}
                                                    </div>}
                                                    filterRow={({name}, search) => {
                                                        return name.toLowerCase().indexOf(search) > -1;
                                                    }}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                {projectFlags && projectFlags.length ? (
                                                    <div className="text-right">
                                                        <p>

                                                        </p>
                                                        <Button id="showCreateFeatureBtn" onClick={this.newFlag}>
                                                            Create Feature
                                                        </Button>
                                                    </div>
                                                ) : null}
                                            </FormGroup>

                                            <FormGroup>
                                                <CodeHelp
                                                    title={"Step 1: Installing the SDK"}
                                                    snippets={Constants.codeHelp.INSTALL}/>
                                                <CodeHelp
                                                    title={"Step 2: Initialising your project"}
                                                    snippets={Constants.codeHelp.INIT(this.props.params.environmentId, projectFlags && projectFlags[0] && projectFlags[0].name)}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <TryIt
                                                    title={"Test what values are being returned from the API on this environment"}
                                                    environmentId={this.props.params.environmentId}
                                                />
                                            </FormGroup>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button id="showCreateFeatureBtn" onClick={this.newFlag}>
                                                Create Feature
                                            </Button>
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>
                    )}
                </FeatureListProvider>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
