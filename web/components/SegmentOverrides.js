// import propTypes from 'prop-types';
import React, { Component } from 'react';

class TheComponent extends Component {
    static displayName = 'TheComponent';

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    addItem = () => {
        const value = (this.props.value || []).map((val) => ({ ...val, priority: val.priority + 1 }));
        this.props.onChange([{
            segment: { name: this.state.selectedSegment.label, id: this.state.selectedSegment.value },
            enabled: true,
            value: ""
        }].concat(value).map((v, i) => ({ ...v, priority: i + 1 })));
        this.setState({
            selectedSegment: null
        });
    }

    confirmRemove = (i) => {
        openConfirm(<h3>Remove segment override</h3>, <p>Are you sure you want to remove this item?</p>, () => {
            this.props.onChange(_.filter(this.props.value, (v, index) => index !== i).map((v, i) => ({
                ...v,
                priority: i + 1
            })))
        });
    }

    setValue = (i, value) => {
        this.props.value[i].value = value
        this.props.onChange(this.props.value);

    }

    toggle = (i) => {
        this.props.value[i].enabled = !this.props.value[i].enabled
        this.props.onChange(this.props.value);
    }

    render() {
        const { props: { value, segments } } = this;
        const segmentOptions = _.filter(
            segments, (segment) => {
                return !value || !_.find(value, (v) => v.segment.id === segment.id)
            })
            .map(({ name: label, id: value }) => ({ value, label }));
        return (
            <div>

                <div className="text-center mt-2 mb-2">

                    {segments && (
                        <Row>
                            <Flex>
                                <Select
                                    data-test="select-segment"
                                    placeholder="Select a segment"
                                    value={this.state.selectedSegment}
                                    onChange={selectedSegment => this.setState({ selectedSegment })}
                                    options={
                                        segmentOptions
                                    }
                                />
                            </Flex>
                            <Column>
                                <button
                                    disabled={!this.state.selectedSegment}
                                    onClick={this.addItem} data-test="add-rule" type="button"
                                    className="btn btn-primary btn"
                                >
                                    Add Segment override
                                </button>
                            </Column>
                        </Row>
                    )}

                    <div className="panel--grey mt-4 overflow-visible">
                        {value && value.map((v, i) => (
                            <div className="panel mb-2">
                                <Row className="panel-content" key={i} space>
                                    <div
                                        className="flex flex-1 text-left"
                                    >
                                        <strong>
                                            {v.segment.name}
                                        </strong>
                                    </div>
                                    <Row>
                                        <Column>
                                            {this.props.type == 'FLAG' ? (
                                                <Switch
                                                    checked={v.enabled}
                                                    onChange={() => this.toggle(i)}
                                                />
                                            ) : (
                                                <textarea
                                                    value={v.value}
                                                    data-test="featureValue"
                                                    onChange={e => this.setValue(i, Utils.getTypedValue(Utils.safeParseEventValue(e)))}
                                                    placeholder="Value e.g. 'big' "
                                                />
                                            )}
                                        </Column>
                                        <Column>
                                            <button
                                                id="remove-feature"
                                                onClick={() => this.confirmRemove(i)}
                                                className="btn btn--with-icon"
                                            >
                                                <RemoveIcon/>
                                            </button>
                                        </Column>
                                    </Row>
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(TheComponent);

