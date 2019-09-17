import React, { Component, PropTypes } from 'react';
import IdentitySegmentsStore from '../stores/identity-segments-store';

const IdentitySegmentsProvider = class extends Component {
    static displayName = 'IdentitySegmentsProvider'

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: IdentitySegmentsStore.isLoading,
            segments: IdentitySegmentsStore.model,
        };
        ES6Component(this);
    }

    componentWillMount() {
        this.listenTo(IdentitySegmentsStore, 'change', () => {
            this.setState({
                isLoading: IdentitySegmentsStore.isLoading,
                segments: IdentitySegmentsStore.model,
            });
        });
    }

    render() {
        return (
            this.props.children({ ...this.state }, { })
        );
    }
};

IdentitySegmentsProvider.propTypes = {};

module.exports = IdentitySegmentsProvider;
