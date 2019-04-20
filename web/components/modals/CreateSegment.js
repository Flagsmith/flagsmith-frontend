import React, { Component, PropTypes } from 'react';
import Highlight from '../Highlight';
import Tabs from '../base/forms/Tabs';
import Rule from './Rule';

const TheComponent = class extends Component {
    displayName: 'CreateSegment'

    constructor(props, context) {
        super(props, context);
        const { description, name, rules = [] } = this.props.segment ? _.cloneDeep(this.props.segment) : {}
        this.state = {
            description, name, rules
        };
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


    render() {
        const { name, description } = this.state;
        const { isEdit, segment, identity } = this.props;
        const Provider = identity ? IdentityProvider : FeatureListProvider;

        const rules = [
            {
                all: {
                    rules: [
                        {
                            any: {
                                rules: [
                                    {
                                        property: 'money',
                                        operator: 'GREATER_THAN_INCLUSIVE',
                                        value: 11
                                    },
                                    {
                                        property: 'money',
                                        operator: 'LESS_THAN_INCLUSIVE',
                                        value: 20
                                    }
                                ]
                            }
                        },
                        {
                            any: {
                                rules: [
                                    {
                                        property: 'money',
                                        operator: 'GREATER_THAN_INCLUSIVE',
                                        value: 11
                                    },
                                    {
                                        property: 'money',
                                        operator: 'LESS_THAN_INCLUSIVE',
                                        value: 20
                                    }
                                ]
                            }
                        },
                    ]
                },
            },
            {
                not: {
                    rules: [
                        {
                        any: {
                            rules: [
                                {
                                    property: 'name',
                                    operator: 'REGEX',
                                    value: "ky.*?e"
                                }
                            ]
                        }
                    }
                    ],
                }
            }
        ];

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
                                    <div className="panel--grey">
                                        <FormGroup>
                                        {rules[0].all.rules.map((rule, i) => (
                                                <div>
                                                    {i>0 && (
                                                            <Row className="and-divider">
                                                                <Flex className="and-divider__line"></Flex>
                                                                    AND
                                                                <Flex className="and-divider__line"></Flex>
                                                            </Row>
                                                    )}
                                                <Rule rule={rule} onChange={(v) => this.updateRule(rules[0].all.rules, i, v)}/>
                                                </div>
                                            )
                                        )}
                                        </FormGroup>
                                        <div style={{marginTop:20}} className={"text-center"}>
                                            <Button className="btn btn--anchor">
                                                ADD RULE
                                            </Button>
                                        </div>
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

                                <div className="pull-right">
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
                        )}

                    </Provider>
                )}
            </ProjectProvider>
        );
    }

    save = (func, isSaving) => {

    }
};

TheComponent.propTypes = {};

module.exports = hot(module)(TheComponent);
