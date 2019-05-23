import React, { Component } from 'react';
import propTypes from 'prop-types';

const Delay = class extends Component {

    static displayName = 'Delay';

    static propTypes = {
        children: propTypes.node,
        delay: propTypes.number,
    };

    static defaultProps = {
        delay: 500,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.timeout = setTimeout(() => this.setState({ ready: true }), props.delay);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return this.props.children[this.state.ready ? 1 : 0];
    }
};


module.exports = Delay;
