import React, {Component, PropTypes} from 'react';
const ReactMarkdown = require('react-markdown')
import md from './markdown/how-to-use-feature-flags-in-continuous-integration.md';
import lazyframe from 'lazyframe';
import 'lazyframe/dist/lazyframe.css';

const HowToUseFeatureFlags = class extends Component {
    displayName: 'HowToUseFeatureFlags'

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

HowToUseFeatureFlags.propTypes = {};

module.exports = HowToUseFeatureFlags;
