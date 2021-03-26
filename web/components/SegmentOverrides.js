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

const SortableItem = SortableElement(({ disabled, value: v, onSortEnd, index, confirmRemove, toggle, setValue }) => (
    <div data-test={`segment-override-${index}`} style={{ zIndex: 9999999999 }} className="panel panel--draggable mb-2">
        <Row className="panel-content" space>
            <div
              style={{ width: 200 }}
              className="text-left"
            >
                <strong>
                    {v.segment.name}
                </strong>
            </div>
            <div className="flex flex-1">
                <Row>
                    <Column className="flex flex-1">
                        <textarea
                          disabled={disabled}
                          value={v.value}
                          data-test={`segment-override-value-${index}`}
                          onChange={e => setValue(Utils.getTypedValue(Utils.safeParseEventValue(e)))}
                          placeholder="Value e.g. 'big' "
                        />
                    </Column>
                    <Column>
                        <div>
                            <Switch
                              disabled={disabled}
                              checked={v.enabled}
                              onChange={toggle}
                            />
                        </div>
                    </Column>

                    {/* Input to adjust order without drag for E2E */}
                    {E2E && (
                    <input
                      data-test={`sort-${index}`}
                      onChange={(e) => {
                          onSortEnd({ oldIndex: index, newIndex: parseInt(Utils.safeParseEventValue(e)) });
                      }}
                      type="text"
                    />
                    )}

                    <button
                      disabled={disabled}
                      id="remove-feature"
                      onClick={confirmRemove}
                      className="btn btn--with-icon"
                    >
                        <RemoveIcon/>
                    </button>
                </Row>
            </div>
        </Row>
    </div>
));

const SortableList = SortableContainer(({ disabled, onSortEnd, items, confirmRemove, toggle, setValue }) => (
    <div>
        {items.map((value, index) => (
            <SortableItem
              onSortEnd={onSortEnd}
              disabled={disabled}
              key={value.segment.name}
              index={index}
              value={value}
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
        const value = (this.props.value || []).map(val => ({ ...val, priority: val.priority }));
        this.setState({ isLoading: true });
        _data.post(`${Project.api}features/feature-segments/`, {
            feature: this.props.feature,
            segment: this.state.selectedSegment.value,
            environment: ProjectStore.getEnvironmentIdFromKey(this.props.environmentId),
            priority: value.length,
        }).then((res) => {
            console.log('Hey');
            return _data.post(`${Project.api}features/featurestates/`, {
                enabled: false,
                feature: this.props.feature,
                environment: ProjectStore.getEnvironmentIdFromKey(this.props.environmentId),
                feature_segment: res.id,
                feature_state_value: {
                    type:"unicode",
                    string_value: 'test',
                },
            });
        }).then((res) => {
            this.props.onChange([res].concat(value).map((v, i) => ({ ...v, priority: i })));
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
            </p>,
            () => {
                _data.delete(`${Project.api}features/feature-segments/${this.props.value[i].id}/`)
                    .then((res) => {
                        this.props.onChange(_.filter(this.props.value, (v, index) => index !== i).map((v, i) => ({
                            ...v,
                            priority: i,
                        })));
                        this.setState({ isLoading: false });
                    });
            },
            () => {
                this.setState({ isLoading: false });
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
                priority: i,
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
                                      '&:hover': { borderColor: '$bt-brand-secondary' },
                                      border: '1px solid $bt-brand-secondary',
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
                                <Column className="text-left" style={{ width: 120 }}>
                                    <label>
                                       Value
                                    </label>
                                </Column>
                            </Row>
                            <div className="mb-4 text-left faint">
                                Prioritise a segment override by dragging it to the top of the list.
                            </div>
                            {value && (
                            <SortableList
                              disabled={isLoading}
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
