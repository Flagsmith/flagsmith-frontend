/**
 * Created by niall on 27/11/2018.
 */

import React, {Component, PropTypes} from 'react';
const ReactMarkdown = require('react-markdown')
import md from './markdown/hacking-our-e2e-tests-to-make-them-more-useful.md';
import lazyframe from 'lazyframe';
import 'lazyframe/dist/lazyframe.css';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            //>=, not <=
            if (scroll >= 60) {
                //clearHeader, not clearheader - caps H
                $(".navbar").addClass("light-header");

            } else if (scroll <= 60){
                $(".navbar").removeClass("light-header");
            }
        });
    }

    componentDidMount() {
        lazyframe('.lazyframe');
    }

    render() {
        return (
            <div className={"app-container blog-post col-lg-8 offset-lg-2 col-xl-6 offset-xl-3"}>

                <ReactMarkdown className={"markdown-content"} source={md}/>

                <div className="container read-more">
                    <hr/>
                    <h4 className="text-center read-more__title">More articles from us</h4>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="panel panel-default blog-summary">
                                <div>
                                    <img className="blog-summary__image" src="http://placehold.it/100x50"/>
                                </div>
                                <div className="panel-footer blog-summary__footer">
                                    <p className="text-small muted">Other posts like this</p>
                                    <h5>When feature flags go wrong</h5>
                                    <p className="text-small">by Kyle Johnson</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="panel panel-default blog-summary">
                                <div>
                                    <img className="blog-summary__image" src="http://placehold.it/100x50"/>
                                </div>
                                <div className="panel-footer blog-summary__footer">
                                    <p className="text-small muted">Other posts like this</p>
                                    <h5>When feature flags go wrong</h5>
                                    <p className="text-small">by Kyle Johnson</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="panel panel-default blog-summary">
                                <div>
                                    <img className="blog-summary__image" src="http://placehold.it/100x50"/>
                                </div>
                                <div className="panel-footer blog-summary__footer">
                                    <p className="text-small muted">Other posts like this</p>
                                    <h5>When feature flags go wrong</h5>
                                    <p className="text-small">by Kyle Johnson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;