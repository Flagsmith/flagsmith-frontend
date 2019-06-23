// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class Rule extends PureComponent {
    static displayName = 'Rule';

    static propTypes = {};

    renderRule = (rule, i) => {
        const { props: { rule: { conditions: rules } } } = this;
        const isLastRule = i === (rules.length - 1);
        const hasOr = i > 0;
        const operators = Constants.operators;
        return (
            <div className="rule__row reveal">
                {hasOr && (
                    <Row className="or-divider">
                        <Row>
                            <div className="or-divider__up"/>
                            Or
                            <div className="or-divider__down"/>
                        </Row>
                        <Flex className="or-divider__line"/>
                    </Row>
                )}
                <Row noWrap className="rule">
                    <Flex>
                        <Row>
                            <Column style={{ width: 200 }}>
                                <Tooltip
                                  title={(
                                      <Input
                                        data-test={this.props['data-test']+'-property'}
                                        className="input-container--flat"
                                        value={`${rule.property}`}
                                        placeholder="Value"
                                        onChange={e => this.setRuleProperty(i, 'property', { value: Utils.safeParseEventValue(e) })}
                                      />
                                    )}
                                  place="top"
                                >
                                    {Constants.strings.USER_PROPERTY_DESCRIPTION}
                                </Tooltip>

                            </Column>
                            <Column style={{ width: 200 }}>
                                <Select
                                  data-test={this.props['data-test']+'-operator'}
                                  value={rule.operator && _.find(operators, { value: rule.operator })}
                                  onChange={value => this.setRuleProperty(i, 'operator', value)}
                                  options={operators}
                                />
                            </Column>
                            <Column style={{ width: 150 }}>
                                <Input
                                  data-test={this.props['data-test']+'-value'}
                                  className="input-container--flat"
                                  value={`${rule.value}`}
                                  placeholder="Value"
                                  onChange={e => this.setRuleProperty(i, 'value', { value: Utils.getTypedValue(Utils.safeParseEventValue(e)) })}
                                />
                            </Column>
                        </Row>
                    </Flex>
                    <div>
                        <Row noWrap>
                            {isLastRule && (
                                <Button type="button" onClick={this.addRule} className="btn btn--anchor">
                                    OR
                                </Button>
                            )}

                            <div>
                                <button
                                  data-test={this.props['data-test']+'-remove'}
                                  type="button"
                                  id="remove-feature"
                                  onClick={() => this.removeRule(i)}
                                  className="btn btn--with-icon btn--condensed reveal--child btn--remove"
                                >
                                    <RemoveIcon/>
                                </button>
                            </div>
                        </Row>
                    </div>
                </Row>
            </div>
        );
    }

    removeRule = (i) => {
        const { props: { rule: { conditions: rules } } } = this;

        if (rules.length === 1) {
            this.props.onRemove();
        } else {
            rules.splice(i, 1);
            this.props.onChange(this.props.rule);
        }
    }

    setRuleProperty = (i, prop, { value }) => {
        const { props: { rule: { conditions: rules } } } = this;
        rules[i][prop] = value;
        this.props.onChange(this.props.rule);
    }

    addRule = () => {
        const { props: { rule: { conditions: rules } } } = this;
        this.props.rule.conditions = rules.concat([{ ...Constants.defaultRule }]);
        this.props.onChange(this.props.rule);
    };

    render() {
        const { props: { rule: { conditions: rules } } } = this;
        return (
            <FormGroup>
                <div className="panel overflow-visible">
                    <div className="panel-content">
                        {rules.map(this.renderRule)}
                    </div>
                </div>
            </FormGroup>
        );
    }
}
