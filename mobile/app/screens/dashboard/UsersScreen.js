/**
 * Created by kylejohnson on 28/01/2017.
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import FeatureValue from "../../components/FeatureValue";
import withNavigationContext from "../../../common-mobile/providers/withNavigationContext";

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
        global.usersScreen = this.props.componentId;
    }

    renderUser = ({identifier}) => {
        return (
            <ListItem index={1}>
                <Text style={Styles.listItemTitle}>{identifier}</Text>
                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
            </ListItem>
        )
    }

    render() {
        return (
            <Flex space style={[Styles.body]}>
                <IdentityListProvider>
                    {({ isLoading, identities }) => (<Flex>
                            <Select
                                placeholder="Search Users"
                                items={isLoading ? [1] : identities}
                                multiple={false}
                                filterItem={(item, search) => item.identifier.toLowerCase().indexOf(search.toLowerCase()) !== -1}
                                renderRow={item => isLoading ? (
                                    <Loader/>
                                ) : this.renderUser(item, identities)}
                            />
                        </Flex>
                    )}
                </IdentityListProvider>
            </Flex>
        );
    }
};

module.exports = withNavigationContext(TermsScreen);
