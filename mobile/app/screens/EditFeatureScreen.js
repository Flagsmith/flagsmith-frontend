/**
 * Created by kylejohnson on 28/01/2017.
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';

const TermsScreen = class extends Component {
    static propTypes = {
        componentId: propTypes.string,
    };

    static displayName = 'TermsScreen';

    constructor(props, context) {
        super(props, context);
        const { name, feature_state_value, description, enabled, type } = this.props.isEdit ? Utils.getFlagValue(this.props.projectFlag, this.props.environmentFlag, this.props.identityFlag) : {};
        const { allowEditDescription } = this.props;
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

    componentWillMount() {
        // Navigation.events().bindComponent(this);
    }

    save = (func, isSaving) => {
        const { projectFlag, environmentFlag, identity, identityFlag, selectedEnvironment, selectedProject } = this.props;
        const { name, initial_value, description, type, default_enabled } = this.state;
        const environmentId = selectedEnvironment.api_key;
        const projectId = selectedProject.id;
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
            !isSaving && name && func(projectId, environmentId, {
                name,
                type,
                initial_value,
                default_enabled,
                description,
            }, projectFlag, environmentFlag);
        }
    }

    // componentDidAppear() {}
    close = () => {
        Navigation.dismissModal(this.props.componentId);
    }

    render() {
        const { dismiss } = this.props;
        const { name, initial_value, default_enabled, featureType, type, description } = this.state;
        const { isEdit, projectFlag, environmentFlag, identity, selectedEnvironment } = this.props;
        const Provider = identity ? IdentityProvider : FeatureListProvider;
        const valueString = isEdit ? 'Value' : 'Initial value';
        const enabledString = isEdit ? 'Enabled by default' : 'Enabled';
        return (
            <Flex style={{ backgroundColor: 'white' }}>
                <ProjectProvider
                  id={this.props.projectId}
                >
                    {({ project }) => (
                        <Provider onSave={this.close}>
                            {({ isLoading, isSaving, error }, { createFlag, editFlag }) => (
                                <Flex>
                                    <Flex>
                                        <Container>
                                            <TextInput
                                              textarea
                                              value={`${initial_value}`}
                                              inputProps={{ name: 'featureValue', className: 'full-width' }}
                                              onChangeText={e => this.setState({ initial_value: Utils.getTypedValue(Utils.safeParseEventValue(e)) })}
                                              type="text"
                                              title={`${valueString} (optional)${!isEdit ? ' - these can be set later per environment' : ''}`}
                                              placeholder="e.g. 'big' "
                                            />
                                            <FormGroup>
                                                {identity ? (
                                                    <Text>
                                                    This will update the feature value for the
                                                    user
                                                        {' '}
                                                        <Text style={{ fontWeight: 'bold' }}>{identity}</Text>
                                                        {' '}
in
                                                        {' '}
                                                        {selectedEnvironment.name}
                                                    </Text>
                                                ) : (
                                                    <Text>
                                                    This will update the feature for the environment
                                                        {' '}
                                                        <Text style={{ fontWeight: 'bold' }}>{selectedEnvironment.name}</Text>
                                                    </Text>
                                                )}
                                            </FormGroup>
                                        </Container>
                                    </Flex>
                                    <FormGroup>

                                        <Column>
                                            <Button
                                              disabled={isSaving}
                                              onPress={() => this.save(editFlag)}
                                            >
                                                    Ok
                                            </Button>
                                        </Column>
                                    </FormGroup>
                                </Flex>
                            )}
                        </Provider>
                    )}
                </ProjectProvider>
            </Flex>
        );
    }
};

module.exports = TermsScreen;
