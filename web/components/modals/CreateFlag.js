import React, { Component } from 'react';
import Tabs from '../base/forms/Tabs';
import TabItem from '../base/forms/TabItem';
import withSegmentOverrides from '../../../common/providers/withSegmentOverrides';
import data from '../../../common/data/base/_data';
import SegmentOverrides from '../SegmentOverrides';
import AddEditTags from '../AddEditTags';
import Constants from '../../../common/constants';
import _data from '../../../common/data/base/_data';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip , Legend } from 'recharts';

const FEATURE_ID_MAXLENGTH = Constants.forms.maxLength.FEATURE_ID;

const CreateFlag = class extends Component {
    static displayName = 'CreateFlag'

    constructor(props, context) {
        super(props, context);
        const { name, feature_state_value, description, tags, enabled, hide_from_client, type } = this.props.isEdit ? Utils.getFlagValue(this.props.projectFlag, this.props.environmentFlag, this.props.identityFlag)
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
            tags,
            initial_value: Utils.getTypedValue(feature_state_value),
            description,
            selectedIdentity: null,
            allowEditDescription,
            enabledIndentity: false,
            enabledSegment: false,
            period: '24h',
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
        AppActions.getIdentities(this.props.environmentId, 3);
        if (this.props.projectFlag) {
          AppActions.getFlagInfluxData(this.props.projectId, this.props.environmentId, this.props.projectFlag.id, this.state.period);
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

    getIndluxData = () => {
      AppActions.getFlagInfluxData(this.props.projectId, this.props.environmentId, this.props.projectFlag.id, this.state.period);
    }

    getDisplayPeriod = () => {
      const { period } = this.state;
      if (period == '24h') {
        return '30d';
      } else {
        return '24h';
      }
    }

    changePeriod = () => {
      const changePeriod = this.getDisplayPeriod();
      this.state = {
          ...this.state,
          period: changePeriod,
      };
      this.getIndluxData();
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
                tags: this.state.tags,
                hide_from_client,
                description,
            }, projectFlag, environmentFlag, segmentOverrides);
        }
    }

    changeSegment = (items) => {
        const { enabledSegment } = this.state;
        items.forEach((item) => {
            item.enabled = enabledSegment;
        });
        this.props.updateSegments(items);
        this.setState({ enabledSegment: !enabledSegment });
    }

    changeIdentity = (items) => {
        const { environmentId } = this.props;
        const { enabledIndentity } = this.state;

        Promise.all(items.map(item => new Promise((resolve) => {
            AppActions.changeUserFlag({
                identityFlag: item.id,
                identity: item.identity.id,
                environmentId,
                onSuccess: resolve,
                payload: {
                    id: item.identity.id,
                    enabled: enabledIndentity,
                    value: item.identity.identifier,
                },
            });
        }))).then(() => {
            this.userOverridesPage(1);
        });

        this.setState({ enabledIndentity: !enabledIndentity });
    }

    toggleUserFlag = ({ id, feature_state_value, enabled, identity }) => {
        const { environmentId } = this.props;

        AppActions.changeUserFlag({
            identityFlag: id,
            identity: identity.id,
            environmentId,
            onSuccess: () => {
                this.userOverridesPage(1);
            },
            payload: {
                id: identity.id,
                enabled: !enabled,
                value: identity.identifier,
            },
        });
    }

    drawChart = (data) => {
      const { name } = this.state;
      if (data && data.events_list) { // protect against influx setup incorrectly
          return (
              <ResponsiveContainer height={400} width="100%">
                  <BarChart data={data.events_list}>
                      <CartesianGrid strokeDasharray="3 5"/>
                      <XAxis allowDataOverflow={false} dataKey="datetime"/>
                      <YAxis allowDataOverflow={false}/>
                      <RechartsTooltip/>
                      <Bar dataKey={name} stackId="a" fill="#6633ff" />
                  </BarChart>
              </ResponsiveContainer>
          );
      }
      return null
    }

    addItem = () => {
        const { projectFlag, environmentFlag, environmentId, identity } = this.props;
        this.setState({ isLoading: true });
        const selectedIdentity = this.state.selectedIdentity.value;
        const identities = identity ? identity.identifier : [];

        if (!_.find(identities, v => v.identifier === selectedIdentity)) {
            _data.post(`${Project.api}environments/${environmentId}/identities/${selectedIdentity}/featurestates/`, {
                feature: projectFlag.id,
                enabled: !environmentFlag.enabled,
                value: environmentFlag.value,
            }).then((res) => {
                this.setState({
                    isLoading: false,
                    selectedIdentity: null,
                });
                this.userOverridesPage(1);
            })
                .catch((e) => {
                    this.setState({ error, isLoading: false });
                });
        } else {
            this.setState({
                isLoading: false,
                selectedIdentity: null,
            });
        }
    }

    identityOptions = (identities, value, isLoading) => {
        if (!value) {
            return [];
        }
        return _.filter(
            identities, identity => !value || !_.find(value, v => v.identity.identifier === identity.identifier),
        ).map(({ identifier: label, id: value }) => ({ value, label })).slice(0, 10);
    }

    onSearchIdentityChange = (e) => {
        AppActions.searchIdentities(this.props.environmentId, Utils.safeParseEventValue(e), 3);
    }

    render() {
        const {
            name,
            initial_value,
            hide_from_client,
            default_enabled,
            featureType,
            type,
            description,
            enabledSegment,
            enabledIndentity,
        } = this.state;
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
                        {({ isLoading, isSaving, error, influxData }, { createFlag, editFlag }) => (
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
                                {hasFeature('tags') && !identity && this.state.tags && (
                                <FormGroup className="mb-4 mr-3 ml-3" >
                                    <InputGroup
                                      title={identity ? 'Tags' : 'Tags (optional)'}
                                      component={(
                                          <AddEditTags
                                            readOnly={!!identity} projectId={this.props.projectId} value={this.state.tags}
                                            onChange={tags => this.setState({ tags })}
                                          />
)}
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
                                      type="text" title={identity ? 'Description' : 'Description (optional)'}
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
                                          action={
                                                this.props.hasFeature('killswitch') && (
                                                <Button onClick={() => this.changeSegment(this.props.segmentOverrides)} type="button" className={`btn--outline${enabledSegment ? '' : '-red'}`}>
                                                    {enabledSegment ? 'Enable All' : 'Disable All'}
                                                </Button>
                                                )
                                            }
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
                                          action={
                                              this.props.hasFeature('killswitch') && (
                                              <Button onClick={() => this.changeIdentity(this.state.userOverrides)} type="button" className={`btn--outline${enabledIndentity ? '' : '-red'}`}>
                                                  {enabledIndentity ? 'Enable All' : 'Disable All'}
                                              </Button>
                                              )
                                            }
                                          icon="ion-md-person"
                                          items={this.state.userOverrides}
                                          paging={this.state.userOverridesPaging}
                                          nextPage={() => this.userOverridesPage(this.state.userOverridesPaging.currentPage + 1)}
                                          prevPage={() => this.userOverridesPage(this.state.userOverridesPaging.currentPage - 1)}
                                          goToPage={page => this.userOverridesPage(page)}
                                          searchPanel={
                                              this.props.hasFeature('improved_identity_overrides') && (
                                              <div className="text-center mt-2 mb-2">
                                                  <IdentityListProvider>
                                                      {({ isLoading, identities }) => (
                                                          <Flex className="text-left">
                                                              <Select
                                                                onInputChange={this.onSearchIdentityChange}
                                                                data-test="select-identity"
                                                                placeholder="Search"
                                                                value={this.state.selectedIdentity}
                                                                onChange={selectedIdentity => this.setState({ selectedIdentity }, this.addItem)}
                                                                options={this.identityOptions(identities, this.state.userOverrides, isLoading)}
                                                                styles={{
                                                                    control: base => ({
                                                                        ...base,
                                                                        '&:hover': { borderColor: '$bt-brand-secondary' },
                                                                        border: '1px solid $bt-brand-secondary',
                                                                    }),
                                                                }}
                                                              />
                                                          </Flex>
                                                      )}
                                                  </IdentityListProvider>
                                              </div>
                                              )
                                          }
                                          renderRow={({ id, feature_state_value, enabled, identity }) => (
                                              <Row
                                                onClick={() => {
                                                    if (type === 'FLAG') {
                                                        this.toggleUserFlag({ id, feature_state_value, enabled, identity });
                                                    } else {
                                                        // todo: allow for editing from this screen
                                                    }
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

                                                  <a
                                                    target="_blank"
                                                    href={`/project/${this.props.projectId}/environment/${this.props.environmentId}/users/${identity.identifier}/${identity.id}`}
                                                    className="ml-2 btn btn-link btn--link" onClick={() => {
                                                    }}
                                                  >
                                                      View user
                                                  </a>
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
                                                  {this.props.hasFeature('improved_identity_overrides') && (
                                                  <IdentityListProvider>
                                                      {({ isLoading, identities }) => (
                                                          <div>
                                                              <Flex className="text-left">
                                                                  <Select
                                                                    data-test="select-identity"
                                                                    placeholder="Search"
                                                                    onInputChange={this.onSearchIdentityChange}
                                                                    value={this.state.selectedIdentity}
                                                                    onChange={selectedIdentity => this.setState({ selectedIdentity }, this.addItem)}
                                                                    options={this.identityOptions(identities, this.state.userOverrides, isLoading)}
                                                                    styles={{
                                                                        control: base => ({
                                                                            ...base,
                                                                            '&:hover': { borderColor: '$bt-brand-secondary' },
                                                                            border: '1px solid $bt-brand-secondary',
                                                                        }),
                                                                    }}
                                                                  />
                                                              </Flex>
                                                              <div className="mt-2">
                                                                  No identities are overriding this feature.
                                                              </div>
                                                          </div>
                                                      )}
                                                  </IdentityListProvider>
                                                  )}
                                              </Panel>
                                              )}
                                          isLoading={!this.state.userOverrides}
                                        />
                                    </FormGroup>
                                    )
                                }


                                {(this.props.hasFeature('flag_analytics') && this.props.flagId) &&
                                <FormGroup className="mb-4 mr-3 ml-3">
                                    <Panel
                                      title={<h6 className="mb-0">Flag events for last {this.state.period}</h6>}
                                      action={
                                          <Button onClick={() => this.changePeriod()} type="button" className={`btn--outline`}>
                                              {`Change to ${this.getDisplayPeriod()}`}
                                          </Button>
                                      }
                                    >
                                        {this.drawChart(influxData)}
                                    </Panel>
                                </FormGroup>
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
