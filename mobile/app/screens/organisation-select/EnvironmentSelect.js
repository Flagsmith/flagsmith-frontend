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

    selectEnvironment = (item)=> {
        const data = {
            orgId: this.props.organisation.id,
            projectId: this.props.project.id,
            environmentId: item.api_key
        };
        console.log(data)
        AsyncStorage.setItem('lastEnv', JSON.stringify(data));
        AppActions.selectEnvironment(data);
        this.props.onComplete(this.props.componentId);
    }

    render() {
        return (
            <ProjectProvider id={this.props.project.id}>
                {({isLoading, project}) => (
                    <Flex>
                        <Flex>
                            <Select
                                placeholder="Search"
                                items={isLoading ? [1] : project.environments}
                                multiple={false}
                                filterItem={(item, search) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1}
                                renderRow={item => isLoading ? (
                                    <Loader/>
                                ) : (
                                    <ListItem index={1} onPress={()=>this.selectEnvironment(item)}>
                                        <Text style={Styles.listItemTitle}>{item.name}</Text>
                                        <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                                    </ListItem>
                                )}
                            />
                        </Flex>
                    </Flex>
                )}
            </ProjectProvider>
        );
    }
};

module.exports = MarkupScreen;
