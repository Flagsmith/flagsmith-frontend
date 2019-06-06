import React, { Component } from 'react';
import { Link } from 'react-router';
import anime from "animejs";

export default class NotFoundView extends Component {
    static displayName = 'FeatureFlagsAnimation'

    // componentWillMount = () => {
    //     API.trackPage(Constants.pages.NOT_FOUND);
    // };

    componentDidMount() {
        var duration = 1000;

        anime({
            targets: '#feature-toggle .circle',
            translateX: 50,
            direction: 'alternate',
            duration: duration,
            loop: true,
            delay: 1000
        });

        anime({
            targets: '#coupon-button',
            opacity: 1,
            duration: duration,
            direction: 'alternate',
            loop: true,
            delay: 1000
        });

        anime({
            duration: duration,
            targets: '#feature-toggle #Oval',
            direction: 'alternate',
            loop: true,
            delay: 1000,
            easing: 'linear',
            strokeWidth: '25',
            stroke: '#2BE3D6',
        });

        anime({
            duration: duration,
            targets: '#feature-toggle rect',
            direction: 'alternate',
            loop: true,
            delay: 1000,
            easing: 'linear',
            stroke: '#2BE3D6',
        });
    }

    render() {
        return (
            <div>
                <svg
                    className="css-selector-demo"
                    width="100%"
                    viewBox="0 0 1122 386"
                >
                    <defs>
                        <filter
                            x="-6.7%"
                            y="-9.8%"
                            width="113.5%"
                            height="119.9%"
                            filterUnits="objectBoundingBox"
                            id="filter-1"
                        >
                            <feOffset dx={0} dy={3} in="SourceAlpha" result="shadowOffsetOuter1" />
                            <feGaussianBlur
                                stdDeviation={7.5}
                                in="shadowOffsetOuter1"
                                result="shadowBlurOuter1"
                            />
                            <feColorMatrix
                                values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.28 0"
                                type="matrix"
                                in="shadowBlurOuter1"
                                result="shadowMatrixOuter1"
                            />
                            <feMerge>
                                <feMergeNode in="shadowMatrixOuter1" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="linearGradient-2">
                            <stop stopColor="#2CA69D" offset="0%" />
                            <stop stopColor="#2BE3D6" offset="100%" />
                        </linearGradient>
                        <filter
                            x="-35.7%"
                            y="-139.6%"
                            width="171.4%"
                            height="379.2%"
                            filterUnits="objectBoundingBox"
                            id="filter-3"
                        >
                            <feOffset dx={0} dy={3} in="SourceAlpha" result="shadowOffsetOuter1" />
                            <feGaussianBlur
                                stdDeviation={7.5}
                                in="shadowOffsetOuter1"
                                result="shadowBlurOuter1"
                            />
                            <feColorMatrix
                                values="0 0 0 0 0.976470588   0 0 0 0 0.309803922   0 0 0 0 0.450980392  0 0 0 0.5 0"
                                type="matrix"
                                in="shadowBlurOuter1"
                                result="shadowMatrixOuter1"
                            />
                            <feMerge>
                                <feMergeNode in="shadowMatrixOuter1" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="linearGradient-4">
                            <stop stopColor="#F94F73" offset="0%" />
                            <stop stopColor="#F94F73" offset="100%" />
                        </linearGradient>
                        <linearGradient
                            x1="50%"
                            y1="60.1840049%"
                            x2="95.625558%"
                            y2="60.1840049%"
                            id="linearGradient-5"
                        >
                            <stop stopColor="#DF6D8F" offset="0%" />
                            <stop stopColor="#BB3B56" offset="100%" />
                        </linearGradient>
                        <ellipse
                            id="path-6"
                            cx={25.6669643}
                            cy={25.5167763}
                            rx={21.7142857}
                            ry={21.4736842}
                        />
                        <filter
                            x="-264.1%"
                            y="-234.5%"
                            width="628.2%"
                            height="634.1%"
                            filterUnits="objectBoundingBox"
                            id="filter-7"
                        >
                            <feMorphology
                                radius={2.7}
                                operator="dilate"
                                in="SourceAlpha"
                                result="shadowSpreadOuter1"
                            />
                            <feOffset
                                dx={0}
                                dy={14}
                                in="shadowSpreadOuter1"
                                result="shadowOffsetOuter1"
                            />
                            <feGaussianBlur
                                stdDeviation={35}
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
                                values="0 0 0 0 0.976470588   0 0 0 0 0.309803922   0 0 0 0 0.450980392  0 0 0 1 0"
                                type="matrix"
                                in="shadowBlurOuter1"
                            />
                        </filter>
                        <rect id="path-8" x={0} y={0} width={377} height={105} rx={3.62509046} />
                        <filter
                            x="-10.6%"
                            y="-33.3%"
                            width="121.2%"
                            height="176.2%"
                            filterUnits="objectBoundingBox"
                            id="filter-9"
                        >
                            <feOffset dx={0} dy={5} in="SourceAlpha" result="shadowOffsetOuter1" />
                            <feGaussianBlur
                                stdDeviation={12.5}
                                in="shadowOffsetOuter1"
                                result="shadowBlurOuter1"
                            />
                            <feColorMatrix
                                values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.28 0"
                                type="matrix"
                                in="shadowBlurOuter1"
                            />
                        </filter>
                    </defs>
                    <g
                        id="features-page"
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                    >
                        <g id="Artboard" transform="translate(-99.000000, -76.000000)">
                            <g id="feature-flags" transform="translate(124.000000, 88.000000)">
                                <g id="browser" transform="translate(558.000000, 0.000000)">
                                    <g>
                                        <g id="screen-bg" filter="url(#filter-1)">
                                            <rect
                                                id="Rectangle"
                                                fill="#F7F7F7"
                                                fillRule="nonzero"
                                                x={0}
                                                y={0}
                                                width={524.25}
                                                height={355.376059}
                                            />
                                            <ellipse
                                                id="Oval"
                                                fill="#2BE3D6"
                                                fillRule="nonzero"
                                                cx={16.1583904}
                                                cy={12.9751908}
                                                rx={6.46335616}
                                                ry={6.4875954}
                                            />
                                            <ellipse
                                                id="Oval"
                                                fill="#2BE3D6"
                                                fillRule="nonzero"
                                                cx={35.5484589}
                                                cy={13.3356128}
                                                rx={6.46335616}
                                                ry={6.4875954}
                                            />
                                            <ellipse
                                                id="Oval"
                                                fill="#2BE3D6"
                                                fillRule="nonzero"
                                                cx={54.9385274}
                                                cy={13.6960347}
                                                rx={6.46335616}
                                                ry={6.4875954}
                                            />
                                            <path
                                                d="M0,25.9929547 L524.25,25.9929547"
                                                id="Path"
                                                stroke="#C2D1D9"
                                                strokeWidth={1.43656025}
                                            />
                                        </g>
                                        <g
                                            id="text"
                                            transform="translate(323.437500, 77.280191)"
                                            fill="#22354A"
                                        >
                                            <text
                                                id="Apple-Imac"
                                                fontFamily="Raleway-Bold, Raleway"
                                                fontSize={16.2}
                                                fontWeight="bold"
                                            >
                                                <tspan x={0.56565} y={15.0268362}>
                                                    {'Apple Imac'}
                                                </tspan>
                                            </text>
                                            <text
                                                id="The-vision-behind-iM"
                                                fontFamily="Raleway-Light, Raleway"
                                                fontSize={10.35}
                                                fontWeight={300}
                                            >
                                                <tspan x={0} y={37.6403602}>
                                                    {'The vision behind iMac has never '}
                                                </tspan>
                                                <tspan x={0} y={49.6403602}>
                                                    {'wavered: transform the desktop '}
                                                </tspan>
                                                <tspan x={0} y={61.6403602}>
                                                    {'experience by fitting powerful, '}
                                                </tspan>
                                                <tspan x={0} y={73.6403602}>
                                                    {'easy-to-use technology into an '}
                                                </tspan>
                                                <tspan x={0} y={85.6403602}>
                                                    {'elegant, all-in-one design. '}
                                                </tspan>
                                            </text>
                                        </g>
                                        <g
                                            id="frame"
                                            transform="translate(9.562500, 45.127119)"
                                            stroke="#2BE3D6"
                                            strokeWidth={4.5}
                                        >
                                            <rect
                                                id="Rectangle"
                                                x={2.25}
                                                y={2.25}
                                                width={496.6875}
                                                height={292.774894}
                                                rx={2.25}
                                            />
                                            <path d="M302.625,0 L302.625,297.274894" id="Path-7" />
                                        </g>
                                        <g
                                            id="screen-cart"
                                            transform="translate(89.437500, 120.715042)"
                                            fillRule="nonzero"
                                        >
                                            <g
                                                id="screen-cart-screen-cart_1_"
                                                transform="translate(0.000000, 3.384534)"
                                            >
                                                <g id="screen-cart-screen">
                                                    <g id="Group" transform="translate(0.000000, 68.367585)">
                                                        <path
                                                            d="M129.333871,2.28941155 L129.333871,15.4886425 C129.333871,17.9212649 127.37331,19.8907478 124.951882,19.8907478 L6.67334258,19.8907478 C4.25180196,19.8907478 2.29112854,17.9212875 2.29112854,15.4886425 L2.29112854,2.28941155"
                                                            id="Path"
                                                            fill="#FFFFFF"
                                                        />
                                                        <path
                                                            d="M124.951882,22.1698026 L6.67334258,22.1698026 C3.00556478,22.1698026 0.0224840657,19.171963 0.0224840657,15.4886425 L0.0224840657,2.28941155 C0.0224840657,1.02968803 1.0381978,0.0103566737 2.29112854,0.0103566737 C3.54394697,0.0103566737 4.55966071,1.02968803 4.55966071,2.28941155 L4.55966071,15.4886425 C4.55966071,16.6593528 5.50792225,17.6119185 6.67334258,17.6119185 L124.951882,17.6119185 C126.117078,17.6119185 127.065339,16.6593528 127.065339,15.4886425 L127.065339,2.28941155 C127.065339,1.02968803 128.081165,0.0103566737 129.333871,0.0103566737 C130.586802,0.0103566737 131.602628,1.02968803 131.602628,2.28941155 L131.602628,15.4886425 C131.602628,19.171963 128.619435,22.1698026 124.951882,22.1698026 L124.951882,22.1698026 Z"
                                                            id="Path"
                                                            fill="#2BE3D6"
                                                        />
                                                    </g>
                                                    <g id="Group" fill="#2BE3D6">
                                                        <path
                                                            d="M129.333871,72.9358255 C128.081165,72.9358255 127.065339,71.9164942 127.065339,70.6569963 L127.065339,6.84707002 C127.065339,5.67658538 126.117078,4.7240196 124.951882,4.7240196 L6.67334258,4.7240196 C5.50792225,4.7240196 4.55966071,5.67658538 4.55966071,6.84707002 L4.55966071,70.6569963 C4.55966071,71.9164942 3.54394697,72.9358255 2.29112854,72.9358255 C1.0381978,72.9358255 0.0224840657,71.9164942 0.0224840657,70.6569963 L0.0224840657,6.84707002 C0.0224840657,3.16397511 3.00556478,0.166135487 6.67334258,0.166135487 L124.951882,0.166135487 C128.619435,0.166135487 131.602628,3.16397511 131.602628,6.84707002 L131.602628,70.6569963 C131.602628,71.9164942 130.586802,72.9358255 129.333871,72.9358255 L129.333871,72.9358255 Z"
                                                            id="Path"
                                                        />
                                                    </g>
                                                    <g id="Group" transform="translate(48.067833, 85.967161)">
                                                        <rect
                                                            id="Rectangle"
                                                            fill="#FFFFFF"
                                                            x={2.4115452}
                                                            y={2.2911715}
                                                            width={30.6662441}
                                                            height={17.6039762}
                                                        />
                                                        <path
                                                            d="M33.0777893,22.1739769 L2.4115452,22.1739769 C1.15872677,22.1739769 0.142900725,21.1546681 0.142900725,19.8951702 L0.142900725,2.29119407 C0.142900725,1.03169619 1.15872677,0.0123648305 2.4115452,0.0123648305 L33.0777893,0.0123648305 C34.33072,0.0123648305 35.3463214,1.03169619 35.3463214,2.29119407 L35.3463214,19.8951702 C35.3463214,21.1546681 34.33072,22.1739769 33.0777893,22.1739769 L33.0777893,22.1739769 Z M4.68018968,17.6160928 L30.8092571,17.6160928 L30.8092571,4.57022638 L4.68018968,4.57022638 L4.68018968,17.6160928 L4.68018968,17.6160928 Z"
                                                            id="Shape"
                                                            fill="#2BE3D6"
                                                        />
                                                    </g>
                                                    <path
                                                        d="M129.333871,72.9358255 L2.29112854,72.9358255 C1.0381978,72.9358255 0.0224840657,71.9164942 0.0224840657,70.6569963 C0.0224840657,69.3972728 1.0381978,68.3779414 2.29112854,68.3779414 L129.333871,68.3779414 C130.586802,68.3779414 131.602628,69.3972728 131.602628,70.6569963 C131.602628,71.9164942 130.586802,72.9358255 129.333871,72.9358255 L129.333871,72.9358255 Z"
                                                        id="Path"
                                                        fill="#2BE3D6"
                                                    />
                                                    <path
                                                        d="M89.9100276,108.141138 L41.7150847,108.141138 C40.4622438,108.141138 39.4464402,107.121829 39.4464402,105.862331 C39.4464402,104.602608 40.4622438,103.583276 41.7150847,103.583276 L89.9100276,103.583276 C91.1627562,103.583276 92.1785598,104.602608 92.1785598,105.862331 C92.1785598,107.121829 91.1627562,108.141138 89.9100276,108.141138 L89.9100276,108.141138 Z"
                                                        id="Path"
                                                        fill="#2BE3D6"
                                                    />
                                                    <path
                                                        d="M68.003607,78.9067977 C68.003607,80.1220033 67.0199235,81.1078503 65.8125,81.1078503 C64.6028752,81.1078503 63.621393,80.1220033 63.621393,78.9067977 C63.621393,77.6917951 64.6028752,76.705745 65.8125,76.705745 C67.0199235,76.705745 68.003607,77.6917951 68.003607,78.9067977 Z"
                                                        id="Path"
                                                        fill="#2BE3D6"
                                                    />
                                                </g>
                                                <g
                                                    id="screen-cart-cart"
                                                    transform="translate(38.409343, 8.574153)"
                                                >
                                                    <g id="Group" transform="translate(7.412329, 7.445975)">
                                                        <polyline
                                                            id="Path"
                                                            fill="#FFFFFF"
                                                            points="2.29375655 2.37291928 44.3717533 2.37291928 38.8842487 24.4276929 2.29375655 24.4276929"
                                                        />
                                                        <polygon
                                                            id="Path"
                                                            fill="#2BE3D6"
                                                            points="40.6555034 26.7065221 0.0252243814 26.7065221 0.0252243814 22.1488637 37.1129715 22.1488637 41.4662326 4.65186133 0.0252243814 4.65186133 0.0252243814 0.0940900424 47.2774988 0.0940900424"
                                                        />
                                                    </g>
                                                    <polygon
                                                        id="Path"
                                                        fill="#2BE3D6"
                                                        points="48.5651102 41.5035013 7.43755373 41.5035013 7.43755373 4.74694417 0.117676344 4.74694417 0.117676344 0.189172881 11.9748427 0.189172881 11.9748427 36.9456172 48.5651102 36.9456172"
                                                    />
                                                    <path
                                                        d="M13.3638907,44.7371075 C16.3967464,44.7371075 18.8537089,47.2074111 18.8537089,50.2519573 C18.8537089,53.2986922 16.3967464,55.7645959 13.3638907,55.7645959 C10.3331016,55.7645959 7.87625132,53.2986922 7.87625132,50.2519573 C7.87625132,47.2074111 10.3331016,44.7371075 13.3638907,44.7371075 Z"
                                                        id="Path"
                                                        fill="#2BE3D6"
                                                    />
                                                    <path
                                                        d="M42.6366843,44.7371075 C45.6694501,44.7371075 48.1266148,47.2074111 48.1266148,50.2519573 C48.1266148,53.2986922 45.6694276,55.7645959 42.6366843,55.7645959 C39.6058951,55.7645959 37.148955,53.2986922 37.148955,50.2519573 C37.148955,47.2074111 39.6058951,44.7371075 42.6366843,44.7371075 Z"
                                                        id="Path"
                                                        fill="#2BE3D6"
                                                    />
                                                    <polygon
                                                        id="Path"
                                                        fill="#2BE3D6"
                                                        points="48.6583259 27.2179478 8.41454366 27.2179478 8.41454366 22.6600637 48.6583259 22.6600637"
                                                    />
                                                    <polygon
                                                        id="Path"
                                                        fill="#2BE3D6"
                                                        points="49.7105622 19.6200528 8.11764618 19.6200528 8.11764618 15.0622815 49.7105622 15.0622815"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                        <g id="button" transform="translate(321.187500, 194.046610)">
                                            <rect
                                                id="Rectangle-2"
                                                fill="url(#linearGradient-2)"
                                                x={0}
                                                y={0}
                                                width={97.3125}
                                                height={24.8128641}
                                                rx={2.1515625}
                                            />
                                            <text
                                                id="Add-to-cart"
                                                fontFamily="Raleway-Bold, Raleway"
                                                fontSize={9.68203125}
                                                fontWeight="bold"
                                                letterSpacing={-0.148954416}
                                                fill="#FFFFFF"
                                            >
                                                <tspan x={23.625} y={15.7846045}>
                                                    {'Add to cart'}
                                                </tspan>
                                            </text>
                                        </g>
                                        <g
                                            id="coupon-button"
                                            transform="translate(317.812500, 223.379237)"
                                        >
                                            <g
                                                id="button-copy"
                                                filter="url(#filter-3)"
                                                transform="translate(3.375000, 9.025424)"
                                            >
                                                <rect
                                                    id="Rectangle-2"
                                                    fill="url(#linearGradient-4)"
                                                    x={0}
                                                    y={0}
                                                    width={97.875}
                                                    height={24.8128641}
                                                    rx={2.1515625}
                                                />
                                                <text
                                                    id="Add-coupon"
                                                    fontFamily="Raleway-Bold, Raleway"
                                                    fontSize={9.68203125}
                                                    fontWeight="bold"
                                                    letterSpacing={-0.148954416}
                                                    fill="#FFFFFF"
                                                >
                                                    <tspan x={34.875} y={15.7846045}>
                                                        {'Add coupon'}
                                                    </tspan>
                                                </text>
                                            </g>
                                            <g id="Group-2" fillRule="nonzero">
                                                <g id="discount-coupon">
                                                    <ellipse
                                                        id="discount-coupon-label"
                                                        cx={21.375}
                                                        cy={21.4353814}
                                                        rx={21.375}
                                                        ry={21.4353814}
                                                    />
                                                    <g
                                                        id="discount-coupon-discount-coupon_1_"
                                                        transform="translate(8.676980, 12.436766)"
                                                    >
                                                        <g id="Group">
                                                            <path
                                                                d="M0.469208762,2.47506496 C1.60936819,2.47506496 2.53241265,1.56153994 2.53241265,0.432837652 L22.3460345,0.432837652 C22.3460345,1.56153994 23.269079,2.47506496 24.409213,2.47506496 L24.409213,15.541441 C23.269079,15.541441 22.3460345,16.4549448 22.3460345,17.5823864 L2.53241265,17.5823864 C2.53241265,16.4549448 1.60936819,15.541441 0.469208762,15.541441 L0.469208762,2.47506496 Z"
                                                                id="Path"
                                                            />
                                                            <path
                                                                d="M22.7735176,18.0110771 L2.10490842,18.0110771 L2.10490842,17.5823907 C2.10490842,16.6935864 1.37119567,15.9701359 0.469208762,15.9701359 L0.0417087624,15.9701359 L0.0417087624,2.04633611 L0.469208762,2.04633611 C1.37119567,2.04633611 2.10490842,1.32248663 2.10490842,0.432837652 L2.10490842,0.00412578033 L22.7735176,0.00412578033 L22.7735176,0.432837652 C22.7735176,1.32248663 23.5072515,2.04633611 24.409213,2.04633611 L24.8367003,2.04633611 L24.8367003,15.9701316 L24.409213,15.9701316 C23.5072515,15.9701316 22.7735176,16.6935821 22.7735176,17.5823864 L22.7735176,18.0110771 L22.7735176,18.0110771 Z M2.92232228,17.1536958 L21.9560825,17.1536958 C22.1370886,16.1329938 22.9517935,15.3262213 23.9817299,15.1487278 L23.9817299,2.86690798 C22.9517935,2.68982626 22.1368812,1.88264195 21.9560825,0.861528301 L2.92232228,0.861528301 C2.74156597,1.88264195 1.92665361,2.68982626 0.896712995,2.86690798 L0.896712995,15.1487278 C1.92665361,15.3262213 2.74135856,16.1329938 2.92232228,17.1536958 L2.92232228,17.1536958 Z"
                                                                id="Shape"
                                                            />
                                                        </g>
                                                        <g id="Group" transform="translate(1.650743, 1.612959)">
                                                            <path
                                                                d="M2.14537277,14.3366537 C1.78507916,13.6220278 1.19352074,13.0358996 0.468362228,12.6779287 L0.468362228,2.11220003 C1.19352074,1.75468334 1.78507916,1.16938707 2.14537277,0.452651585 L19.4307385,0.452651585 C19.7918828,1.16938707 20.3842497,1.75468334 21.1090103,2.11220003 L21.1090103,12.6779287 C20.3842497,13.0359038 19.7918871,13.6220278 19.4307385,14.3366537 L2.14537277,14.3366537 Z"
                                                                id="Path"
                                                            />
                                                            <path
                                                                d="M19.6933377,14.7653444 L1.88236292,14.7653444 L1.76379304,14.5300645 C1.44609282,13.8995884 0.918828713,13.3783351 0.279445322,13.0626832 L0.0408622277,12.9446273 L0.0408622277,1.84510669 L0.279881287,1.72747102 C0.919247748,1.41220961 1.44630446,0.89141474 1.76358988,0.259652505 L1.88215975,0.023939713 L19.6937568,0.023939713 L19.8123055,0.259236531 C20.1304163,0.890565814 20.6579301,1.41220961 21.2977072,1.72747102 L21.5364976,1.84510669 L21.5364976,12.9446273 L21.2979146,13.0626832 C20.6583407,13.3783351 20.130666,13.9000044 19.8120981,14.5304805 L19.6933377,14.7653444 L19.6933377,14.7653444 Z M2.39836389,13.9079631 L19.1779378,13.9079631 C19.5401107,13.2958874 20.0621687,12.7796513 20.681485,12.4213026 L20.681485,2.36928454 C20.0617539,2.01089345 19.5396959,1.49428378 19.1777304,0.881342233 L2.39857129,0.881342233 C2.03724067,1.49469975 1.51561871,2.01130942 0.895845297,2.36928454 L0.895845297,12.4213026 C1.51518698,12.7796513 2.0368301,13.2954757 2.39836389,13.9079631 L2.39836389,13.9079631 Z"
                                                                id="Shape"
                                                                fill="#FFFFFF"
                                                            />
                                                        </g>
                                                        <path
                                                            d="M17.8059125,9.0078179 C17.8059125,11.9392655 15.4033329,14.3160078 12.4392215,14.3160078 C9.47426347,14.3160078 7.07249228,11.9392655 7.07249228,9.0078179 C7.07249228,6.07637032 9.47426347,3.699212 12.4392215,3.699212 C15.4033329,3.699212 17.8059125,6.07637032 17.8059125,9.0078179 Z"
                                                            id="Path"
                                                        />
                                                        <g
                                                            id="Group"
                                                            transform="translate(9.227228, 5.815143)"
                                                            fill="#FFFFFF"
                                                        >
                                                            <polygon
                                                                id="Path"
                                                                points="0.760539431 6.22041609 0.160215149 5.61004254 5.66343111 0.164521858 6.26377656 0.774895403"
                                                            />
                                                            <g id="Path">
                                                                <path d="M2.52439173,1.49084138 C2.52439173,2.05433299 2.06181557,2.51195928 1.491975,2.51195928 C0.922528069,2.51195928 0.460387871,2.05433299 0.460387871,1.49084138 C0.460387871,0.926895602 0.922528069,0.469727731 1.491975,0.469727731 C2.06181557,0.469727731 2.52439173,0.926895602 2.52439173,1.49084138 Z" />
                                                            </g>
                                                            <g transform="translate(3.470792, 3.438150)" id="Path">
                                                                <path d="M2.49281176,1.45594204 C2.49281176,2.01947185 2.03191173,2.47747166 1.4616352,2.47747166 C0.892188267,2.47747166 0.429633267,2.01947185 0.429633267,1.45594204 C0.429633267,0.89245043 0.892188267,0.435282559 1.4616352,0.435282559 C2.03191173,0.435282559 2.49281176,0.89245043 2.49281176,1.45594204 Z" />
                                                            </g>
                                                        </g>
                                                        <g
                                                            id="Group"
                                                            transform="translate(4.952228, 8.574153)"
                                                            fill="#FFFFFF"
                                                        >
                                                            <polygon
                                                                id="Path"
                                                                points="0.86073104 0.862356004 0.00574373762 0.862356004 0.00574373762 0.00497470633 0.86073104 0.00497470633"
                                                            />
                                                            <polygon
                                                                id="Path"
                                                                points="14.9682437 0.862356004 14.1132353 0.862356004 14.1132353 0.00497470633 14.9682437 0.00497470633"
                                                            />
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                                <g id="feature-toggle" transform="translate(421.000000, 151.000000)">
                                    <rect
                                        id="Rectangle"
                                        stroke=""
                                        strokeWidth={5.4}
                                        fill="#22354A"
                                        x={2.7}
                                        y={2.7}
                                        width={89.6}
                                        height={45.6}
                                        rx={22.8}
                                    />
                                    <g id="Oval" className="circle">
                                        <use
                                            fill="black"
                                            fillOpacity={1}
                                            filter="url(#filter-7)"
                                            xlinkHref="#path-6"
                                        />
                                        <use
                                            strokeWidth={5.4}
                                            fill="#22354A"
                                            fillRule="evenodd"
                                            xlinkHref="#path-6"
                                        />
                                    </g>
                                </g>
                                <g id="code-block" transform="translate(0.000000, 126.000000)">
                                    <g id="code-bg">
                                        <use
                                            fill="black"
                                            fillOpacity={1}
                                            filter="url(#filter-9)"
                                            xlinkHref="#path-8"
                                        />
                                        <use fill="#22354A" fillRule="evenodd" xlinkHref="#path-8" />
                                    </g>
                                    <text
                                        id="code-text"
                                        fontFamily="Courier"
                                        fontSize={10.8752714}
                                        fontWeight="normal"
                                    >
                                        <tspan x={18.85} y={29.1377859} fill="#F7F7F7">
                                            {'// Toggle a feature'}
                                        </tspan>
                                        <tspan
                                            x={18.85}
                                            y={46.6722491}
                                            line-spacing={13.5940892}
                                            fill="#2BE3D6"
                                        >
                                            {'if'}
                                        </tspan>
                                        <tspan
                                            x={31.9024497}
                                            y={46.6722491}
                                            line-spacing={13.5940892}
                                            fill="#F7F7F7"
                                        >
                                            {' (bulletTrain.hasFeature(\u201C'}
                                        </tspan>
                                        <tspan
                                            x={201.584296}
                                            y={46.6722491}
                                            line-spacing={13.5940892}
                                            fill="#F94F73"
                                        >
                                            {'coupon'}
                                        </tspan>
                                        <tspan
                                            x={240.741646}
                                            y={46.6722491}
                                            line-spacing={13.5940892}
                                            fill="#F7F7F7"
                                        >
                                            {'\u201D)) {'}
                                        </tspan>
                                        <tspan
                                            x={18.85}
                                            y={63.8008015}
                                            line-spacing={13.5940892}
                                            fill="#F7F7F7"
                                        >
                                            {'\tmyCoolFeature();'}
                                        </tspan>
                                        <tspan
                                            x={18.85}
                                            y={80.2949631}
                                            line-spacing={13.5940892}
                                            fill="#F7F7F7"
                                        >
                                            {'}'}
                                        </tspan>
                                    </text>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}
