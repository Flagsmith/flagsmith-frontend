import React, { Component, PropTypes } from 'react';
import lazyframe from 'lazyframe';
import md from './markdown/how-to-use-feature-flags-in-continuous-integration.md';
import 'lazyframe/dist/lazyframe.css';

const ReactMarkdown = require('react-markdown');

const HowToUseFeatureFlags = class extends Component {
    static displayName = 'HowToUseFeatureFlags'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        lazyframe('.lazyframe');
    }

    render() {
        return (
            <div className="app-container blog-post col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">

                <ReactMarkdown className="markdown-content" source={md}/>

            </div>
        );
    }
};

HowToUseFeatureFlags.propTypes = {};

module.exports = HowToUseFeatureFlags;
