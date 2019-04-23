import React, { Component } from 'react';

const Fade = class extends Component {
    displayName: 'Fade';

    constructor(props, context) {
        super(props, context);
        var props = {};
        _.each(this.props.animatedProps, (prop) => {
            props[`animated_${prop}`] = new Animated.Value(this.props[prop] && !this.props.autostart ? 1 : 0.00001);
        });
        this.state = props;
    }

    componentDidMount() {
        if (this.props.autostart) {
            _.each(this.props.animatedProps, (key) => {
                this.props.animation( // Base: spring, decay, timing
                    this.state[`animated_${key}`], // Animate `bounceValue`
                    {
                        toValue: isNaN(this.props[key]) ? this.props[key] ? 1 : 0 : this.props[key], // Animate to smaller size
                        duration: this.props.duration,
                        friction: this.props.friction,
                        tension: this.props.tension,
                    },
                )
                    .start();
            });
        }
    }

    componentWillReceiveProps(newProps) {
        _.each(newProps.animatedProps, (key) => {
            const easing = newProps.value ? newProps.easing : newProps.easingOut;
            if (newProps[key] != this.props[key]) {
                newProps.animation( // Base: spring, decay, timing
                    this.state[`animated_${key}`], // Animate `bounceValue`
                    {
                        easing,
                        toValue: isNaN(newProps[key]) ? newProps[key] ? 1 : 0.00001 : newProps[key], // Animate to smaller size
                        duration: newProps.duration,
                        friction: newProps.friction,
                        tension: newProps.tension,
                    },
                )
                    .start();
            }
        });
    }

    render() {
        return (
            <Animated.View
              style={[{
                  overflow: 'hidden',
                  opacity: this.state.animated_value,
              }, this.props.style]}
            >
                {this.props.children}
            </Animated.View>
        );
    }
};

Fade.defaultProps = {
    animation: Animated.timing,
    duration: 300,
    friction: 5,
    tension: 20,
    easing: Easing.inOut(Easing.ease),
    easingOut: Easing.linear(Easing.ease),
    animatedProps: ['value'],
};

module.exports = Fade;
