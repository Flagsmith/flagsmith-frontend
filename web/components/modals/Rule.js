// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

const operators = [
    {
    'value': 'EQUAL',
    'label': 'Exactly Matches (=)'
    },
    {
        'value': 'NOT_EQUAL',
        'label': 'Does not match (!=)',
    },
    {
        'value': 'GREATER_THAN',
        'label': '>',
    },
    {
        'value': 'GREATER_THAN_INCLUSIVE',
        'label': '>=',
    },
    {
        'value': 'LESS_THAN',
        'label': '<',
    },
    {
        'value': 'LESS_THAN_INCLUSIVE',
        'label': '<=',
    },
    {
        'value': 'CONTAINS',
        'label': 'Contains'
    },
    {
        'value': 'NOT_CONTAINS',
        'label': 'Does not contain'
    },
    {
        'value': 'REGEX',
        'label': 'Matches regex'
    },
]
export default class Rule extends PureComponent {
    static displayName = 'Rule';

    static propTypes = {};

    renderRule = (rule, i) => {
        const { props: { options, rule: { any: { rules } } } } = this;
        const isLastRule = i === (rules.length - 1);
        const hasOr = i > 0;
        return (
            <div className="rule__row reveal">
                {hasOr && (
                    <Row className="or-divider">
                        <Row>
                            <div className="or-divider__up"/>
                            Or
                            <div className="or-divider__down"/>
                        </Row>
                        <Flex className="or-divider__line"></Flex>
                    </Row>
                )}
                <Row noWrap className="rule">
                    <Flex>
                        <Row>
                            <Column style={{ width: 200 }}>
                                <CreatableSelect
                                    placeholder="User property"
                                    value={rule.property && { value: rule.property, label: rule.property }}
                                    onChange={(value) => this.setRuleProperty(i, "property", value)}
                                    options={options}
                                />
                            </Column>
                            <Column style={{ width: 200 }}>
                                <Select
                                    value={rule.operator && _.find(operators, {value:rule.operator})}
                                    onChange={(value) => this.setRuleProperty(i, "operator", value)}
                                    options={operators}
                                />
                            </Column>
                            <Column style={{ width: 150 }}>
                                <Input
                                    className="input-container--flat"
                                    value={rule.value+""}
                                    placeholder="Value"
                                    onChange={(e) => this.setRuleProperty(i, "value", {value:Utils.getTypedValue(Utils.safeParseEventValue(e))})}
                                />
                            </Column>
                        </Row>
                    </Flex>
                    <div>
                        <Row noWrap>
                            {isLastRule && (
                                <Button onClick={this.addRule} className="btn btn--anchor">
                                    OR
                                </Button>
                            )}

                            <div>
                                <button
                                    id="remove-feature"
                                    onClick={() => this.removeRule(i)}
                                    className={"btn btn--with-icon btn--condensed reveal--child btn--remove"}
                                >
                                    <RemoveIcon/>
                                </button>
                            </div>
                        </Row>
                    </div>
                </Row>
            </div>
        )
    }

    removeRule = (i) => {
        const { props: { rule: { any: { rules } } } } = this;

        if (rules.length === 1) {
            this.props.onRemove()
        } else {
            rules.splice(i, 1)
            this.props.onChange({ any: { rules } });
        }
    }

    setRuleProperty = (i, prop, { value }) => {
        const { props: { rule: { any: { rules } } } } = this;
        rules[i][prop] = value;
        this.props.onChange(this.props.rule)
    }

    addRule = () => {
        const { props: { rule: { any: { rules } } } } = this;

        this.props.onChange({
            any: {
                rules: rules.concat([{...Constants.defaultRule}]
                )
            }
        });
    }

    render() {
        const { props: { rule: { any: { rules } } } } = this;
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
