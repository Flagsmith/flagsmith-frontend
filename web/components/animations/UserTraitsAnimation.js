import React, { Component } from 'react';
import anime from "animejs";

export default class UserTraitsAnimation extends Component {
    static displayName = 'UserTraitsAnimation'

    componentDidMount() {
        //
        // var logEl2 = document.querySelector('.valueIncrement');
        //
        // var valueIncrement = {
        //     value: '1',
        // }
        //
        // anime({
        //     targets: valueIncrement,
        //     value: '20',
        //     round: 1,
        //     easing: 'easeInOutCubic',
        //     loop: true,
        //     direction: 'alternate',
        //     duration: 4000,
        //     update: function() {
        //         logEl2.innerHTML = JSON.stringify(valueIncrement);
        //     }
        // });
        //
        //
        // anime({
        //     targets: '#header-bg',
        //     direction: 'alternate',
        //     easing: 'easeInOutCubic',
        //     duration: 4000,
        //     loop: true,
        //     height: 230,
        //     fill: '#F94F73'
        // });
        //


        // cursor fades in and moves to button
        anime({
            targets: '.user-traits-cursor',
            direction: 'alternate',
            easing: 'easeInOutCubic',
            duration: 1000,
            delay: 1000,
            loop: true,
            opacity: [0, 1],
            translateY: -2
        });

        // tap action
        anime({
            targets: '.oval-tap',
            direction: 'alternate',
            easing: 'easeInOutCubic',
            duration: 500,
            delay: 1500,
            loop: true,
            opacity: [0,0.75],
        });

        // anime({
        //     targets: '.cookie-button',
        //     translateY: [15, 20], // from 100 to 250
        //     translateX: [15, 15], // from 100 to 250
        //     direction: 'alternate',
        //     easing: 'easeInOutCubic',
        //     duration: 500,
        //     delay: 1500,
        //     loop: true,
        //     opacity: [1,0],
        // });




        // placeholder-lines retract

        // placeholder-lines

        // anime({
        //     targets: '.placeholder-lines path',
        //     d: ["0", "M327.772 36.137h140.649M167.924 36.137H313.53M167.924 20.668h300.497"],
        //     easing: 'easeInOutSine',
        //     duration: 500,
        //     direction: 'alternate',
        //     // strokeWidth: [6.6, 0],
        //     loop: true
        // });


        // anime({
        //     targets: '.oval-tap',
        //     direction: 'alternate',
        //     easing: 'easeInOutCubic',
        //     duration: 1000,
        //     delay: 2000,
        //     loop: false,
        //     scale: 2
        // });

        // anime({
        //     targets: '.oval-tap',
        //     direction: 'alternate',
        //     easing: 'easeInOutCubic',
        //     duration: 500,
        //     // translateX: 250,
        //     delay: 3000,
        //     loop: false,
        //     scale: 2
        // });

        // anime({
        //     targets: '.cookie-bg',
        //     strokeDashoffset: [anime.setDashoffset, 0],
        //     strokeDasharray: 10,
        //     easing: 'easeInOutSine',
        //     duration: 1200,
        //     delay: function(el, i) { return i * 250 },
        //     direction: 'alternate',
        //     loop: true
        // });



    }

