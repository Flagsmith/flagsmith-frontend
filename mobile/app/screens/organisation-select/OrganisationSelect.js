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

    selectOrganisation = (item)=> {
        AppActions.selectOrganisation(item.id);
        AppActions.getOrganisation(item.id);
        setTimeout(()=>{
            Navigation.push(this.props.componentId, routes.projectSelect(item, this.props.onComplete))
        },50)
    }

    render() {
        return (
            <AccountProvider>
                {({ organisation, organisations }, { selectOrganisation }) => (

                    <Flex>
                        <Flex>
                            <Select
                                placeholder="Search"
                                items={organisations}
                                onChange={this.selectItem}
                                filterItem={(item, search) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1}
                                multiple={false}
                                renderRow={item => (
                                    <ListItem index={1} onPress={()=>this.selectOrganisation(item)}>
                                        <Text style={Styles.listItemTitle}>{item.name}</Text>
                                        <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                                    </ListItem>
                                )}
                            />
                        </Flex>
                    </Flex>
                )}
            </AccountProvider>
        );
    }
};

module.exports = MarkupScreen;
