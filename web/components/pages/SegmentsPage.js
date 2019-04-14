import React, {Component, PropTypes} from 'react';
import EditIdentityModal from './UserPage';
import CreateSegmentModal from '../modals/CreateSegment';
import ConfirmToggleFeature from '../modals/ConfirmToggleFeature';
import TryIt from '../TryIt';
import ConfirmRemoveSegment from '../modals/ConfirmRemoveSegment';

const TheComponent = class extends Component {
    static displayName = 'FeaturesPage';

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getSegments(this.props.params.projectId, this.props.params.environmentId);
    }

    componentWillUpdate(newProps) {
        const {params} = newProps;
        const {params: oldParams} = this.props;
        if (params.environmentId != oldParams.environmentId || params.projectId != oldParams.projectId) {
            AppActions.getSegments(params.projectId, params.environmentId);
        }
    }

    componentDidMount = () => {
        API.trackPage(Constants.pages.FEATURES);
        const { params } = this.props;
        AsyncStorage.setItem('lastEnv', JSON.stringify({
            orgId: AccountStore.getOrganisation().id,
            projectId: params.projectId,
            environmentId: params.environmentId
        }));
    };

    newSegment = () => {
        openModal('New Segment', <CreateSegmentModal
            environmentId={this.props.params.environmentId}
            projectId={this.props.params.projectId}/>)
    };


    editSegment = (segment) => {
        API.trackEvent(Constants.events.VIEW_SEGMENT);
        openModal('Edit Feature', <CreateSegmentModal
            isEdit={true}
            environmentId={this.props.params.environmentId}
            projectId={this.props.params.projectId}
            projectFlag={segment}
        />)
    };


    componentWillReceiveProps(newProps) {
        if (newProps.params.environmentId != this.props.params.environmentId) {
            AppActions.getSegments(newProps.params.projectId, newProps.params.environmentId);
        }
    }

    confirmRemove = (projectFlag, cb) => {
        openModal("Remove Segment", <ConfirmRemoveSegment environmentId={this.props.params.environmentId}
                                                          projectFlag={projectFlag}
                                                          cb={cb}/>)
    }

    onError = (error) => {
        // Kick user back out to projects
        this.context.router.replace('/projects');
    }

    render() {
        const {projectId, environmentId} = this.props.params;
        return (
            <div id="features-page" className="app-container container">
                <SegmentListProvider onSave={this.onSave} onError={this.onError}>
                    {({isLoading, segments}, { removeSegment}) => (
                        <div className="segments-page">
                            {isLoading && <div className="centered-container"><Loader/></div>}
                            {!isLoading && (
                                <div>
                                    {segments && segments.length ? (
                                        <div>
                                            <h3>Segments</h3>
                                            <p>
                                                Create and manage groups of users with similar traits.
                                            </p>
                                            <FormGroup>
                                                <PanelSearch
                                                    className={"no-pad"}
                                                    id="features-list"
                                                    icon={"ion-ios-globe"}
                                                    title={"Segments"}
                                                    items={segments}
                                                    renderRow={({name, id, enabled, created_date, type}, i) =>
                                                        <Row className={"list-item clickable"} key={id} space>
                                                            <div className={"flex flex-1"}
                                                                 onClick={() => this.editSegment(segments[i])}>
                                                                <Row>
                                                                    <a href={"#"}>
                                                                        {name}
                                                                    </a>
                                                                </Row>
                                                                <div className={"list-item-footer faint"}>
                                                                    Created {moment(created_date).format("DD/MMM/YYYY")}
                                                                </div>
                                                            </div>
                                                            <Row>
                                                                <Column>
                                                                    <button
                                                                        id="remove-feature"
                                                                        onClick={() => this.confirmRemove(projectFlags[i], () => {
                                                                            removeSegment(this.props.params.projectId, projectFlags[i])
                                                                        })}
                                                                        className={"btn btn-primary"}>
                                                                        Remove
                                                                    </button>
                                                                </Column>
                                                            </Row>
                                                        </Row>
                                                    }
                                                    renderNoResults={<div className={"text-center"}>
                                                    </div>}
                                                    filterRow={({name}, search) => {
                                                        return name.toLowerCase().indexOf(search) > -1;
                                                    }}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <CodeHelp
                                                    title={"Using segments"}
                                                    snippets={Constants.codeHelp.SEGMENTS(environmentId)}/>
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
                                            <h3>Target groups of users with segments.</h3>
                                            <FormGroup>
                                                <Panel icon={"ion-ios-globe"} title={"1. creating a segment"}>
                                                    <p>
                                                        You can create a segment that targets <Link to={`project/${projectId}/environment/${environmentId}/users`}>user traits</Link>.
                                                        As user's traits are updated they will automatically be added to the segments based on the rules you create.
                                                    </p>
                                                </Panel>
                                            </FormGroup>
                                            <FormGroup className={"text-center"}>
                                                <Button className={"btn-lg btn-primary"} id="show-create-feature-btn"
                                                        onClick={this.newSegment}>
                                                    <ion className="icon ion-ios-globe"/>
                                                    {" "}Create your first Segment
                                                </Button>
                                            </FormGroup>
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>
                    )}
                </SegmentListProvider>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