    render() {
        return (
            <div className="mt-5">
                <svg width={491} height={86}>
                    <title>{'user-traits-cookie-illus'}</title>
                    <defs>
                        <rect
                            id="prefix__a"
                            x={0}
                            y={0.289}
                            width={490.516}
                            height={58.5}
                            rx={6.634}
                        />
                        <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="linearGradient-6">
                            <stop stopColor="#2CA69D" offset="0%"/>
                            <stop stopColor="#2BE3D6" offset="100%"/>
                        </linearGradient>
                        <mask
                            id="prefix__b"
                            maskContentUnits="userSpaceOnUse"
                            maskUnits="objectBoundingBox"
                            x={0}
                            y={0}
                            width={490.516}
                            height={58.5}
                            fill="#fff"
                        >
                            <use xlinkHref="#prefix__a" />
                        </mask>
                        <mask
                            id="prefix__c"
                            maskContentUnits="userSpaceOnUse"
                            maskUnits="objectBoundingBox"
                            x={0}
                            y={0}
                            width={490.516}
                            height={58.5}
                            fill="#fff"
                        >
                            <use xlinkHref="#prefix__a" />
                        </mask>
                        <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="prefix__e">
                            <stop stopColor="#2CA69D" offset="0%" />
                            <stop stopColor="#2BE3D6" offset="100%" />
                        </linearGradient>
                        <path
                            d="M17.082 2.974a9.619 9.619 0 0 1 .002 13.633c-3.777 3.763-9.898 3.763-13.673 0a9.62 9.62 0 0 1 0-13.633c3.775-3.763 9.896-3.763 13.671 0z"
                            id="prefix__g"
                        />
                        <filter
                            x="-243.1%"
                            y="-207.5%"
                            width="586.2%"
                            height="587.6%"
                            filterUnits="objectBoundingBox"
                            id="prefix__f"
                        >
                            <feOffset dy={7} in="SourceAlpha" result="shadowOffsetOuter1" />
                            <feGaussianBlur
                                stdDeviation={14.5}
                                in="shadowOffsetOuter1"
                                result="shadowBlurOuter1"
                            />
                            <feColorMatrix
                                values="0 0 0 0 0.976470588 0 0 0 0 0.309803922 0 0 0 0 0.450980392 0 0 0 1 0"
                                in="shadowBlurOuter1"
                            />
                        </filter>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <g>
                            <mask id="prefix__d" fill="#fff">
                                <use xlinkHref="#prefix__a" />
                            </mask>
                            <g
                                stroke="#2BE3D6"
                                mask="url(#prefix__b)"
                                strokeWidth={2.6}
                                strokeDasharray="6.5"
                            >
                                <use mask="url(#prefix__c)" xlinkHref="#prefix__a" />
                            </g>
                            <g>
                                <path className="cookie-bg" fill="#132333" stroke="#2BE3D6" strokeDasharray={6.5} strokeWidth={1} d="M0-.326h490.516v59.668H0z" />
                                <g className="cookie-button" transform="translate(18.781 13.486)">
                                    <rect
                                        // fill="#2BE3D6"
                                        fill="url(#linearGradient-6)"
                                        width={120.946}
                                        height={30.815}
                                        rx={2.676}
                                    />
                                    <text
                                        fontFamily="Raleway-Bold, Raleway"
                                        fontSize={12.043}
                                        fontWeight="bold"
                                        letterSpacing={-0.185}
                                        fill="#FFF"
                                    >
                                        <tspan x={17.21} y={19.416}>
                                            {'Accept Cookies'}
                                        </tspan>
                                    </text>
                                </g>
                                <g strokeLinecap="round" className="placeholder-lines" stroke="#C2D1D9" strokeWidth={6.634}>
                                    <path d="M327.772 36.137h140.649M167.924 36.137H313.53M167.924 20.668h300.497" />
                                </g>
                            </g>
                        </g>
                        <g className="oval-tap" opacity={0.75} transform="translate(72.395 32.555)">
                            <path
                                d="M17.082 2.974a9.619 9.619 0 0 1 .002 13.633c-3.777 3.763-9.898 3.763-13.673 0a9.62 9.62 0 0 1 0-13.633c3.775-3.763 9.896-3.763 13.671 0z"
                                id="prefix__b"
                                fill="#F94F73"
                            />
                        </g>
                        <g className="user-traits-cursor">
                            <path
                                fill="#FFF"
                                fillRule="nonzero"
                                d="M89.464 60.759l-8.014-19.18 19.235 7.99-8.303 2.912z"
                            />
                            <path
                                d="M89.554 63.912L79.344 39.48l24.502 10.178-10.575 3.709-3.717 10.545h0zm-5.998-20.234l5.819 13.927 2.118-6.011 6.03-2.115-13.967-5.801h0z"
                                stroke="#FFF"
                                fill="#373A3C"
                                fillRule="nonzero"
                            />
                        </g>
                    </g>
                </svg>

            </div>
        );
    }
}
