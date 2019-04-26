import propTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class Text extends PureComponent {
    static displayName = 'Text';

    static propTypes = {
        style: propTypes.any,
        children: propTypes.node,
    };

    render() {
        const { props: { style, children } } = this;
        return (
            <ReactNative.Text {...this.props} style={[Styles.text, style]}>{children}</ReactNative.Text>
        );
    }
}