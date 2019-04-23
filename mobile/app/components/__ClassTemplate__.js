import propTypes from 'prop-types';
import React, { Component } from 'react';

const TheComponent = class extends Component {
    static displayName = 'TheComponent';

    static propTypes = {};


    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
    }

    render() {
        // const { props: {  }, state: {  } } = this;
        return (
            <View/>
        );
    }
};


export default TheComponent;

// eslint-disable-next-line
var styles = StyleSheet.create({

});