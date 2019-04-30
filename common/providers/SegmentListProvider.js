import React, {Component, PropTypes} from 'react';
import SegmentListStore from '../stores/segment-list-store';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {
            isSaving: SegmentListStore.isSaving,
            isLoading: SegmentListStore.isLoading,
            environmentSegments: SegmentListStore.getEnvironmentSegments(),
            projectSegments: SegmentListStore.getProjectSegments(),
        };
        ES6Component(this);
        this.listenTo(SegmentListStore, 'change', () => {
            this.setState({
                isSaving: SegmentListStore.isSaving,
                isLoading: SegmentListStore.isLoading,
                environmentSegments: SegmentListStore.getEnvironmentSegments(),
                projectSegments: SegmentListStore.getProjectSegments(),
            });
        });

        this.listenTo(SegmentListStore, 'saved', () => {
            this.props.onSave && this.props.onSave();
        });

        this.listenTo(SegmentListStore, 'problem', () => {
            this.setState({
                isSaving: SegmentListStore.isSaving,
                isLoading: SegmentListStore.isLoading,
                error: SegmentListStore.error,
            });
            this.props.onError && this.props.onError(SegmentListStore.error);
        });
    }

    setSegment = (i, segment, environments) => {
        AppActions.setSegment(i, segment, environments);
    };

    createSegment = (projectId, environmentId, segment) => {
        AppActions.createSegment(projectId, environmentId, segment);
    };

    editSegment = (projectId, environmentId, segment, projectSegment, environmentSegment) => {
        AppActions.editEnvironmentSegment(projectId, environmentId, segment, projectSegment, environmentSegment);
        if (segment.description != projectSegment.description) {
            AppActions.editSegment(projectId, Object.assign({}, projectSegment, segment))
        }
    };

    removeSegment = (projectId, segment) => {
        AppActions.removeSegment(projectId, segment);
    };


    render() {
        return (
            this.props.children(
                {
                    ...this.state,
                },
                {
                    setSegment: this.setSegment,
                    createSegment: this.createSegment,
                    editSegment: this.editSegment,
                    removeSegment: this.removeSegment,
                }
            )
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
