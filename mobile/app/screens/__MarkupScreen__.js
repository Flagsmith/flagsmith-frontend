/**
 * Created by kylejohnson on 28/01/2017.
 */
import React, { Component } from 'react';

const MarkupScreen = class extends Component {
    static options(passProps) {
        return _.merge({}, global.navBarStyle, { topBar: { title: { text: 'Markup' } } });
    }

    static propTypes = {
        componentId: propTypes.string,
    };

    static displayName = 'MarkupScreen';

    state = {};

    componentWillMount() {
        Navigation.events().bindComponent(this);
    }

    onNavigatorEvent = (event) => {
        if (event.id === routes.navEvents.SHOW) {
            API.trackPage('Markup Screen');
        }
    };

    render() {
        return (
            <ScrollView style={Styles.body} />
        );
    }
};

module.exports = MarkupScreen;
