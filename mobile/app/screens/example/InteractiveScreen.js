import React, { Component } from 'react';

const FILTER_HEIGHT = 120;
const FILTER_FOOTER_HEIGHT = 40;


const SwipeableRow = class extends Component {
    static displayName = 'SwipeableRow';

    state = {};

    _deltaX = new Animated.Value(0);

    render() {
        const transform = this._deltaX.interpolate({
            inputRange: [-1000, -64 * 2, -64, 0],
            outputRange: [1, 1, 0.7, 0.2],
            extrapolateRight: 'clamp',
        });
        const transform2 = this._deltaX.interpolate({
            inputRange: [-1000, -64 * 2, -64, 0],
            outputRange: [1, 1, 1, 0.2],
            extrapolateRight: 'clamp',
        });
        return (
            <View style={styles.swipeRow}>
                <Row style={{ position: 'absolute' }}>
                    <Flex/>
                    <View style={styles.iconContainer}>
                        <Animated.View style={{
                            transform: [{ scaleX: transform }, { scaleY: transform }],
                            height: 54,
                            opacity: transform,
                            borderRadius: 32,
                            alignItems: 'center',
                            backgroundColor: pallette.primary,
                            justifyContent: 'center',
                            width: 54,
                        }}
                        >
                            <ION
                              style={{ color: 'white', marginTop: em(0.2), fontSize: em(2.5) }}
                              name="md-heart-outline"
                            />
                        </Animated.View>
                    </View>
                    <View style={styles.iconContainer}>
                        <Animated.View style={{
                            transform: [{ scaleX: transform2 }, { scaleY: transform2 }],
                            height: 54,
                            opacity: transform2,
                            borderRadius: 32,
                            alignItems: 'center',
                            backgroundColor: pallette.secondary,
                            justifyContent: 'center',
                            width: 54,
                        }}
                        >
                            <ION
                              style={{ color: 'white', marginTop: em(0.2), fontSize: em(2.5) }}
                              name="ios-share-outline"
                            />
                        </Animated.View>
                    </View>
                </Row>
                <Interactable.View
                  style={{ backgroundColor: 'white', height: 64 }}
                  onSnapStart={this.onFilterSnap}
                  boun
                  ref={content => this.content = content}
                  horizontalOnly
                  dragWithSpring={{ tension: 2000, damping: 0.5 }}
                  snapPoints={[{ x: 0, tension: 100 }, { tension: 100, x: -64 * 2 }]}
                  boundaries={{ right: 0 }}
                  animatedValueX={this._deltaX}
                >
                    <View style={{ padding: 20, borderColor: '#d1d1d1', justifyContent: 'center' }}>
                        <Text style={Styles.listItemTitle}>
                            Swipe me

                        </Text>
                        <Text style={Styles.listItemText}>
                            Drag rows with tension and damping

                        </Text>
                    </View>
                </Interactable.View>
            </View>
        );
    }
};


