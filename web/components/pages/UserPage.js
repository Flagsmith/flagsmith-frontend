import React, {Component, PropTypes} from 'react';
import ConfirmToggleFeature from '../modals/ConfirmToggleFeature';
import ConfirmRemoveFeature from '../modals/ConfirmRemoveFeature';
import CreateFlagModal from '../modals/CreateFlag';
import TryIt from '../TryIt';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        AppActions.getIdentity(this.props.params.environmentId, this.props.params.id);
        AppActions.getFeatures(this.props.params.projectId, this.props.params.environmentId);
        API.trackPage(Constants.pages.USER);
    }

    confirmToggle = (projectFlag, environmentFlag, cb) => {
        openModal("Toggle Feature", <ConfirmToggleFeature
            identity={this.props.params.id}
            environmentId={this.props.params.environmentId}
            projectFlag={projectFlag}
            environmentFlag={environmentFlag}
            cb={cb}/>)
    }

    editFlag = (projectFlag, environmentFlag, identityFlag) => {
        API.trackEvent(Constants.events.VIEW_USER_FEATURE);
        openModal('Edit User Feature', <CreateFlagModal
            isEdit={true}
            identity={this.props.params.id}
            environmentId={this.props.params.environmentId}
            projectId={this.props.params.projectId}
            projectFlag={projectFlag}
            identityFlag={identityFlag}
            environmentFlag={environmentFlag}
        />)
    };

    confirmRemove = (projectFlag, cb) => {
        openModal("Reset User Feature", <ConfirmRemoveFeature
            identity={this.props.params.id}
            environmentId={this.props.params.environmentId}
            projectFlag={projectFlag}
            cb={cb}/>)
    }

    render() {
        const {name, flags} = this.state;
        const {projectId, environmentId} = this.props.params;
        return (
            <div className={"app-container"}>
                <IdentityProvider onSave={this.onSave}>
                    {({isSaving, isLoading, error, environmentFlags, projectFlags, identityFlags}, {toggleFlag, removeFlag, editFlag}) => isLoading ?
                        <div className={"text-center"}><Loader/></div> : (
                            <div className={"container"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <h3>
                                            {this.props.params.id}
                                        </h3>
                                        <p>
                                            View and manage feature states for this user. This will override any feature
                                            states you have for your current environment for this user only. Any features that are not overriden for this user will fallback to the environment defaults.
                                        </p>
                                        <FormGroup>
                                            <PanelSearch
                                                id="user-features-list"
                                                className={"no-pad"}
                                                icon={"ion-ios-rocket"}
                                                title="Features"
                                                items={projectFlags}
                                                renderRow={({name, id, enabled, created_date, feature, type}, i) => {
                                                    const identityFlag = identityFlags[id];
                                                    const values = Object.assign({}, environmentFlags[id], identityFlag || {})
                                                    return (
                                                        <Row className={"list-item clickable"} key={id} space>
                                                            <div
                                                                onClick={() => this.editFlag(projectFlags[i], environmentFlags[id], identityFlag)}
                                                                className={"flex flex-1"}>
                                                                <Row>
                                                                    <a href={"#"}>
                                                                        {name}
                                                                    </a>
                                                                </Row>
                                                                {identityFlag ? (
                                                                    <Row className={"chip"}>
																		<span>
																		Overriding defaults since {moment(created_date).format("DD/MMM/YYYY")}
																		</span>
                                                                        <span
                                                                            className={"chip-icon icon ion-md-information"}/>
                                                                    </Row>

                                                                ) : (
                                                                    <div className={"list-item-footer faint"}>
                                                                        Using environment defaults
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <Row>
                                                                <Column>
                                                                    {type == "FLAG" ? (
                                                                        <Switch
                                                                            checked={identityFlags[id] ? identityFlags[id].enabled : environmentFlags[id].enabled}
                                                                            onChange={() => this.confirmToggle(projectFlags[i], environmentFlags[id], (environments) => {
                                                                                toggleFlag({
                                                                                    environmentId: this.props.params.environmentId,
                                                                                    identity: this.props.params.id,
                                                                                    projectFlag: {id},
                                                                                    environmentFlag: environmentFlags[id],
                                                                                    identityFlag
                                                                                })
                                                                            })}/>
                                                                    ) : (
                                                                        <FeatureValue
                                                                            value={values.feature_state_value + ""}/>
                                                                    )}

                                                                </Column>
                                                                {identityFlag && (
                                                                    <Column>
                                                                        <Button
                                                                            onClick={() => this.confirmRemove(projectFlags[i], () => {
                                                                                removeFlag({
                                                                                    environmentId: this.props.params.environmentId,
                                                                                    identity: this.props.params.id,
                                                                                    identityFlag
                                                                                })
                                                                            })}>
                                                                            Reset
                                                                        </Button>
                                                                    </Column>
                                                                )}
                                                            </Row>
                                                        </Row>
                                                    )
                                                }
                                                }
                                                renderNoResults={<div className={"text-center"}>
                                                    <FormGroup>
                                                        No features
                                                    </FormGroup>
                                                </div>}
                                                filterRow={({name}, search) => {
                                                    return name.toLowerCase().indexOf(search) > -1;
                                                }}
                                            />
                                        </FormGroup>
                                    </div>

                                    <div className={"col-md-12"}>
                                        <FormGroup>
                                            <TryIt
                                                title={"Check to see what features are coming back for this user"}
                                                environmentId={this.props.params.environmentId}
                                                userId={this.props.params.id}
                                            />
                                        </FormGroup>
                                    </div>
                                    {/*<div className={"col-md-12"}>*/}
                                        {/*<FormGroup>*/}
                                            {/*<PanelSearch*/}
                                                {/*className={"no-pad"}*/}
                                                {/*title="User Traits"*/}
                                                {/*items={[1]}*/}
                                                {/*renderRow={({name, id, enabled, created_date}, i) =>*/}
                                                    {/*<div className={"text-center"}>*/}
                                                        {/*<FormGroup>*/}
                                                            {/*Coming Soon*/}
                                                        {/*</FormGroup>*/}
                                                    {/*</div>*/}
                                                {/*}*/}
                                                {/*renderNoResults={<div className={"text-center"}>*/}
                                                    {/*<FormGroup>*/}
                                                        {/*Coming Soon*/}
                                                    {/*</FormGroup>*/}
                                                {/*</div>}*/}
                                                {/*filterRow={({name}, search) => {*/}
                                                    {/*return name.toLowerCase().indexOf(search) > -1;*/}
                                                {/*}}*/}
                                            {/*/>*/}
                                        {/*</FormGroup>*/}
                                    {/*</div>*/}

                                    {/*<div className={"col-md-12"}>*/}
                                        {/*<FormGroup>*/}
                                            {/*<PanelSearch*/}
                                                {/*className={"no-pad"}*/}
                                                {/*title="Events"*/}
                                                {/*items={[1]}*/}
                                                {/*renderRow={({name, id, enabled, created_date}, i) =>*/}
                                                    {/*<div className={"text-center"}>*/}
                                                        {/*<FormGroup>*/}
                                                            {/*Coming Soon*/}
                                                        {/*</FormGroup>*/}
                                                    {/*</div>*/}
                                                {/*}*/}
                                                {/*renderNoResults={<div className={"text-center"}>*/}
                                                    {/*<FormGroup>*/}
                                                        {/*Coming Soon*/}
                                                    {/*</FormGroup>*/}
                                                {/*</div>}*/}
                                                {/*filterRow={({name}, search) => {*/}
                                                    {/*return name.toLowerCase().indexOf(search) > -1;*/}
                                                {/*}}*/}
                                            {/*/>*/}
                                        {/*</FormGroup>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        )
                    }
                </IdentityProvider>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
