import React, { Component } from 'react';
import { Link } from 'react-router';
import anime from 'animejs';

export default class NotFoundView extends Component {
    static displayName = 'FeatureFlagsHero'

    // componentDidMount = () => {
    //     API.trackPage(Constants.pages.NOT_FOUND);
    // };

    componentDidMount() {
        const path = anime.path('#track-2');

        const easings = ['linear', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic'];

        const motionPath = anime({
            targets: '.square',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            //   easing: function (el, i) {
            //   return easings[i];
            // },
            easing: 'spring(1, 5, 10, 0)',
            duration: 4500,
            loop: true,
            direction: 'forward',
            delay: 1500,
        });
    }

    render() {
        return (
            <div>
                <div id="anime-demo">
                    <svg width={898} height={495}>
                        <title>train-track-feature-flags-sideview copy</title>
                        <defs>
                            <radialGradient
                              cx="50%"
                              cy="53.845%"
                              fx="50%"
                              fy="53.845%"
                              r="44.935%"
                              gradientTransform="matrix(-.76213 .06535 -.04991 -.99786 .908 1.043)"
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
                            <circle
                              id="prefix__f" cx={121.456} cy={22.506}
                              r={8}
                            />
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
                                <stop stopColor="#6633ff" offset="0%" />
                                <stop stopColor="#1F7E77" offset="100%" />
                            </linearGradient>
                            <circle
                              id="prefix__k" cx={138.456} cy={22.506}
                              r={8}
                            />
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
                                      stroke="#6633ff"
                                      strokeWidth={2}
                                      fill="#22354A"
                                      xlinkHref="#prefix__k"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>
                    <div className="square blue" />
                </div>
            </div>
        );
    }
}
