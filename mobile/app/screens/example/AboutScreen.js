/**
 * Created by kylejohnson on 28/01/2017.
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';

const AboutScreen = class extends Component {
    static propTypes = {
        componentId: propTypes.string,
    };

    static displayName = 'AboutScreen';

    state = {};

    componentWillMount() {
        Navigation.events().bindComponent(this);
    }

    onNavigatorEvent = (event) => {
        if (event.id === routes.navEvents.SHOW) {
            API.trackPage('About Screen');
        }
    };

    render() {
        return (
            <Flex style={Styles.body}>
                <ScrollView>
                    <Container>
                        <H2>
                            About us
                        </H2>
                        <View style={Styles.noPad}>
                            {_.range(0, 12).map(i => (
                                <ListItem
                                  key={i}
                                  animationProps={Animations.listItem}
                                  index={i}
                                >
                                    <Text>
                                        ListItem
                                        {' '}
                                        {i}
                                    </Text>
                                </ListItem>
                            ))}
                        </View>
                    </Container>
                </ScrollView>
            </Flex>
        );
    }
};


AboutScreen.propTypes = {};


module.exports = AboutScreen;
