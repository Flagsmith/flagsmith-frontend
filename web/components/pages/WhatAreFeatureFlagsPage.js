import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div className={"app-container container"}>
                <h3>What are feature flags?</h3>
                A Feature Flag is a technique to turn some functionality of your application off, via configuration, without deploying new code.
                If you’re employing CI/CD and releasing often they’re pretty important.


                <h3>What is remote config?</h3>
                It's great being able to turn features on and off without doing a build, but with some features, it's
                not as simple as that. This is where remote config comes in.
                Often there's a need to configure feature properties, for example updating some text to promote an
                in-app currency sale or even the copy on our homepage.

                <h3>What benefits does this bring?</h3>
                <ul>
                    <li>
                        It introduces the ability to test code in production with gradual/targeted rollouts to specific
                        users.
                    </li>
                    <li>
                        It empowers non-technical team members to manage feature releases.
                    </li>
                    <li>
                        It enables testing of features early, against an up-to-date codebase. CI means we're constantly
                        testing features on a very close representation to what is running in production.
                    </li>
                    <li>
                        It allows you to introduce beta programs to get early user feedback.
                    </li>
                    <li>
                        It reduces the need to rollback code with the ability to turn off features remotely in the event
                        of an emergency.
                    </li>
                </ul>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;