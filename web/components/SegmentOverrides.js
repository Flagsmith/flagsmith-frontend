// import propTypes from 'prop-types';
import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({ value: v, type, confirmRemove, toggle, setValue }) => (
    <div style={{ zIndex: 9999999999 }} className="panel mb-2">
        <Row className="panel-content" space>
            <div
              className="flex flex-1 text-left"
            >
                <strong>
                    {v.segment.name}
                </strong>
            </div>
            <Row>
                <Column>
                    {type === 'FLAG' ? (
                        <Switch
                          checked={v.enabled}
                          onChange={toggle}
                        />
                    ) : (
                        <textarea
                          value={v.value}
                          data-test="featureValue"
                          onChange={e => setValue(Utils.getTypedValue(Utils.safeParseEventValue(e)))}
                          placeholder="Value e.g. 'big' "
                        />
                    )}
                </Column>
                <button
                  id="remove-feature"
                  onClick={confirmRemove}
                  className="btn btn--with-icon"
                >
                    <RemoveIcon/>
                </button>
            </Row>
        </Row>
    </div>
));

const SortableList = SortableContainer(({ items, type, confirmRemove, toggle, setValue }) => (
    <div>
        {items.map((value, index) => (
            <SortableItem
              key={value.segment.name}
              index={index}
              value={value}
              type={type}
              confirmRemove={() => confirmRemove(index)}
              toggle={() => toggle(index)}
              setValue={value => setValue(index, value)}
            />
        ))}
    </div>
));

class TheComponent extends Component {
    static displayName = 'TheComponent';

    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    addItem = () => {
        const value = (this.props.value || []).map(val => ({ ...val, priority: val.priority + 1 }));
        this.props.onChange([{
            segment: this.state.selectedSegment.value,
            enabled: true,
            value: '',
        }].concat(value).map((v, i) => ({ ...v, priority: i + 1 })));
        this.setState({
            selectedSegment: null,
        });
    }

    confirmRemove = (i) => {
        this.props.onChange(_.filter(this.props.value, (v, index) => index !== i).map((v, i) => ({
            ...v,
            priority: i + 1,
        })));
    }

    setValue = (i, value) => {
        this.props.value[i].value = value;
        this.props.onChange(this.props.value);
    }

    toggle = (i) => {
        this.props.value[i].enabled = !this.props.value[i].enabled;
        this.props.onChange(this.props.value);
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.onChange(arrayMove(this.props.value, oldIndex, newIndex)
            .map((v, i) => ({
                ...v,
                priority: i + 1,
            })));
    };

    render() {
        const { props: { value, segments } } = this;
        const segmentOptions = _.filter(
            segments, segment => !value || !_.find(value, v => v.segment === segment.id),
        )
            .map(({ name: label, id: value }) => ({ value, label }));
        return (
            <div>

                <div className="text-center mt-2 mb-2">

                    {segments && (
                        <Flex className="text-left">
                            <Select
                              data-test="select-segment"
                              placeholder="Select a segment"
                              value={this.state.selectedSegment}
                              onChange={selectedSegment => this.setState({ selectedSegment }, this.addItem)}
                              options={
                                    segmentOptions
                                }
                            />
                        </Flex>
                    )}
                    {value && !!value.length && (
                        <div className="panel--grey mt-4 overflow-visible">
                            <Row className="mb-2">
                                <div
                                  className="flex flex-1 text-left"
                                >
                                    <label>Segment</label>
                                </div>
                                {this.props.type === 'FLAG' ? (
                                    <Column className="text-left" style={{ width: 120 }}>
                                        <label>
                                            Enabled
                                        </label>
                                    </Column>
                                ) : (
                                    <Column className="text-left" style={{ width: 260 }}>
                                        <label>
                                            Value
                                        </label>
                                    </Column>
                                )}
                            </Row>
                            {value && (
                            <SortableList
                              type={this.props.type}
                              confirmRemove={this.confirmRemove}
                              toggle={this.toggle}
                              setValue={this.setValue}
                              items={value.map(v => (
                                  {
                                      ...v,
                                      segment: _.find(segments, { id: v.segment }),
                                  }
                              ))}
                              onSortEnd={this.onSortEnd}
                            />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default hot(module)(TheComponent);
