/**
 * Created by niall on 27/11/2018.
 */

import React, {Component, PropTypes} from 'react';
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
            <div className={"app-container"}>

                <div className={"container blog-post col-lg-8 offset-lg-2 col-xl-6 offset-xl-3"}>
                    <div className={"clearfix"}>
                        <h1 className="blog-post__title">Using feature flags for client demos and simulating complex scenarios</h1>
                        <p className="blog-post__author">by Kyle Johnson</p>

                        <div className="blog-post__content">

                            <p className="blog-post__text">Since making the jump to developing all of our new production mobile/web apps with <a className="blog-post__link" href="https://bullet-train.io/?utm_source=medium&amp;utm_medium=social" rel="nofollow noopener" target="_blank">Bullet Train</a> for feature flags, one of the latest benefits I’ve come to realise is being able to toggle your app to simulate tedious and complicated scenarios.</p>

                            <h2 className="blog-post__subtitle">The problem: wasting time replicating app scenarios</h2>

                                <p>I know myself a developer have often spent hours replicating issues or developing a new feature that requires the app to be in a certain state. For example, improving onboarding that would require me to signup to my site with around a million Mailinator emails.</p>

                                <p>This pain point is perhaps the main reason we also employ end to end automated tests on the frontend using <a href="http://nightwatchjs.org/" data-href="http://nightwatchjs.org/" rel="nofollow noopener" target="_blank">Nightwatch JS</a>.</p>

                                <h2 className="blog-post__subtitle">The solution: develop your app “simulation first”</h2>
                                <p>Developing new projects with feature flags in mind changed the way I thought about implementing new features. Now, whenever a new feature gets developed I have to make the application flexible enough to behave well with and without it. With Bullet Train I then have a really easy way to simulate that feature being on and off or change the settings.</p>

                                    <img className="blog-post__media__image" src="https://cdn-images-1.medium.com/max/800/0*uyi24dBayoE_LikC.png" />

                                <p>This idea resulted in me questioning, what if I could toggle scenarios rather than just features? Now alongside a feature, I create simulation flags that when enabled, fabricate data and conditions that force my application into a certain state.</p>
                             <img src="https://cdn-images-1.medium.com/max/800/0*hYvTh_XXmZ7V7due.png" className="blog-post__media__image" />

                                <p>Perhaps the biggest gain I saw from this recently was in a client facing meeting, I was able to reel off a number of edge case scenarios and show exactly how the app would react. Previously this process would have been a lot less fluid, being able to quickly demonstrate the scenario meant that the client was able to immediately see and feedback without losing train of thought.</p>
                                <h2 className="blog-post__subtitle">A practical example</h2>

                                <p>Rather than waffle on at a high level about how much I enjoy the idea, here’s an end to end example of how I added the ability to simulate loads of data in one of our more recent projects. This helps us test both UI performance and how it handles UI wrapping onto new lines.</p>

                                <img src="https://cdn-images-1.medium.com/max/800/0*9zSh84aBZwGeL2D2.gif" className="blog-post__media__image" />

                                <p>This GIF shows me changing the value of a “data_multiplier” feature remotely, then when I open my app it will act as if the API gave me x times the number of items.</p>
                                <p>Here’s how I achieved this:</p>

                                <h2 className="blog-post__subtitle">Step 1 — Initialise bullet-train</h2>
                            
                            
                            <p>I created a project at <a className="blog-post__link" href="https://bullet-train.io" target="_blank">https://bullet-train.io</a>, and copied and pasted the JavaScript snippet.</p>

                            <pre className="graf graf--pre graf-after--p">
                                <code className="markup--code markup--pre-code">npm i bullet-train-client --save; //or react-native-bullet-train in my case</code>
                            </pre>



                </div>
                        </div>

                    <div className="read-more">
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

            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;