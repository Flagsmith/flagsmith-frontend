import React, { Component } from 'react';

const json = require('./checkbox.json');

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.animatedValue = new Animated.Value(this.props.value ? 0.5 : 0);
    }

    componentWillUpdate(newProps) {
        if (newProps.value !== this.props.value) {
            Animated.timing(this.animatedValue, {
                toValue: newProps.value ? 0.5 : 0,
                duration: 700,
                easing: newProps.value ? Easing.linear : Easing.out(Easing.cubic),
            }).start();
        }
    }

    render() {
        return (
            <Animation
              progress={this.animatedValue}
              ref="animation" style={styles.checkbox}
              source={json}
            />
        );
    }
};

TheComponent.propTypes = {};
var styles = StyleSheet.create({
    checkbox: { width: 54, height: 54 },
});
module.exports = TheComponent;