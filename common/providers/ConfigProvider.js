import React, { Component } from 'react';
import bulletTrain from 'bullet-train-client';
import ConfigStore from '../stores/config-store';

module.exports = (WrappedComponent) => {
    class HOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: ConfigStore.isLoading,
            };
            ES6Component(this);
        }

        componentDidMount() {
            this.listenTo(ConfigStore, 'change', () => {
                this.setState({
                    isLoading: ConfigStore.isLoading,
                });
            });
        }

        render() {
            const { isLoading } = this.state;
            const { getValue, hasFeature } = bulletTrain;

            return (
                <WrappedComponent
                  ref="wrappedComponent"
                  isLoading={isLoading}
                  getValue={getValue}
                  hasFeature={hasFeature}
                  {...this.props}
                />
            );
        }
    }

    return HOC;
};
