/**
 * Created by kylejohnson on 28/01/2017.
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';

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
        // Navigation.events().bindComponent(this);
    }

    // componentDidAppear() {}

    render() {
        return (
            <Flex space style={[Styles.body, Styles.container]}>
                <ScrollView style={{ flex: 1 }}>
                    <Text>Terms and conditions</Text>
                </ScrollView>
                <FormGroup>
                    <Button onPress={this.continue}>Agree</Button>
                </FormGroup>
            </Flex>
        );
    }
};

module.exports = TermsScreen;
