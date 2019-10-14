import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

let nav;
export default (WrappedComponent) => {
    class HOC extends React.Component {
        static displayName = 'withNavbarInfo';

        constructor(props, context) {
            super(props, context);
            this.state = nav;
        }

        componentWillMount() {
            if (!nav) {
                Navigation.constants().then(({ statusBarHeight, topBarHeight }) => {
                    nav = { statusBarHeight, topBarHeight };
                    this.setState({ nav });
                });
            }
        }

        render() {
            return (
                <WrappedComponent
                  ref={c => this.wrappedComponent = c}
                  {...this.state}
                  {...this.props}
                />
            );
        }
    }

    return HOC;
};
