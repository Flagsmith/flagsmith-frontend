import React, {Component, PropTypes} from 'react';
const ReactMarkdown = require('react-markdown')
import md from './markdown/using-feature-flags-for-client-demos-and-simulating-complex-scenarios.md';
import lazyframe from 'lazyframe';
import 'lazyframe/dist/lazyframe.css';

const SimulateScenarios = class extends Component {
    displayName: 'SimulateScenarios'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        lazyframe('.lazyframe');
    }

    render() {
        return (
            <div className={"app-container blog-post col-lg-8 offset-lg-2 col-xl-6 offset-xl-3"}>

                <ReactMarkdown className={"markdown-content"} source={md}/>

            </div>
        );
    }
};

SimulateScenarios.propTypes = {};

module.exports = SimulateScenarios;
