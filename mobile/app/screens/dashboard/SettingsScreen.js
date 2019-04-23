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
        // Navigation.events().bindComponent(this);
    }

    // componentDidAppear() {}

    render() {
        return (
            <ScrollView space style={[Styles.body, Styles.container]}>
                <View style={{marginTop:50}}>
                    <Button onPress={()=>routes.logout(this.props.componentId)}>
                        Logout
                    </Button>
                </View>
            </ScrollView>
        );
    }
};

module.exports = TermsScreen;
