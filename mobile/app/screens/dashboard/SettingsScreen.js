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
            <Flex space>
                    <ScrollView>
                        <ListItem index={1} onPress={() => Linking.openURL("https://docs.bullet-train.io/")}>
                            <Text>Build Number</Text>
                            <Text style={Styles.listItemText}>
                                {DeviceInfo.getVersion()}.{DeviceInfo.getBuildNumber()}
                            </Text>
                        </ListItem>
                        <ListItem index={1} onPress={() => Linking.openURL("https://docs.bullet-train.io/")}>
                            <Text>Documentation</Text>
                            <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                        </ListItem>
                        <ListItem index={1} onPress={() => Linking.openURL("https://github.com/orgs/SolidStateGroup/dashboard?q=bullet-train/")}>
                            <Text>GitHub</Text>
                            <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                        </ListItem>
                        <ListItem index={1} onPress={() => Linking.openURL("https://bullet-train.io/legal/sla/")}>
                            <Text>Service Level Agreement</Text>
                            <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                        </ListItem>
                        <ListItem index={1} onPress={() => Linking.openURL("https://bullet-train.io/legal/tos/")}>
                            <Text>Terms of Service</Text>
                            <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                        </ListItem>
                    </ScrollView>
                <Container>
                    <FormGroup style={{ marginTop: 50 }}>
                        <Button onPress={() => routes.logout(this.props.componentId)}>
                            Logout
                        </Button>
                    </FormGroup>
                </Container>
            </Flex>
        );
    }
};

module.exports = TermsScreen;
