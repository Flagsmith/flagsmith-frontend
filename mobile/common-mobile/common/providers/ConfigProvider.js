import React, {Component, PropTypes} from 'react';
import ConfigStore from "../stores/config-store";
import bulletTrain from 'bullet-train-client';
module.exports = (WrappedComponent) => {
    class HOC extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isLoading: ConfigStore.isLoading,
            };
            ES6Component(this);

        }

        componentWillMount() {
            this.listenTo(ConfigStore, 'change', () => {
                this.setState({
                    isLoading: ConfigStore.isLoading,
                });
            });
        }

        render() {
            const {isLoading} = this.state;
            const {getValue,hasFeature} = bulletTrain;

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

