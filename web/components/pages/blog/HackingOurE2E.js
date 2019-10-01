/**
 * Created by niall on 27/11/2018.
 */

import React, { Component } from 'react';
import lazyframe from 'lazyframe';
import md from './markdown/hacking-our-e2e-tests-to-make-them-more-useful.md';
import 'lazyframe/dist/lazyframe.css';

const ReactMarkdown = require('react-markdown');

const HackingOurE2E = class extends Component {
    static displayName = 'HackingOurE2E'

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

HackingOurE2E.propTypes = {};

module.exports = HackingOurE2E;
