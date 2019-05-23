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

    selectProject = (item)=> {
        AppActions.getProject(item.id);
        Navigation.push(this.props.componentId, routes.environmentSelect(this.props.organisation, item, this.props.onComplete))
    }

    render() {
        return (
            <OrganisationProvider id={this.props.organisation.id}>
                {({ isLoading, projects }) => (
                    <Flex>
                        <Flex>
                            <Select
                                placeholder="Search"
                                items={isLoading ? [1] : projects}
                                multiple={false}
                                filterItem={(item, search) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1}
                                renderRow={item => isLoading ? (
                                    <View style={Styles.centeredContainer}>
                                    <Loader/>
                                    </View>
                                ) : (
                                    <ListItem index={1} onPress={()=>this.selectProject(item)}>
                                        <Text style={Styles.listItemTitle}>{item.name}</Text>
                                        <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                                    </ListItem>
                                )}
                            />
                        </Flex>
                    </Flex>
                )}
            </OrganisationProvider>
        );
    }
};

module.exports = MarkupScreen;
