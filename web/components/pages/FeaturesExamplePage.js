/**
 * Created by niallquinn on 28/05/2019.
 */

import React, { Component } from 'react';
import anime from 'animejs';
import FeatureFlagsHero from '../animations/FeatureFlagsHero';
import FeatureFlagsAnimation from '../animations/FeatureFlagsAnimation';
import RemoteConfigAnimation from '../animations/RemoteConfigAnimation';
import UserTraitsAnimation from '../animations/UserTraitsAnimation';

export default class FeaturessExampleView extends Component {
    static displayName = 'FeaturesExamplePage'

    componentDidMount() {
        const logEl = document.querySelector('#increment-numbers');

        const battery = {
            height: '2em',
        };

        anime({
            targets: battery,
            height: '20em',
            round: 1,
            easing: 'easeInOutCubic',
            loop: true,
            direction: 'alternate',
            duration: 4000,
            update() {
                logEl.innerHTML = JSON.stringify(battery);
            },
        });
    }

    render() {
        const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : '';
        return (
            <div className="features-page">
                <div className="hero hero--features-page ">
                    <div>
                        <div className="row" style={{ width: '100%', margin: 0, marginRight: 0 }}>
                            <div className="col-md-4 offset-md-1 col-sm-12 mt-5 features-cta">
                                <h1 className="mt-5">Bullet Train features</h1>
                                <p className="">
                                    Bullet Train lets you manage feature flags and remote config across web, mobile and
                                    server side applications. Learn how to use each feature to make your life easier.
                                </p>
                            </div>
                            <div className="col-sm-6 offset-sm-1 col-xs-4 animation-container pr-0 hidden-sm-down">
                                <FeatureFlagsHero/>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="section--blue pb-5">
                    <div className="container-fluid">
                        <div className="container mb-4">
                            <div className="col-lg-10 offset-lg-1">
                                <h2 className="text-center mb-4">Feature Flags</h2>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <ion className="homepage-icon icon--green ion-md-done-all text-center"/>
                                        <p>Hide new features behind Feature Flags that are managed within Bullet Train.</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <ion className="homepage-icon icon--green ion-md-done-all text-center"/>
                                        <p>Continuously deploy new code. Separate code deployments from feature releases.</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <ion className="homepage-icon icon--green ion-md-done-all text-center"/>
                                        <p>Roll new features out to a subset of your users before enabling it for everyone.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-md-3 offset-md-2 align-self-center">
                                <div className="card card--navy card--code">
                                    <div className="card-body">
                                        <p className="code">
                                            <span className="code code--green">if </span>
(bulletTrain.hasFeature(
                                            <span className="code code--red">“show_coupons”</span>
))
                                            {' '}
                                            {'{'}
                                        </p>
                                        <p className="code">showCoupons();</p>
                                        <p className="code">
                                            {' '}
                                            {'}'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <FeatureFlagsAnimation/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section--white mt-5 mb-5">
                    <div className="container-fluid mb-4">
                        <div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 text-center mb-5">
                            <h2 className="mb-4">Remote Config</h2>
                            <div className="col-lg-8 offset-lg-2">
                                <p>Features dont have to be Yes/No boolean values. You can specify String or Int values and overide them whenever you like.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 offset-md-2 align-self-center">
                                <div className="card card--navy card--code">
                                    <div className="card-body">
                                        <p className="code">// Increase header size</p>
                                        <pre className="battery-log" id="increment-numbers"><span className="code code--green">height:2em</span></pre>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <RemoteConfigAnimation/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section--blue mt-5">
                    <div className="container">
                        <div className="row pt-5 pb-5">
                            <div className="col-md-4">
                                <h2 className="mb-4">User Traits</h2>
                                <p>Store traits against your users without modifying your back-end.</p>
                            </div>
                            <div className="col-md-1 offset-md-2 hidden-sm-down">
                                <img src="/images/features-page/user-traits-steps.svg" alt="User Traits" className="img-fluid"/>
                            </div>
                            <div className="col-md-5">
                                <div className="card card--navy card--code">
                                    <div className="card-body">
                                        <p className="code">// User traits</p>
                                        <pre>
                                            <span className="code code--green">
                                        bulletTrain.identify("user_12601"});
                                            </span>
                                        </pre>
                                        <pre>
                                            <span className="code code--green">
                                            if (!bulletTrain.getTrait("accepted_cookies"))
                                                <br/>
&nbsp;&nbsp;&nbsp; showCookieBanner()
                                            </span>
                                        </pre>
                                    </div>
                                </div>
                                <UserTraitsAnimation/>
                                <div className="card card--navy card--code mt-5">
                                    <div className="card-body">
                                        <p className="code">// Example SDK output</p>
                                        <pre className="battery-log" id="increment-numbers">
                                            {'{'}
                                                "trait_key":"accepted_cookies",
                                            <br/>
                                                "trait_value":
                                            <span className="code code--green">True</span>
                                            {'}'}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>


            </div>

        );
    }
}
