/**
 * Created by niall on 27/11/2018.
 */
import React, {Component, PropTypes} from 'react';
const ReactMarkdown = require('react-markdown')
import md from './markdown/7-reasons-for-devs-to-use-feature-flags-as-a-growth-hack.md';
import lazyframe from 'lazyframe';
import 'lazyframe/dist/lazyframe.css';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

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

TheComponent.propTypes = {};

module.exports = TheComponent;
