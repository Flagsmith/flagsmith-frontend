/**
 * Created by niall on 27/11/2018.
 */
import React, {Component, PropTypes} from 'react';
const ReactMarkdown = require('react-markdown')
import md from './markdown/7-reasons-for-devs-to-use-feature-flags-as-a-growth-hack.md';
import lazyframe from 'lazyframe';
import 'lazyframe/dist/lazyframe.css';

const SevenReasons = class extends Component {
    displayName: 'SevenReasons'

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

SevenReasons.propTypes = {};

module.exports = SevenReasons;
