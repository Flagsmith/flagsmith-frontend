/**
 * Created by andrewmoffatt on 23/10/2018.
 */
import React, {Component, PropTypes} from 'react';

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

    render() {
        return (
            <div className={"app-container"}>

                    <div className={"container blog-post col-md-8 offset-md-2"}>
                        <div className={"clearfix"}>
                            <h1 className="blog-post__title">When feature flags go wrong</h1>
                            <p className="blog-post__author">by Kyle Johnson</p>

                            <div className="blog-post__content">
                                <div className="float-left blog-post__media">
                                    <img src={"/images/jumping.jpeg"} alt="Me jumping on the dried tears of failure" className="blog-post__media__image"/>
                                    <caption className="full-width blog-post__media__caption">Me jumping on the dried tears of failure</caption>
                                </div>
                                <p className="blog-post__text">Most people don’t like to write about their code disasters which is a shame because upon the salt flats of their dried lake of tears, we can all mine the lithium of Valuable Lessons For The Future.</p>
                                <p className="blog-post__text">So we scoured Youtube for the best videos on absolute disasters caused by feature flags.</p>
                                <h2 className="blog-post__subtitle">Disaster One</h2>
                                <p className="blog-post__text">We found this one thanks to Andy Davies’ wonderful talk. You can find him <a href="https://twitter.com/Pondidum?lang=en" className="blog-post__link">on Twitter here</a>, or watch his speech in full below.</p>
                                <p className="blog-post__text">He gives us the sorry tale of the the market trading company Knight Capital. Knight Capital were happily and innocently testing in QA their new feature for making rapid automated trades, doing everything by the book, it all worked, and now they knew they were ready to deploy to production.</p>
                                <p className="blog-post__text">Except.</p>
                                <p className="blog-post__text">They had already had a feature toggle to do these trades before. 8 years before. And when they deployed to their servers, one of those servers did not have the toggle for the new feature, but instead of just not doing anything, the server used the old feature flag. It therefore started making as many trades as fast as it possibly could, without limit.</p>
                                <p className="blog-post__text">Long story short, rolling back didn’t work, so they solved the problem by switching off the feature toggle. They then presumably sat in their office in sickened silence for a bit. Because, the impact of those rapidly made automated trades was very very bad.</p>
                                <p className="blog-post__text">In the 45 minutes that it took to halt the rogue element, they lost nearly half a billion dollars.</p>
                                <p className="blog-post__text">Knight Capital’s Wikipedia is now written in the past tense.</p>
                                <p className="blog-post__text">For the rest of the valuable lessons to be learned, watch Andy’s video to hear him explain why you need his three golden rules to avoid the same catastrophe.</p>
                                <ul className="list-unstyled blog-post__list">
                                    <li className=" blog-post__list__item">Rule 1: never reuse a feature toggle.</li>
                                    <li className=" blog-post__list__item">Rule 2: feature toggles should have a short life span</li>
                                    <li className=" blog-post__list__item">Rule 3: name it something sensible for crying out loud.</li>
                                </ul>
                                <div className="blog-post__video">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/r7VI5x2XKXw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                </div>
                                <p>Andy also gives us some examples of feature toggles done well, he’s a proponent of trunk-based delivery, he takes us through the four types of toggles (compile toggles, startup toggles for microservices, periodic toggles, and activity toggles) and accidentally invents the word “contrologging”, controlling with toggles, which should totally be a thing.</p>
                                <h2 className="blog-post__subtitle">Disaster Two</h2>
                                <p className="blog-post__text">Edith Harbaugh presents this next video.</p>
                                <div className="blog-post__video">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/28ZAoStv-Xw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                </div>
                            </div>

                            <p className="blog-post__text">Edith is a firm believer in feature flags, and she also lists good use cases for them, including uses such as kill switches. Intriguingly she also includes an example of feature flags used for customer experience and marketing purposes:</p>
                            <p className="blog-post__text">The example is to do with early releases, some people really like getting early access to things and feature flags can facilitate that, meaning you’re able to control those early releases for PR purposes, premium clients or brand fans — a really powerful thing to do. And vice versa, some people hate getting early releases, like B2B software users who are used to what the tool is right now and hate changes. Feature flags mean they don’t get those new changes until they’re cast iron and as bug free as Dettol.</p>
                            <p className="blog-post__text">Edith also mentions Knight Capital, but she also has another valuable example of feature flags gone rogue for us.</p>
                            <p className="blog-post__text">This company remains nameless and their error didn’t kill their company. Still, it’s a Looney Toons farce that your company could do without.</p>
                            <div className="float-left blog-post__media blog-post__media--padded">
                                <img src="https://media.giphy.com/media/5hbbUaJHKId23nE51B/giphy.gif" alt="Me jumping on the dried tears of failure" className="blog-post__media__image"/>
                                <caption className="full-width blog-post__media__caption">A poorly managed feature toggle ^</caption>
                            </div>
                            <p className="blog-post__text">These guys didn’t properly look after their old feature flags either. But we’re focusing on another mistake too: they gave access to almost everybody, even non-devs.</p>
                            <p className="blog-post__text">In the business context, it made sense, but still. Humans were involved where they shouldn’t be.</p>
                            <p className="blog-post__text">The problem came home to roost when one day the company realised that no one could upload a file to the CMS. This escalated quickly to the CEO who was getting bombarded with angry phone calls from customers.</p>
                            <p className="blog-post__text">Three hours later they discovered the issue was caused by an old feature flag which had been turned off, be it through fat fingers or obtuseness. The feature flag had been designed to throttle traffic which is an admirable reason for a feature flag, but now it was crippling the whole product.</p>
                            <p className="blog-post__text">The immediate solution was simple. They switched the feature flag back on, and everything worked again.</p>
                            <p className="blog-post__text">But what horrifies me is that as Edith says in the video, the company didn’t then actually take further action. “We didn’t really know what it did so we left it there.” Oof.</p>
                            <p className="blog-post__text">Ok fine, at least they made sure only those qualified to touch it were able to access it?</p>
                            <p className="blog-post__text">Nope.</p>
                            <p className="blog-post__text">They left it unsecured and open to basically any employee. Instead they just put a label on it, which said “do not ever touch this button.”</p>
                            <p className="blog-post__text">6 months later someone touched the button.</p>
                            <p className="blog-post__text">The last we hear about this company is that they still haven’t limited access or removed the old feature flag. Yes, the “do not touch touch” label is still there, but it’s now “DO NOT EVER TOUCH THIS BUTTON”.</p>
                            <div className="float-left blog-post__media blog-post__media--padded">
                                <img src="https://media.giphy.com/media/naxep4vNBAOL6/giphy.gif" alt="Me jumping on the dried tears of failure" className="blog-post__media__image"/>
                                <caption className="full-width blog-post__media__caption">DO NOT TOUCH THE BUTTON</caption>
                            </div>
                            <p className="blog-post__text">And for all we know, it’s working. But, maybe, don’t do that in your company…</p>
                            <p className="blog-post__text">And, if you know any more feature flag disasters, or best use cases, send them my way. We’re obsessed with feature flags because that’s why we built Bullet Train in the first place.</p>
                            <p className="blog-post__text">Also, more feature flag content coming up, and continuous integration stuff, for more info on all of that, visit our content here.</p>
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