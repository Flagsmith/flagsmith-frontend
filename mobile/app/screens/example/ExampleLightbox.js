import React, { Component } from 'react';

import Lightbox from '../../components/base/Lightbox';

const ExampleLightbox = class extends Component {
    static displayName = 'ExampleLightbox';

    static propTypes = {
        dismiss: propTypes.func,
    };

    state = {};

    componentDidMount() {
        this.animTimer = setTimeout(() => {
            this.animation.play();
        }, 500);

        this.loadedTimer = setTimeout(() => this.setState({ loaded: true }), 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.animTimer);
        clearTimeout(this.loadedTimer);
    }

    render() {
        const { dismiss } = this.props;
        return (
            <ViewOverflow style={Styles.lightbox}>
                <ViewOverflow style={{ alignSelf: 'center', width: 80, height: 80 }}>
                    <View style={Styles.roundedAnimationContainer}>
                        <View style={Styles.roundedAnimationInner}>
                            <Animation
                              ref={(animation) => {
                                  this.animation = animation;
                              }}
                              loop={false}
                              style={{ width: 70, height: 70 }} source={require('./success.json')}
                            />
                        </View>
                    </View>
                </ViewOverflow>
                <View style={[Styles.padded, { alignSelf: 'center', marginTop: -40 }]}>
                    <H1 style={Styles.textCenter}>Congratulations</H1>
                    {this.state.loaded && (
                    <H3 style={Styles.textCenter}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                    ac
                    odio viverra nulla viverra
                    odio viverra nulla viverra
                    odio viverra nulla viverra
                    odio viverra nulla viverra
                    odio viverra nulla viverra
                    odio viverra nulla viverra
                    odio viverra nulla viverra

                    </H3>
                    )}
                    <H3 style={Styles.textCenter}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac
                odio viverra nulla viverra

                    </H3>
                </View>

                <FormGroup>
                    <Button
                      style={{ alignSelf: 'center', width: 200 }}
                      onPress={dismiss}
                    >
                Ok

                    </Button>
                </FormGroup>
            </ViewOverflow>
        );
    }
};

module.exports = Lightbox(ExampleLightbox);
