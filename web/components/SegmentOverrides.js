// import propTypes from 'prop-types';
import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import _data from '../../common/data/base/_data';
import ProjectStore from '../../common/stores/project-store';

const arrayMoveMutate = (array, from, to) => {
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const arrayMove = (array, from, to) => {
    array = array.slice();
    arrayMoveMutate(array, from, to);
    return array;
};

const SortableItem = SortableElement(({ disabled, value: v, type, confirmRemove, toggle, setValue }) => (
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
                          disabled={disabled}
                          checked={v.enabled}
                          onChange={toggle}
                        />
                    ) : (
                        <textarea
                          disabled={disabled}
                          value={v.value}
                          data-test="featureValue"
                          onChange={e => setValue(Utils.getTypedValue(Utils.safeParseEventValue(e)))}
                          placeholder="Value e.g. 'big' "
                        />
                    )}
                </Column>
                <button
                  disabled={disabled}
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

const SortableList = SortableContainer(({ disabled, items, type, confirmRemove, toggle, setValue }) => (
    <div>
        {items.map((value, index) => (
            <SortableItem
              disabled={disabled}
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
        AppActions.getSegments(props.projectId, props.environmentId);
    }

    addItem = () => {
        const value = (this.props.value || []).map(val => ({ ...val, priority: val.priority + 1 }));
        this.setState({ isLoading: true });
        _data.post(`${Project.api}features/feature-segments/`, {
            feature: this.props.feature,
            segment: this.state.selectedSegment.value,
            environment: ProjectStore.getEnvironmentIdFromKey(this.props.environmentId),
            priority: value.length + 1,
        }).then((res) => {
            this.props.onChange([res].concat(value).map((v, i) => ({ ...v, priority: i + 1 })));
            this.setState({
                selectedSegment: null,
                isLoading: false,
            });
        });
    }

    confirmRemove = (i) => {
        this.setState({ isLoading: true });
        openConfirm(
            <h3>Delete Segment Override</h3>,
            <p>
                {'Are you sure you want to delete this segment override?'}
                <strong>{name}</strong>
                {'?'}
            </p>,
            () => {
                _data.delete(`${Project.api}features/feature-segments/${this.props.value[i].id}/`)
                    .then((res) => {
                        this.props.onChange(_.filter(this.props.value, (v, index) => index !== i).map((v, i) => ({
                            ...v,
                            priority: i + 1,
                        })));
                        this.setState({ isLoading: false });
                    });
            },
        );
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
        const { state: { isLoading }, props: { value, segments } } = this;
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
                              styles={{
                                  control: base => ({
                                      ...base,
                                      '&:hover': { borderColor: '#2cd6ca' },
                                      border: '1px solid #2cd6ca',
                                  }),
                              }}
                            />
                        </Flex>
                    )}
                    {value && !!value.length && (
                        <div style={isLoading ? { opacity: 0.5 } : null} className="mt-4 overflow-visible">
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
                              disabled={isLoading}
                              type={this.props.type}
                              confirmRemove={this.confirmRemove}
                              toggle={this.toggle}
                              setValue={this.setValue}
                              items={value.map(v => (
                                  {
                                      ...v,
                                      segment: _.find(segments, { id: v.segment }) || {},
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