const InteractiveScreen = class extends Component {
    static displayName = 'InteractiveScreen';

    static propTypes = {
        componentId: propTypes.string,
    }

    state = {};

    _deltaY = new Animated.Value(0);

    onFilterSnap = (event) => {
        const index = event.nativeEvent.index;
        this.setState({ expanded: index === 1 });
    }

    toggleFilter = () => {
        this.content.snapTo({ index: this.state.expanded ? 0 : 1 });
    }

    render() {
        const color = this._deltaY.interpolate({
            inputRange: [-FILTER_HEIGHT, -FILTER_HEIGHT * 0.8, 0],
            outputRange: ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,1)'],
            extrapolateRight: 'clamp',
        });
        const focusMargin = this._deltaY.interpolate({
            inputRange: [-FILTER_HEIGHT, -FILTER_HEIGHT * 0.8, 0],
            outputRange: [-10, -10, 0],
            extrapolateRight: 'clamp',
        });
        const rotate = this._deltaY.interpolate({
            inputRange: [-FILTER_HEIGHT, 0],
            outputRange: ['0deg', '1200deg'],
            extrapolateRight: 'clamp',
        });

        return (
            <Flex>
                <View style={styles.container}>

                    {/* Filter */}
                    <Animated.View style={[styles.filterContainer, {
                        transform: [{
                            translateY: this._deltaY.interpolate({
                                inputRange: [-FILTER_HEIGHT, 0],
                                outputRange: [-FILTER_HEIGHT / 2, 0],
                                extrapolateRight: 'clamp',
                            }),
                        }],
                    }]}
                    >

                        <Flex/>
                        <Animated.View style={[styles.filterFooter, { marginTop: focusMargin }]}>
                            <Animated.Text style={{ color }}>Focus on here</Animated.Text>

                        </Animated.View>
                        <Flex style={{ justifyContent: 'flex-end' }}/>
                    </Animated.View>

                    <Interactable.View
                      onSnapStart={this.onFilterSnap}
                      ref={content => this.content = content}
                      verticalOnly
                      snapPoints={[{ y: 0 }, { y: -FILTER_HEIGHT }]}
                      boundaries={{ top: -200 }}
                      animatedValueY={this._deltaY}
                    >
                        <View style={styles.content}>
                            <FormGroup style={{ marginTop: -40 }}>
                                <TouchableOpacity
                                  style={[Styles.circleButton, { alignSelf: 'center' }]}
                                  onPress={this.toggleFilter}
                                >
                                    {
                                        this.state.expanded ? (
                                            <Fade autostart value={1}>
                                                <ION
                                                  style={Styles.circleButtonText}
                                                  name="ios-arrow-down"
                                                />

                                            </Fade>
                                        ) : (
                                            <View>
                                                <Fade autostart value={1}>
                                                    <ION
                                                      style={Styles.circleButtonText}
                                                      name="ios-arrow-up"
                                                    />
                                                </Fade>
                                            </View>
                                        )
                                    }
                                </TouchableOpacity>
                            </FormGroup>
                            <H1>The page</H1>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac odio viverra nulla
                                viverra feugiat a in
                                neque. Aliquam pulvinar urna diam, sit amet congue ligula ultricies quis. Pellentesque
                                vestibulum felis
                                et
                                eros egestas dignissim. Pellentesque iaculis fringilla lectus vitae rutrum. Suspendisse
                                eget viverra
                                neque, commodo dapibus lacus. Pellentesque non enim lorem. Pellentesque vel facilisis
                                sapien, nec
                                hendrerit lorem. Quisque iaculis eros lacinia, gravida elit sollicitudin, tempor turpis.

                            </Text>


                        </View>
                        <SwipeableRow/>
                        <SwipeableRow/>
                        <SwipeableRow/>

                    </Interactable.View>
                    <View style={{
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: 5,
                        right: 10,
                    }}
                    >
                        <Animated.Image
                          style={{ width: 32, height: 32, transform: [{ rotateZ: rotate }] }}
                          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Gear_icon-72a7cf.svg/1000px-Gear_icon-72a7cf.svg.png' }}
                        />
                    </View>
                </View>
            </Flex>
        );
    }
};

module.exports = InteractiveScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
    },
    filterContainer: {
        backgroundColor: pallette.primaryDark,
        height: FILTER_HEIGHT + FILTER_FOOTER_HEIGHT,
    },
    filterFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        height: FILTER_FOOTER_HEIGHT,
    },
    filterTop: {
        height: 36,
    },
    filterUp: {
        marginLeft: 24,
        width: 26,
        height: 26,
    },
    filterField: {
        height: 40,
        justifyContent: 'center',
    },
    filterFieldText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 30,
    },
    content: {
        padding: 20,
        backgroundColor: 'white',
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#de6d77',
        alignItems: 'center',
        marginVertical: 10,
    },
    iconContainer: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swipeRow: {
        backgroundColor: '#f1f1f1',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderTopWidth: 1 / PixelRatio.get(),
        borderColor: '#d1d1d1',
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    photo: {
        width: DeviceWidth - 40,
        height: 190,
        marginBottom: 20,
    },
});
