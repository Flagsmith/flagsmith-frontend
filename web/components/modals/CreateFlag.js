import React, { Component, PropTypes } from 'react';
import Highlight from '../Highlight';
import Tabs from '../base/forms/Tabs';
import TabItem from '../base/forms/TabItem';
import withSegmentOverrides from '../../../common/providers/withSegmentOverrides';
import SegmentOverrides from '../SegmentOverrides';

const CreateFlag = class extends Component {
    static displayName = 'CreateFlag'

    constructor(props, context) {
        super(props, context);
        const { name, feature_state_value, description, enabled, type } = this.props.isEdit ? Utils.getFlagValue(this.props.projectFlag, this.props.environmentFlag, this.props.identityFlag)
            : {
                type: 'FLAG',
            };
        const { allowEditDescription } = this.props;
        AppActions.getSegments(this.props.projectId, this.props.environmentId);
        this.state = {
            type,
            tab: !type || type == 'FLAG' ? 0 : 1,
            default_enabled: enabled,
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
        if (!this.props.isEdit) {
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

    render() {
        const { name, initial_value, default_enabled, featureType, type, description } = this.state;
        const { isEdit, hasFeature, projectFlag, environmentFlag, identity } = this.props;
        const Provider = identity ? IdentityProvider : FeatureListProvider;
        const valueString = isEdit ? 'Value' : 'Initial value';
        const enabledString = isEdit ? 'Enabled by default' : 'Enabled';

        return (
            <ProjectProvider
              id={this.props.projectId}
            >
                {({ project }) => (
                    <Provider onSave={this.close}>
                        {({ isLoading, isSaving, error }, { createFlag, editFlag }) => (
                            <form
                              id="create-feature-modal"
                              onSubmit={(e) => {
                                  e.preventDefault();
                                  const func = isEdit ? editFlag : createFlag;
                                  this.save(func, isSaving);
                              }}
                            >
                                {!isEdit && !identity && (
                                    <FormGroup className="mb-4">
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
                                                      <ion className="tab-icon ion-ios-switch"/>
                                                        Feature Flag
                                                  </Row>
                                                )}
                                            />
                                            <TabItem
                                              value="CONFIG"
                                              data-test="btn-select-remote-config"
                                              id="btn-select-remote-config"
                                              tabLabel={(
                                                  <Row className="row-center">
                                                      <ion className="tab-icon ion-ios-settings"/>
                                                    Remote config
                                                  </Row>
                                            )}
                                            />
                                        </Tabs>
                                    </FormGroup>
                                )}

                                <FormGroup className="mb-4">
                                    <InputGroup
                                      ref={e => this.input = e}
                                      data-test="featureID"
                                      inputProps={{
                                          readOnly: isEdit,
                                          className: 'full-width',
                                          name: 'featureID',
                                      }}
                                      value={name}
                                      onChange={e => this.setState({ name: Format.enumeration.set(Utils.safeParseEventValue(e)).toLowerCase() })}
                                      isValid={name && name.length}
                                      type="text" title={isEdit ? 'ID' : 'ID*'}
                                      placeholder="E.g. header_size"
                                    />
                                </FormGroup>
                                {type == 'CONFIG' ? (
                                    <FormGroup className="mb-4">
                                        <InputGroup
                                          textarea
                                          value={initial_value}
                                          data-test="featureValue"
                                          inputProps={{ name: 'featureValue', className: 'full-width' }}
                                          onChange={e => this.setState({ initial_value: Utils.getTypedValue(Utils.safeParseEventValue(e)) })}
                                          type="text"
                                          title={`${valueString} (optional)${!isEdit ? ' - these can be set later per environment' : ''}`}
                                          placeholder="e.g. 'big' "
                                        />
                                    </FormGroup>
                                ) : (
                                    <FormGroup className="mb-4">
                                        <div>
                                            <label>{enabledString}</label>
                                        </div>
                                        <Switch
                                          defaultChecked={default_enabled}
                                          checked={default_enabled}
                                          onChange={default_enabled => this.setState({ default_enabled })}
                                        />
                                    </FormGroup>
                                )}

                                <FormGroup className="mb-4">
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
                                {type == 'FLAG' && this.props.segments && hasFeature('segments') && (
                                    <FormGroup className="mb-4">
                                        <Tooltip
                                          title={<label className="cols-sm-2 control-label">Segment Overrides (Optional)</label>}
                                          place="right"
                                        >
                                            {Constants.strings.SEGMENT_OVERRIDES_DESCRIPTION}
                                        </Tooltip>
                                        <SegmentOverrides
                                          type={type}
                                          value={this.props.segmentOverrides}
                                          segments={this.props.segments}
                                          onChange={this.props.updateSegments}
                                        />
                                    </FormGroup>
                                )}
                                {error && <Error error={error}/>}
                                {isEdit && (
                                    <div className="mb-3">
                                        {identity ? (
                                            <p className="text-right">
                                                This will update the feature value for the
                                                user
                                                {' '}
                                                <strong>{identity}</strong>
                                                {' '}
                                                in
                                                <strong>
                                                    {' '}
                                                    {
                                                        _.find(project.environments, { api_key: this.props.environmentId }).name
                                                    }
                                                </strong>
                                            </p>
                                        ) : (
                                            <p className="text-right">
                                                This will update the feature value for the environment
                                                {' '}
                                                <strong>
                                                    {
                                                        _.find(project.environments, { api_key: this.props.environmentId }).name
                                                    }
                                                </strong>
                                            </p>
                                        )}

                                    </div>
                                )}
                                <div className="text-right">
                                    {isEdit ? (
                                        <Button data-test="update-feature-btn" id="update-feature-btn" disabled={isSaving || !name}>
                                            {isSaving ? 'Creating' : 'Update Feature'}
                                        </Button>
                                    ) : (
                                        <Button data-test="create-feature-btn" id="create-feature-btn" disabled={isSaving || !name}>
                                            {isSaving ? 'Creating' : 'Create Feature'}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        )}

                    </Provider>
                )}
            </ProjectProvider>
        );
    }

    save = (func, isSaving) => {
        const { projectFlag, segmentOverrides, environmentFlag, identity, identityFlag, environmentId } = this.props;
        const { name, initial_value, description, type, default_enabled } = this.state;
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
                description,
            }, projectFlag, environmentFlag, segmentOverrides);
        }
    }
};

CreateFlag.propTypes = {};

module.exports = ConfigProvider(withSegmentOverrides(CreateFlag));
