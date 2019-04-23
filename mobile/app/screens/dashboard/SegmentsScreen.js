/**
 * Created by kylejohnson on 28/01/2017.
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import Button from "../../components/base/forms/Button";

const TermsScreen = class extends Component {
    static propTypes = {
        componentId: propTypes.string,
    };

    static displayName = 'TermsScreen';

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        Navigation.events().bindComponent(this);
    }

    componentDidAppear() {
        global.segmentsScreen = this.props.componentId;
    }
    render() {
        return (
            <Flex space style={[Styles.body, Styles.container]}>
                <View style={{marginTop:50}}>
                    <Text>Segments</Text>
                </View>
            </Flex>
        );
    }
};

module.exports = TermsScreen;
