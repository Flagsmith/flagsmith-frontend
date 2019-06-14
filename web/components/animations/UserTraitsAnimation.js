import React, { Component } from 'react';
import anime from "animejs";

export default class UserTraitsAnimation extends Component {
    static displayName = 'UserTraitsAnimation'

    componentDidMount() {

        anime({
            duration: 1250,
            targets: '.basic-timeline-demo .cookie-content',
            direction: 'alternate',
            loop: true,
            // delay: 1750,
            // delay: 1000,
            easing: 'easeInOutQuad',
            delay: 250,
            opacity: [0,1],
        });


        anime({
            duration: 750,
            targets: '.basic-timeline-demo .cookie-tap',
            direction: 'alternate',
            loop: true,
            // delay: 1750,
            // delay: 1000,
            easing: 'easeInOutQuad',
            delay: 750,
            opacity: [0,1],
            scale: 1.2
        });

    }

    render() {
        return (
            <div className="mt-5 basic-timeline-demo">

                {/*<div className="timeline demo-content offsets-demo">*/}
                    {/*<div className="line">*/}
                        {/*<div className="label">no offset</div>*/}
                        {/*<div className="square shadow"></div>*/}
                        {/*<div className="square el" style={{transform: 'translateX(250px)'}}></div>*/}
                    {/*</div>*/}
                    {/*<div className="line">*/}
                        {/*<div className="label">relative offset ('-=600')</div>*/}
                        {/*<div className="circle shadow"></div>*/}
                        {/*<div className="circle el" style={{transform: 'translateX(250px)'}}></div>*/}
                    {/*</div>*/}
                    {/*<div className="line">*/}
                        {/*<div className="label">absolute offset (400)</div>*/}
                        {/*<div className="triangle shadow"></div>*/}
                        {/*<div className="triangle el" style={{transform: 'translateX(250px)'}}></div>*/}
                    {/*</div>*/}
                {/*</div>*/}

                <div className="cookie-container pt-3 pb-3">
                    <div className="mouse">
                        <div className="cookie-tap"/>
                        <img className="cookie-pointer" src="/images/features-page/pointer-screen-pointer.svg" />
                    </div>
                    <Row className="cookie-content">
                            <div className="col-xs-4">
                                <button className="btn btn-small btn-primary dummy-button">Accept Cookies</button>
                            </div>
                            <div className="col-xs-8">
                                <div className="placeholder el"/>
                                <div className="placeholder el mt-2"/>
                            </div>

                    </Row>
                </div>

            </div>
        );
    }
}
