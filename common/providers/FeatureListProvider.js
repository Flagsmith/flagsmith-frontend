import React, { Component, PropTypes } from 'react';
import FeatureListStore from '../stores/feature-list-store';

const FeatureListProvider = class extends Component {
    static displayName = 'FeatureListProvider'

    constructor(props, context) {
        super(props, context);
        this.state = {
            isSaving: FeatureListStore.isSaving,
            isLoading: FeatureListStore.isLoading,
            environmentFlags: FeatureListStore.getEnvironmentFlags(),
            projectFlags: FeatureListStore.getProjectFlags(),
            lastSaved: FeatureListStore.getLastSaved(),
        };
        ES6Component(this);
        this.listenTo(FeatureListStore, 'change', () => {
            this.setState({
                isSaving: FeatureListStore.isSaving,
                isLoading: FeatureListStore.isLoading,
                environmentFlags: FeatureListStore.getEnvironmentFlags(),
                lastSaved: FeatureListStore.getLastSaved(),
                projectFlags: FeatureListStore.getProjectFlags(),
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
                lastSaved: FeatureListStore.getLastSaved(),
            });
            this.props.onError && this.props.onError(FeatureListStore.error);
        });
    }

    toggleFlag = (i, environments) => {
        AppActions.toggleFlag(i, environments);
    };

    setFlag = (i, flag, environments) => {
        AppActions.setFlag(i, flag, environments);
    };

    createFlag = (projectId, environmentId, flag,projectFlag, environmentFlag, segmentOverrides) => {
        AppActions.createFlag(projectId, environmentId, flag, segmentOverrides);
    };

    editFlag = (projectId, environmentId, flag, projectFlag, environmentFlag, segmentOverrides) => {
        AppActions.editEnvironmentFlag(projectId, environmentId, flag, projectFlag, environmentFlag, segmentOverrides);
        if (flag.description != projectFlag.description) {
            AppActions.editFlag(projectId, Object.assign({}, projectFlag, flag));
        }
    };

    removeFlag = (projectId, flag) => {
        AppActions.removeFlag(projectId, flag);
    };


    render() {
        return (
            this.props.children(
                {
                    ...this.state,
                },
                {
                    environmentHasFlag: FeatureListStore.hasFlagInEnvironment,
                    toggleFlag: this.toggleFlag,
                    setFlag: this.setFlag,
                    createFlag: this.createFlag,
                    editFlag: this.editFlag,
                    removeFlag: this.removeFlag,
                },
            )
        );
    }
};

FeatureListProvider.propTypes = {};

module.exports = FeatureListProvider;
