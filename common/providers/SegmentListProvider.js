import React, {Component, PropTypes} from 'react';
import FeatureListStore from '../stores/segment-list-store';

const TheComponent = class extends Component {
    static displayName = 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {
            isSaving: FeatureListStore.isSaving,
            isLoading: FeatureListStore.isLoading,
            environmentSegments: FeatureListStore.getEnvironmentSegments(),
            projectSegments: FeatureListStore.getProjectSegments(),
        };
        ES6Component(this);
        this.listenTo(FeatureListStore, 'change', () => {
            this.setState({
                isSaving: FeatureListStore.isSaving,
                isLoading: FeatureListStore.isLoading,
                environmentSegments: FeatureListStore.getEnvironmentSegments(),
                projectSegments: FeatureListStore.getProjectSegments(),
            });
        });

        this.listenTo(FeatureListStore, 'saved', () => {
            this.props.onSave && this.props.onSave();
        });

        this.listenTo(FeatureListStore, 'problem', () => {
            this.setState({
                isSaving: FeatureListStore.isSaving,
                isLoading: FeatureListStore.isLoading,
                error: FeatureListStore.error,
            });
            this.props.onError && this.props.onError(FeatureListStore.error);
        });
    }

    toggleSegment = (i, environments) => {
        AppActions.toggleSegment(i, environments);
    };

    setSegment = (i, flag, environments) => {
        AppActions.setSegment(i, flag, environments);
    };

    createSegment = (projectId, environmentId, flag) => {
        AppActions.createSegment(projectId, environmentId, flag);
    };

    editSegment = (projectId, environmentId, flag, projectSegment, environmentSegment) => {
        AppActions.editEnvironmentSegment(projectId, environmentId, flag, projectSegment, environmentSegment);
        if (flag.description != projectSegment.description) {
            AppActions.editSegment(projectId, Object.assign({}, projectSegment, flag))
        }
    };

    removeSegment = (projectId, flag) => {
        AppActions.removeSegment(projectId, flag);
    };


    render() {
        return (
            this.props.children(
                {
                    ...this.state,
                },
                {
                    environmentHasSegment: FeatureListStore.hasSegmentInEnvironment,
                    toggleSegment: this.toggleSegment,
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
