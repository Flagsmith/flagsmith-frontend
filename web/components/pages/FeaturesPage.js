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

    componentWillMount = () => {
        API.trackPage(Constants.pages.FEATURES);
    };

    newFlag = () => {
        openModal('New Feature', <CreateFlagModal
            environmentId={this.props.params.environmentId}
            projectId={this.props.params.projectId}/>)
    };


    editFlag = (projectFlag, environmentFlag) => {
        API.trackEvent(Constants.events.VIEW_FEATURE);
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
        const {projectId,environmentId} = this.props.params;
        return (
            <div id="features-page" className="app-container container">
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
                                                    id="features-list"
                                                    icon={"ion-ios-rocket"}
                                                    title={"Features"}
                                                    items={projectFlags}
                                                    renderRow={({name, id, enabled, created_date}, i) =>
                                                        <Row className={"list-item clickable"} key={id} space
                                                             onClick={() => this.editFlag(projectFlags[i], environmentFlags[id])}>
                                                            <div className={"flex flex-1"}>
                                                                <Row>
                                                                    <a href={"#"}>
                                                                        {name}
                                                                    </a>
                                                                    <Column>
														<span className={"subtitle"}>
															{environmentFlags[id] && environmentFlags[id].feature_state_value + ""}
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
                                                        <Button id="show-create-feature-btn" onClick={this.newFlag}>
                                                            Create Feature
                                                        </Button>
                                                    </div>
                                                ) : null}
                                            </FormGroup>

                                            <FormGroup>
                                                <CodeHelp
                                                    title={"1: Installing the SDK"}
                                                    snippets={Constants.codeHelp.INSTALL}/>
                                                <CodeHelp
                                                    title={"2: Initialising your project"}
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
                                            <h3>Brilliant! Now create your features.</h3>

                                            <FormGroup>
                                                <Panel icon={"ion-ios-rocket"} title={"1. creating a feature"}>
                                                    <p>
                                                        You can two types of features for your project:
                                                        <ul>
                                                            <li>
                                                                <strong>Remote configuration</strong>: configuration for
                                                                a
                                                                particular feature
                                                                <p className={"faint"}>
                                                                    EXAMPLE: This could be absolutely anything from a
                                                                    hero
                                                                    size for a website/mobile app or an environment
                                                                    variable
                                                                    for a server
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <strong>Feature Flags</strong>: These allows you to
                                                                toggle
                                                                features on and off:
                                                                <p className={"faint"}>
                                                                    EXAMPLE: You're working on a new messaging feature
                                                                    for
                                                                    your app but only show it on develop.
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </p>
                                                </Panel>
                                            </FormGroup>
                                            <FormGroup>
                                                <Panel icon={"ion-ios-settings"}
                                                       title={"2. configuring features per environment"}>
                                                    <p>
                                                        We've created 2 environments for
                                                        you <strong>Development</strong> and <strong>Production</strong>.
                                                        When
                                                        you create a feature it makes copies of them for each
                                                        environment,
                                                        allowing you to edit the values separately.
                                                    </p>
                                                </Panel>
                                            </FormGroup>

                                            <FormGroup>
                                                <Panel icon={"ion-ios-person"}
                                                       title={"3. configuring features per user"}>
                                                    <p>
                                                        When users login to your application, you
                                                        can <strong>identify</strong> them using one of our SDKs, this
                                                        will add
                                                        them to the users page.
                                                        From there you can configure their features. We've created an example user for you which you can see in the{" "}
                                                        <Link to={`/project/${projectId}/environment/${environmentId}/users`}>Users page</Link>
                                                        <p className={"faint"}>
                                                            EXAMPLE: You're working on a new messaging feature for your
                                                            app but
                                                            only show it on for that user.
                                                        </p>
                                                    </p>
                                                </Panel>
                                            </FormGroup>
                                            <FormGroup className={"text-center"}>

                                                <Button className={"btn-lg btn-primary"} id="show-create-feature-btn"
                                                        onClick={this.newFlag}>
                                                    <ion className="icon ion-ios-rocket"/>
                                                    {" "}Create your first Feature
                                                </Button>
                                            </FormGroup>
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
