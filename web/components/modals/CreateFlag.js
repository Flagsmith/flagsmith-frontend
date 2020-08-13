import React, { Component } from 'react';
import Highlight from '../Highlight';
import Tabs from '../base/forms/Tabs';
import TabItem from '../base/forms/TabItem';
import withSegmentOverrides from '../../../common/providers/withSegmentOverrides';
import data from '../../../common/data/base/_data';
import SegmentOverrides from '../SegmentOverrides';
import AddEditTags from '../AddEditTags';
import TagList from '../TagList';
import Constants from '../../../common/constants';

const FEATURE_ID_MAXLENGTH = Constants.forms.maxLength.FEATURE_ID;

const CreateFlag = class extends Component {
    static displayName = 'CreateFlag'

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        const { name, feature_state_value, description, enabled, hide_from_client, type } = this.props.isEdit ? Utils.getFlagValue(this.props.projectFlag, this.props.environmentFlag, this.props.identityFlag)
            : {
                type: 'FLAG',
            };
        const { allowEditDescription } = this.props;
        if (this.props.projectFlag) {
            this.userOverridesPage(1);
        }
        this.state = {
            type,
            tab: !type || type == 'FLAG' ? 0 : 1,
            default_enabled: enabled,
            hide_from_client,
            name,
            initial_value: Utils.getTypedValue(feature_state_value),
            description,
            allowEditDescription,
        };
    }


    close() {
        closeModal();
    }


    componentDidMount = () => {
        if (!this.props.isEdit && !E2E) {
            this.focusTimeout = setTimeout(() => {
                this.input.focus();
                this.focusTimeout = null;
            }, 500);
        }
    };

    componentWillUnmount() {
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
        }
    }

    userOverridesPage = (page) => {
        data.get(`${Project.api}environments/${this.props.environmentId}/featurestates/?anyIdentity=1&feature=${this.props.projectFlag.id}&page=${page}`)
            .then((userOverrides) => {
                this.setState({
                    userOverrides: userOverrides.results,
                    userOverridesPaging: {
                        next: userOverrides.next,
                        count: userOverrides.count,
                        currentPage: page,
                    },
                });
            });
    }

    setTab = (tab) => {
        this.setState({ tab, type: this.getTypeFromTab(tab) });
    };

    getTypeFromTab = (i) => {
        switch (i) {
            case 0:
                return 'FLAG';
        }
        return 'CONFIG';
    }

    save = (func, isSaving) => {
        const { projectFlag, segmentOverrides, environmentFlag, identity, identityFlag, environmentId } = this.props;
        const { name, initial_value, description, type, default_enabled, hide_from_client } = this.state;
        if (identity) {
            !isSaving && name && func({
                identity,
                projectFlag,
                environmentFlag,
                identityFlag: Object.assign({}, identityFlag || {}, {
                    feature_state_value: initial_value,
                    enabled: default_enabled,
                }),
                environmentId,
            });
        } else {
            !isSaving && name && func(this.props.projectId, this.props.environmentId, {
                name,
                type,
                initial_value,
                default_enabled,
                hide_from_client,
                description,
            }, projectFlag, environmentFlag, segmentOverrides);
        }
    }

    render() {
        const { name, initial_value, hide_from_client, default_enabled, featureType, type, description } = this.state;
        const { isEdit, hasFeature, projectFlag, environmentFlag, identity, identityName } = this.props;
        const Provider = identity ? IdentityProvider : FeatureListProvider;
        const valueString = isEdit ? 'Value' : 'Initial value';
        const enabledString = isEdit ? 'Enabled' : 'Enabled by default';
       
        return (
            <ProjectProvider
              id={this.props.projectId}
            >
                {({ project }) => (
                    <Provider onSave={this.close}>
                        {({ isLoading, isSaving, error }, { createFlag, editFlag }) => (
                            <form
                              id="create-feature-modal"
                              className="mt-4"
                              onSubmit={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  const func = isEdit ? editFlag : createFlag;
                                  this.save(func, isSaving);
                              }}
                            >
                                {!isEdit && !identity && (
                                    <FormGroup className="mb-4 ml-3">
                                        <label>Feature type</label>
                                        <Tabs
                                          className="pill" value={this.state.tab}
                                          onChange={this.setTab}
                                        >
                                            <TabItem
                                              id="btn-select-flags"
                                              value="FLAG"
                                              tabLabel={(
                                                  <Row className="row-center">
                                                      <span className="tab-icon ion-ios-switch"/>
                                                      <span className="tab-text">Feature Flag</span>
                                                  </Row>
                                                )}
                                            />
                                            <TabItem
                                              value="CONFIG"
                                              data-test="btn-select-remote-config"
                                              id="btn-select-remote-config"
                                              tabLabel={(
                                                  <Row className="row-center">
                                                      <span className="tab-icon ion-ios-settings"/>
                                                      <span className="tab-text">Remote config</span>
                                                  </Row>
                                            )}
                                            />
                                        </Tabs>
                                    </FormGroup>
                                )}
                                <FormGroup className="mb-4 mr-3 ml-3">
                                    <InputGroup
                                      ref={e => this.input = e}
                                      data-test="featureID"
                                      inputProps={{
                                          readOnly: isEdit,
                                          className: 'full-width',
                                          name: 'featureID',
                                          maxLength: FEATURE_ID_MAXLENGTH,
                                      }}
                                      value={name}
                                      onChange={e => this.setState({ name: Format.enumeration.set(Utils.safeParseEventValue(e)).toLowerCase() })}
                                      isValid={name && name.length}
                                      type="text" title={isEdit ? 'ID' : 'ID*'}
                                      placeholder="E.g. header_size"
                                      // className={isEdit ? "mr-5" : ''}
                                    />
                                </FormGroup>
                                {type == 'CONFIG' ? (
                                    <FormGroup className="ml-3 mb-4 mr-3">
                                        <InputGroup
                                          textarea
                                          value={initial_value}
                                          disabled={hide_from_client}
                                          data-test="featureValue"
                                          inputProps={{ name: 'featureValue', className: 'full-width' }}
                                          onChange={e => this.setState({ initial_value: Utils.getTypedValue(Utils.safeParseEventValue(e)) })}
                                          type="text"
                                          title={`${valueString} (optional)${!isEdit ? ' - these can be set later per environment' : ''}`}
                                          placeholder="e.g. 'big' "
                                        />
                                    </FormGroup>
                                ) : (
                                    <FormGroup className="mb-4 mr-3 ml-3">
                                        <div>
                                            <label>{enabledString}</label>
                                        </div>
                                        <Switch
                                          data-test="toggle-feature-button"
                                          defaultChecked={default_enabled}
                                          disabled={hide_from_client}
                                          checked={!hide_from_client && default_enabled}
                                          onChange={default_enabled => this.setState({ default_enabled })}
                                        />
                                    </FormGroup>
                                )}
                                {hasFeature('tags') && (
                                <FormGroup className="mb-4 mr-3 ml-3" >
                                    <InputGroup
                                      title="Tags (optional)"
                                      component={<AddEditTags projectId={this.props.projectId} value={this.state.tags} onChange={tags => this.setState({ tags })}/>}
                                    />
                                </FormGroup>
                                )}
                                <FormGroup className="mb-4 mr-3 ml-3" >
                                    <InputGroup
                                      value={description}
                                      data-test="featureDesc"
                                      inputProps={{
                                          className: 'full-width',
                                          readOnly: !!identity,
                                          name: 'featureDesc',
                                      }}
                                      onChange={e => this.setState({ description: Utils.safeParseEventValue(e) })}
                                      isValid={name && name.length}
                                      type="text" title="Description (optional)"
                                      placeholder="e.g. 'This determines what size the header is' "
                                    />
                                </FormGroup>


                                {!identity && hasFeature('hide_flag') && (
                                  <FormGroup className="mb-4 mr-3 ml-3">
                                      <Tooltip
                                        title={<label className="cols-sm-2 control-label">Hide from SDKs <span className="icon ion-ios-information-circle"/></label>}
                                        place="right"
                                      >
                                          {Constants.strings.HIDE_FROM_SDKS_DESCRIPTION}
                                      </Tooltip>
                                      <div>
                                          <Switch
                                            data-test="toggle-feature-button"
                                            defaultChecked={hide_from_client}
                                            checked={hide_from_client}
                                            onChange={hide_from_client => this.setState({ hide_from_client })}
                                          />
                                      </div>
                                  </FormGroup>
                                )}
                                {!identity && isEdit && (
                                <Permission level="project" permission="ADMIN" id={this.props.projectId}>
                                    {({ permission: projectAdmin }) => projectAdmin && (

                                    <FormGroup className="mb-4 mr-3 ml-3">
                                        <Panel
                                          icon="ion-ios-settings"
                                          title={(
                                              <Tooltip
                                                title={<h6 className="mb-0">Segment Overrides <span className="icon ion-ios-information-circle"/></h6>}
                                                place="right"
                                              >
                                                  {Constants.strings.SEGMENT_OVERRIDES_DESCRIPTION}
                                              </Tooltip>
                                            )}
                                        >
                                            {this.props.segmentOverrides ? (
                                                <SegmentOverrides
                                                  feature={projectFlag.id}
                                                  projectId={this.props.projectId}
                                                  environmentId={this.props.environmentId}
                                                  type={type}
                                                  value={this.props.segmentOverrides}
                                                  segments={this.props.segments}
                                                  onChange={this.props.updateSegments}
                                                />
                                            ) : (
                                                <div className="text-center">
                                                    <Loader/>
                                                </div>
                                            )}

                                        </Panel>
                                    </FormGroup>
                                    )}
                                </Permission>
                                )}
                                {
                                    !identity
                                    && isEdit && (
                                    <FormGroup className="mb-4 mr-3 ml-3">
                                        <PanelSearch
                                          id="users-list"
                                          title={(
                                              <Tooltip
                                                title={<h6 className="mb-0">Identity Overrides <span className="icon ion-ios-information-circle"/></h6>}
                                                place="right"
                                              >
                                                  {Constants.strings.IDENTITY_OVERRIDES_DESCRIPTION}
                                              </Tooltip>
                                          )}
                                          className="no-pad"
                                          icon="ion-md-person"
                                          items={this.state.userOverrides}
                                          paging={this.state.userOverridesPaging}
                                          nextPage={() => this.userOverridesPage(this.state.userOverridesPaging.currentPage + 1)}
                                          prevPage={() => this.userOverridesPage(this.state.userOverridesPaging.currentPage - 1)}
                                          goToPage={page => this.userOverridesPage(page)}
                                          renderRow={({ id, feature_state_value, enabled, identity }) => (
                                              <Row
                                                onClick={() => {
                                                    this.close();
                                                    this.props.router.history.push(`/project/${this.props.projectId}/environment/${this.props.environmentId}/users/${identity.identifier}/${identity.id}`);
                                                }} space className="list-item cursor-pointer"
                                                key={id}
                                              >
                                                  <Flex>
                                                      {identity.identifier}
                                                  </Flex>
                                                  {type === 'FLAG' ? (
                                                      <Switch checked={enabled}/>
                                                  ) : (
                                                      <FeatureValue
                                                        value={feature_state_value}
                                                      />
                                                  )}

                                              </Row>
                                          )}
                                          renderNoResults={(
                                              <Panel
                                                id="users-list"
                                                title={(
                                                    <Tooltip
                                                      title={<h6 className="mb-0">Identity Overrides <span className="icon ion-ios-information-circle"/></h6>}
                                                      place="right"
                                                    >
                                                        {Constants.strings.IDENTITY_OVERRIDES_DESCRIPTION}
                                                    </Tooltip>
                                                  )}
                                              >
                                                  No identities are overriding this feature.
                                              </Panel>
                                              )}
                                          isLoading={!this.state.userOverrides}
                                        />
                                    </FormGroup>
                                    )
                                }

                                {error && <Error error={error}/>}
                                <div className={identity ? 'pr-3' : 'side-modal__footer pr-5'}>
                                    <div className="mb-3">
                                        {identity ? (
                                            <p className="text-right">
                                                This will update the feature value for the
                                                user
                                                {' '}
                                                <strong>{identityName}</strong>
                                                {' '}
                                                in
                                                <strong>
                                                    {' '}
                                                    {
                                                        _.find(project.environments, { api_key: this.props.environmentId }).name
                                                    }.
                                                </strong>
                                                <br/>
                                                {'Any segment overrides for this feature will now be ignored.'}
                                            </p>
                                        ) : isEdit ? (
                                            <p className="text-right">
                                                This will update the feature value for the environment
                                                {' '}
                                                <strong>
                                                    {
                                                        _.find(project.environments, { api_key: this.props.environmentId }).name
                                                    }
                                                </strong>
                                            </p>
                                        ) : (
                                            <p className="text-right">
                                              This will create the feature for <strong>all environments</strong>, you can edit this feature per environment once the feature is created.
                                            </p>
                                        )}

                                    </div>
                                    <div className="text-right mb-2">
                                        {isEdit ? (
                                            <Button data-test="update-feature-btn" id="update-feature-btn" disabled={isSaving || !name}>
                                                {isSaving ? 'Updating' : 'Update Feature'}
                                            </Button>
                                        ) : (
                                            <Button data-test="create-feature-btn" id="create-feature-btn" disabled={isSaving || !name}>
                                                {isSaving ? 'Creating' : 'Create Feature'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        )}

                    </Provider>
                )}
            </ProjectProvider>
        );
    }
};

CreateFlag.propTypes = {};

module.exports = ConfigProvider(withSegmentOverrides(CreateFlag));
