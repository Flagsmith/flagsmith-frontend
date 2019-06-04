/**
 * Created by niallquinn on 28/05/2019.
 */

import React, { Component } from 'react';
import anime from 'animejs';

export default class SegmentsExampleView extends Component {
    static displayName = 'SegmentsExamplePage'

    componentDidMount() {
        var path = anime.path('#track-2');

        var easings = ['linear', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic'];

        var motionPath = anime({
            targets: '.square',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            //   easing: function (el, i) {
            //   return easings[i];
            // },
            easing: 'easeInCubic',
            duration: 4500,
            loop: true,
            // direction: 'reverse',
            delay: 3000
        });
    }

    render() {
        const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : '';
        return (
            <div className="features-page">
                <div className="hero hero--features-page ">
                    <div>
                        <div className="row" style={{width: '100%', margin: 0, marginRight: 0}}>
                            <div className="col-md-4 offset-md-1 col-sm-12 mt-5 features-cta">
                                <h1 className="mt-5">Bullet Train features</h1>
                                <p className="">
                                    Bullet Train lets you manage feature flags and remote config across web, mobile and server side applications. Learn how to use each feature to make your life easier.
                                </p>
                            </div>
                            <div className="col-sm-6 offset-sm-1 col-xs-4 animation-container pr-0">

                                <div id="anime-demo">
                                    <svg width={898} height={495} className="hidden-sm-down">
                                        <title>{'train-track-feature-flags-sideview copy'}</title>
                                        <defs>
                                            <radialGradient
                                                cx="50%"
                                                cy="53.845%"
                                                fx="50%"
                                                fy="53.845%"
                                                r="63.769%"
                                                gradientTransform="matrix(-.76376 0 0 -1 .882 1.077)"
                                                id="prefix__a"
                                            >
                                                <stop stopColor="#476581" offset="0%" />
                                                <stop stopColor="#22354A" offset="100%" />
                                            </radialGradient>
                                            <path id="prefix__c" d="M0 0h98.213v41H0z" />
                                            <filter
                                                x="-42.3%"
                                                y="-89%"
                                                width="184.5%"
                                                height="302.4%"
                                                filterUnits="objectBoundingBox"
                                                id="prefix__b"
                                            >
                                                <feOffset dy={5} in="SourceAlpha" result="shadowOffsetOuter1" />
                                                <feGaussianBlur
                                                    stdDeviation={13}
                                                    in="shadowOffsetOuter1"
                                                    result="shadowBlurOuter1"
                                                />
                                                <feColorMatrix
                                                    values="0 0 0 0 0.133333333 0 0 0 0 0.207843137 0 0 0 0 0.290196078 0 0 0 1 0"
                                                    in="shadowBlurOuter1"
                                                />
                                            </filter>
                                            <linearGradient
                                                x1="50%"
                                                y1="60.184%"
                                                x2="95.626%"
                                                y2="60.184%"
                                                id="prefix__d"
                                            >
                                                <stop stopColor="#DF6D8F" offset="0%" />
                                                <stop stopColor="#BB3B56" offset="100%" />
                                            </linearGradient>
                                            <circle id="prefix__f" cx={121.456} cy={22.506} r={8} />
                                            <filter
                                                x="-265.6%"
                                                y="-234.4%"
                                                width="631.2%"
                                                height="631.2%"
                                                filterUnits="objectBoundingBox"
                                                id="prefix__e"
                                            >
                                                <feMorphology
                                                    radius={1}
                                                    operator="dilate"
                                                    in="SourceAlpha"
                                                    result="shadowSpreadOuter1"
                                                />
                                                <feOffset dy={5} in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
                                                <feGaussianBlur
                                                    stdDeviation={13}
                                                    in="shadowOffsetOuter1"
                                                    result="shadowBlurOuter1"
                                                />
                                                <feComposite
                                                    in="shadowBlurOuter1"
                                                    in2="SourceAlpha"
                                                    operator="out"
                                                    result="shadowBlurOuter1"
                                                />
                                                <feColorMatrix
                                                    values="0 0 0 0 0.976470588 0 0 0 0 0.309803922 0 0 0 0 0.450980392 0 0 0 1 0"
                                                    in="shadowBlurOuter1"
                                                />
                                            </filter>
                                            <path id="prefix__h" d="M0 0h98.213v41H0z" />
                                            <filter
                                                x="-42.3%"
                                                y="-89%"
                                                width="184.5%"
                                                height="302.4%"
                                                filterUnits="objectBoundingBox"
                                                id="prefix__g"
                                            >
                                                <feOffset dy={5} in="SourceAlpha" result="shadowOffsetOuter1" />
                                                <feGaussianBlur
                                                    stdDeviation={13}
                                                    in="shadowOffsetOuter1"
                                                    result="shadowBlurOuter1"
                                                />
                                                <feColorMatrix
                                                    values="0 0 0 0 0.133333333 0 0 0 0 0.207843137 0 0 0 0 0.290196078 0 0 0 1 0"
                                                    in="shadowBlurOuter1"
                                                />
                                            </filter>
                                            <linearGradient
                                                x1="50%"
                                                y1="60.184%"
                                                x2="95.626%"
                                                y2="60.184%"
                                                id="prefix__i"
                                            >
                                                <stop stopColor="#2CA69D" offset="0%" />
                                                <stop stopColor="#1F7E77" offset="100%" />
                                            </linearGradient>
                                            <circle id="prefix__k" cx={138.456} cy={22.506} r={8} />
                                            <filter
                                                x="-265.6%"
                                                y="-234.4%"
                                                width="631.2%"
                                                height="631.2%"
                                                filterUnits="objectBoundingBox"
                                                id="prefix__j"
                                            >
                                                <feMorphology
                                                    radius={1}
                                                    operator="dilate"
                                                    in="SourceAlpha"
                                                    result="shadowSpreadOuter1"
                                                />
                                                <feOffset dy={5} in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
                                                <feGaussianBlur
                                                    stdDeviation={13}
                                                    in="shadowOffsetOuter1"
                                                    result="shadowBlurOuter1"
                                                />
                                                <feComposite
                                                    in="shadowBlurOuter1"
                                                    in2="SourceAlpha"
                                                    operator="out"
                                                    result="shadowBlurOuter1"
                                                />
                                                <feColorMatrix
                                                    values="0 0 0 0 0.168627451 0 0 0 0 0.890196078 0 0 0 0 0.839215686 0 0 0 1 0"
                                                    in="shadowBlurOuter1"
                                                />
                                            </filter>
                                        </defs>
                                        <g fill="none" fillRule="evenodd">
                                            <path fill="url(#prefix__a)" d="M125 0h648.15v495.03H125z" />
                                            <path
                                                d="M.5 496L106 390.404l72.397-72.397a25 25 0 0 1 17.678-7.323h83.673a25 25 0 0 1 17.677 7.323l10.46 10.46a25 25 0 0 0 17.678 7.322h18.08a25 25 0 0 0 17.64-7.284l88.43-88.053a25 25 0 0 1 17.64-7.285h89.222a24.98 24.98 0 0 0 17.39-7.047 24.98 24.98 0 0 1 17.39-7.047h76.858a25 25 0 0 0 17.678-7.322L792.642 105 897.5 0"
                                                stroke="#22354A"
                                                strokeWidth={7.928}
                                                strokeLinecap="square"
                                                strokeLinejoin="round"
                                                id="track-2"
                                            />
                                            <g transform="translate(536 264)">
                                                <use fill="#000" filter="url(#prefix__b)" xlinkHref="#prefix__c" />
                                                <use fill="#22354A" xlinkHref="#prefix__c" />
                                                <text
                                                    fontFamily="Raleway-Regular, Raleway"
                                                    fontSize={16.2}
                                                    fill="#E9E9E9"
                                                >
                                                    <tspan x={4.056} y={17}>
                                                        {'Feature'}
                                                    </tspan>
                                                </text>
                                                <text
                                                    fontFamily="Raleway-Regular, Raleway"
                                                    fontSize={11.175}
                                                    fill="#A1AEB7"
                                                >
                                                    <tspan x={4.556} y={32.237}>
                                                        {'Disabled'}
                                                    </tspan>
                                                </text>
                                                <rect
                                                    stroke="url(#prefix__d)"
                                                    strokeWidth={2}
                                                    fill="#22354A"
                                                    x={113}
                                                    y={14}
                                                    width={33}
                                                    height={17}
                                                    rx={8.5}
                                                />
                                                <g>
                                                    <use fill="#000" filter="url(#prefix__e)" xlinkHref="#prefix__f" />
                                                    <use
                                                        stroke="#F94F73"
                                                        strokeWidth={2}
                                                        fill="#22354A"
                                                        xlinkHref="#prefix__f"
                                                    />
                                                </g>
                                            </g>
                                            <g transform="translate(188 226)">
                                                <use fill="#000" filter="url(#prefix__g)" xlinkHref="#prefix__h" />
                                                <use fill="#22354A" xlinkHref="#prefix__h" />
                                                <text
                                                    fontFamily="Raleway-Regular, Raleway"
                                                    fontSize={16.2}
                                                    fill="#E9E9E9"
                                                >
                                                    <tspan x={4.056} y={17}>
                                                        {'Feature'}
                                                    </tspan>
                                                </text>
                                                <text
                                                    fontFamily="Raleway-Regular, Raleway"
                                                    fontSize={11.175}
                                                    fill="#A1AEB7"
                                                >
                                                    <tspan x={4.556} y={32.237}>
                                                        {'Enabled'}
                                                    </tspan>
                                                </text>
                                                <rect
                                                    stroke="url(#prefix__i)"
                                                    strokeWidth={2}
                                                    fill="#22354A"
                                                    x={113}
                                                    y={14}
                                                    width={33}
                                                    height={17}
                                                    rx={8.5}
                                                />
                                                <g>
                                                    <use fill="#000" filter="url(#prefix__j)" xlinkHref="#prefix__k" />
                                                    <use
                                                        stroke="#2BE3D6"
                                                        strokeWidth={2}
                                                        fill="#22354A"
                                                        xlinkHref="#prefix__k"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className="square blue"></div>
                                </div>
                                {/*<img src="/images/train-track-feature-flags-sideview.svg" className="hero-illustration hidden-sm-down" />*/}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="section--white mt-5 mb-5">
                    <div className="container text-center mb-4">
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
                        <div className="col-md-6 pl-0">
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
                                        <span className="panel-icon panel-icon--success">
                                            <ion className="icon ion-ios-checkmark"/>
                                        </span>
                                        <h6 className="segment-achievements__text">Viewed page 4 times</h6>
                                    </Row>

                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled">
                                            <ion className="icon ion-ios-checkmark"/>
                                        </span>
                                        <h6 className="segment-achievements__text">Spent 30 seconds on page</h6>
                                    </Row>
                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled">
                                            <ion className="icon ion-ios-checkmark"/>
                                        </span>
                                        <h6 className="segment-achievements__text">Is over 30 years old</h6>
                                    </Row>
                                    <Row className="mt-3">
                                      <span className="panel-icon panel-icon--disabled">
                                            <ion className="icon ion-ios-checkmark"/>
                                        </span>
                                        <h6 className="segment-achievements__text">Logged in 5 times</h6>
                                    </Row>
                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled">
                                            <ion className="icon ion-ios-checkmark"/>
                                        </span>
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
