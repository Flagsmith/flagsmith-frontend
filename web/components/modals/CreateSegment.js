import React, { Component, PropTypes } from 'react';
import Rule from './Rule';

const CreateSegment = class extends Component {
        static displayName = 'CreateSegment'

        constructor(props, context) {
            super(props, context);
            const { description, name, rules = [] } = this.props.segment ? _.cloneDeep(this.props.segment.rules) :
                {
                    rules: [{ all: { rules: [{ any: { rules: [{...Constants.defaultRule}] } }] }, }]
                }

            this.state = {
                description, name, rules
            };

        }

        addRule = () => {
            const rules = this.state.rules;
            rules[0].all.rules = rules[0].all.rules.concat([{
                any: {
                    rules: [
                        { ...Constants.defaultRule }
                    ]
                }
            }]);
            this.setState({ rules })
        }

        close() {
            closeModal();
        }


        componentDidMount = () => {
            this.focusTimeout = setTimeout(() => {
                this.input.focus();
                this.focusTimeout = null;
            }, 500);
        };

        componentWillUnmount() {
            if (this.focusTimeout) {
                clearTimeout(this.focusTimeout);
            }
        }

        updateRule = (rulesIndex, elementNumber, newValue) => {
            const { rules } = this.state;
            rules[rulesIndex].all.rules[elementNumber] = newValue;
            this.setState({ rules });
        }

        removeRule = (rulesIndex, elementNumber) => {
            const { rules } = this.state;
            rules[rulesIndex].all.rules.splice(elementNumber, 1);
            this.setState({ rules });
        }


        render() {
            const { name, description, rules, isSaving, createSegment, editSegment } = this.state;
            const { isEdit, segment, identity } = this.props;
            const Provider = identity ? IdentityProvider : FeatureListProvider;

            return (
                <FeatureListProvider onSave={this.onSave} onError={this.onError}>
                    {({ isLoading, projectFlags, environmentFlags }) => {
                        const flags = projectFlags.map(({ name }) => ({ value: name, label: name }))
                        return (
                            <form
                                id="create-feature-modal"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const func = isEdit ? editSegment : createSegment;
                                    this.save(func, isSaving);
                                }}
                            >
                                <InputGroup
                                    ref={(e) => this.input = e}
                                    inputProps={{
                                        readOnly: isEdit,
                                        className: "full-width",
                                        name: "featureID"
                                    }}
                                    value={name}
                                    onChange={(e) => this.setState({ name: Format.enumeration.set(Utils.safeParseEventValue(e)).toLowerCase() })}
                                    isValid={name && name.length}
                                    type="text" title={isEdit ? "ID" : "ID*"}
                                    placeholder="E.g. power_users"
                                />

                                <FormGroup>
                                    <InputGroup
                                        value={description}
                                        inputProps={{
                                            className: "full-width",
                                            readOnly: identity ? true : false,
                                            name: "featureDesc"
                                        }}
                                        onChange={(e) => this.setState({ description: Utils.safeParseEventValue(e) })}
                                        isValid={name && name.length}
                                        type="text" title="Description (optional)"
                                        placeholder="e.g. 'People who have spent over $100' "
                                    />
                                </FormGroup>

                                <div className={"form-group "}>
                                    <label className="cols-sm-2 control-label">Include users when</label>
                                    <div className="panel--grey overflow-visible">
                                        {projectFlags && (
                                            <div>
                                                <FormGroup>
                                                    {rules[0].all.rules.map((rule, i) => (
                                                            <div>
                                                                {i > 0 && (
                                                                    <Row className="and-divider">
                                                                        <Flex className="and-divider__line"></Flex>
                                                                        AND
                                                                        <Flex className="and-divider__line"></Flex>
                                                                    </Row>
                                                                )}
                                                                <Rule rule={rule}
                                                                      options={flags}
                                                                      onRemove={(v) => this.removeRule(0, i, v)}
                                                                      onChange={(v) => this.updateRule(0, i, v)}
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </FormGroup>
                                                <div onClick={this.addRule} style={{ marginTop: 20 }}
                                                     className={"text-center"}
                                                >
                                                    <Button className="btn btn--anchor">
                                                        ADD RULE
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isEdit && (
                                    <div>
                                        <p className={"text-right faint-lg"}>
                                            This will update the feature value for the project <strong>{
                                            project.name
                                        }</strong>
                                        </p>
                                    </div>
                                )}

                                <div className="text-right">
                                    {isEdit ? (
                                        <Button id="update-feature-btn" disabled={isSaving || !name}>
                                            {isSaving ? 'Creating' : 'Update Segment'}
                                        </Button>
                                    ) : (
                                        <Button id="create-feature-btn" disabled={isSaving || !name}>
                                            {isSaving ? 'Creating' : 'Create Segment'}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        )
                    }}
                </FeatureListProvider>
            );
        }

        save = (func, isSaving) => {

        }
    }
;

CreateSegment.propTypes = {};

module.exports = hot(module)(CreateSegment);
