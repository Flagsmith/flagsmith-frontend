/**
 * Created by niallquinn on 28/05/2019.
 */

import React, { Component } from 'react';
import Hero from '../Hero';

export default class SegmentsExampleView extends Component {
    static displayName = 'SegmentsExamplePage'

    render() {
        const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : '';
        return (
            <div className="features-page">
                <div className="hero hero--features-page ">
                    <div className="container-fluid">
                        <div className="row" style={{width: '100%'}}>
                            <div className="col-sm-4 offset-sm-1 col-xs-8 mt-5 features-cta">
                                <h1 className="mt-5">Bullet Train features</h1>
                                <p className="">
                                    Bullet Train lets you manage feature flags and remote config across web, mobile and server side applications. Learn how to use each feature to make your life easier.
                                </p>
                            </div>
                            <div className="col-sm-6 offset-sm-1 col-xs-4">

                                {/*<svg width={648} height={495} className="hero-illustration">*/}
                                    {/*<title>{'train-track-feature-flags copy'}</title>*/}
                                    {/*<defs>*/}
                                        {/*<radialGradient*/}
                                            {/*cx="50%"*/}
                                            {/*cy="53.845%"*/}
                                            {/*fx="50%"*/}
                                            {/*fy="53.845%"*/}
                                            {/*r="63.769%"*/}
                                            {/*gradientTransform="matrix(-.76376 0 0 -1 .882 1.077)"*/}
                                            {/*id="prefix__a"*/}
                                        {/*>*/}
                                            {/*<stop stopColor="#476581" offset="0%" />*/}
                                            {/*<stop stopColor="#22354A" offset="100%" />*/}
                                        {/*</radialGradient>*/}
                                    {/*</defs>*/}
                                    {/*<g fill="none" fillRule="evenodd">*/}
                                        {/*<path fill="url(#prefix__a)" d="M0 0h648.15v495.03H0z" />*/}
                                        {/*<g*/}
                                            {/*stroke="#314C6A"*/}
                                            {/*strokeLinecap="square"*/}
                                            {/*strokeLinejoin="round"*/}
                                            {/*strokeWidth={7.047}*/}
                                        {/*>*/}
                                            {/*<path d="M192.03 493.29v-80.16h133.894V266.905h280.118V38.76h-443.08l-96.016 96.015v296.855l61.662 61.661z" />*/}
                                            {/*<path d="M365.563 493.29l55.055-55.055v-271.31h109.228v103.063l75.756 75.755V493.29" />*/}
                                            {/*<path d="M142.261 493.29V364.682l149.75-149.749h29.949l61.661-61.22h262.5" />*/}
                                            {/*<path d="M646.122 431.629h-80.16l-200.399-200.4V66.948H292.01l-75.755 75.755H142.26L66.506 66.947V0" />*/}
                                        {/*</g>*/}
                                        {/*<path*/}
                                            {/*d="M626.4 78.3H347.045a25 25 0 0 0-17.677 7.322l-74.093 74.093a25 25 0 0 0-7.322 17.684l.01 43.039a25 25 0 0 0 7.323 17.67l69.922 69.923a25 25 0 0 0 17.678 7.322h44.033a25 25 0 0 1 17.678 7.323l34.684 34.684a25 25 0 0 1 7.323 17.678V493.29"*/}
                                            {/*stroke="#22354A"*/}
                                            {/*strokeWidth={7.928}*/}
                                            {/*strokeLinecap="square"*/}
                                            {/*strokeLinejoin="round"*/}
                                        {/*/>*/}
                                        {/*<path*/}
                                            {/*d="M0 285.404l72.397-72.397a25 25 0 0 1 17.678-7.323h83.673a25 25 0 0 1 17.677 7.323l10.46 10.46a25 25 0 0 0 17.678 7.322h18.08a25 25 0 0 0 17.64-7.284l88.43-88.053a25 25 0 0 1 17.64-7.285h89.222a24.98 24.98 0 0 0 17.39-7.047 24.98 24.98 0 0 1 17.39-7.047h76.858a25 25 0 0 0 17.678-7.322L686.642 0"*/}
                                            {/*stroke="#22354A"*/}
                                            {/*strokeWidth={7.928}*/}
                                            {/*strokeLinecap="square"*/}
                                            {/*strokeLinejoin="round"*/}
                                        {/*/>*/}
                                    {/*</g>*/}
                                {/*</svg>*/}

                                {/*<div className="square blue"></div>*/}
                                {/*<div className="square red"></div>*/}

                                <img src="/images/train-track-feature-flags-sideview.svg" className="hero-illustration hidden-sm-down" />
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <div className="container app-container text-center mb-4">
                        <div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                            <h2>Feature Flags</h2>
                            <p>Ship features remotely across multiple environments.</p>
                        </div>
                        <img src="/images/features-example.svg" className="img-fluid" />
                    </div>
                </section>

                <section className="section--blue pt-5 pb-5">
                    <div className="container">
                        <div className="row d-flex">
                            <div className="col-md-6 align-self-center">
                                <h2>User Traits</h2>
                                <p>Store traits against your users without modifying your back-end.</p>
                            </div>
                            <div className="col-md-6">
                                <img src="/images/user-traits-screenshot.png" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row d-flex">
                            <div className="col-md-6">
                                <img src="/images/remote-config-screenshot.png" className="img-fluid" />
                            </div>
                            <div className="col-md-6 align-self-center">
                                <h2>Remote Config</h2>
                                <p>Change the behaviour, appearance and config of your app here without needing to build.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container app-container text-center mb-4">
                    <div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                        <h2>Segments</h2>
                        <p>Create detailed user segments for feature targeting.</p>
                    </div>
                </div>


                <div className="container">
                    <div className="row user-stats mt-3 mb-5">
                        <div className="col-md-2 col-xs-12">
                            <h4>User Traits</h4>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">102</p>
                            <p>Page Views</p>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">12</p>
                            <p>Log ins</p>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">826</p>
                            <p>Seconds on page</p>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">2</p>
                            <p>Submitted form</p>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">33</p>
                            <p>Years old</p>
                        </div>
                    </div>
                </div>

                <div className="container mb-5">
                    <div className="row">
                        <div className="col-md-6 segments-form-example pr-3 pl-3">
                            <FormGroup className="pb-3 pt-5">
                                <Input
                                    inputProps={{
                                        name: 'Age',
                                        className: 'full-width',
                                    }}
                                    className="input-default full-width"
                                    placeholder="Age"
                                    type="number"
                                    name="firstName" id="firstName"
                                />
                            </FormGroup>

                            <FormGroup className="pb-3">
                                <Input
                                    inputProps={{
                                        name: 'Location',
                                        className: 'full-width',
                                    }}
                                    className="input-default full-width"
                                    placeholder="Location"
                                    type="number"
                                    name="firstName" id="firstName"
                                />
                            </FormGroup>

                            <Button className="btn-block">Submit</Button>

                        </div>
                        <div className="col-md-6">
                            <div className="panel panel__segments-achievements segment-achievements">
                                <div className="panel-heading">
                                    <Row space>
                                        <Row className="flex-1">
                                            <span className="panel-icon"><ion className="icon ion-ios-rocket"/></span>
                                            <h6 className="m-b-0">User Segments</h6>
                                        </Row>
                                    </Row>
                                </div>
                                <div className="panel-content">

                                    <Row>
                                        <span className="panel-icon panel-icon--success"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Viewed page 4 times</h6>
                                    </Row>

                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Spent 30 seconds on page</h6>
                                    </Row>
                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Is over 30 years old</h6>
                                    </Row>
                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Logged in 5 times</h6>
                                    </Row>
                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Submitted form</h6>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}
