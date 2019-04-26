/**
 * Created by kylejohnson on 09/01/2016.
 * __deprecated__, copy existing logic to components you wish to animate
 */
module.exports = {
    getDefaultProps() {
        return {
            animation: Animated.timing,
            duration: 300,
            friction: 5,
            tension: 20,
            easing: Easing.inOut(Easing.ease),
            easingOut: Easing.linear(Easing.ease),
            animatedProps: ['value'],
        };
    },
    getInitialState() {
        const props = {};
        _.each(this.props.animatedProps, (prop) => {
            props[`animated_${prop}`] = new Animated.Value(this.props[prop] && !this.props.autostart ? 1 : 0);
        });
        return props;
    },
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
                ).start();
            });
        }
    },
    componentWillReceiveProps(newProps) {
        _.each(newProps.animatedProps, (key) => {
            const easing = newProps.value ? newProps.easing : newProps.easingOut;
            if (newProps[key] != this.props[key]) {
                newProps.animation( // Base: spring, decay, timing
                    this.state[`animated_${key}`], // Animate `bounceValue`
                    {
                        easing,
                        toValue: isNaN(newProps[key]) ? newProps[key] ? 1 : 0 : newProps[key], // Animate to smaller size
                        duration: newProps.duration,
                        friction: newProps.friction,
                        tension: newProps.tension,
                    },
                ).start();
            }
        });
    },
};
