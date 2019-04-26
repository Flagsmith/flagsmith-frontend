/**
 * Created by kylejohnson on 28/01/2017.
 */
import React, { Component, PureComponent } from 'react';
import propTypes from 'prop-types';
import FeatureValue from "../../components/FeatureValue";
import withNavigationContext from "../../../common-mobile/providers/withNavigationContext";

// import propTypes from 'prop-types';

class Feature extends Component {
    static displayName = 'Feature';

    static propTypes = {};

    toggle = () => {
        const {
            props: {
                feature: { name, id, created_date, type }, enabled, environmentFlags, projectFlags, toggleFlag, confirmToggle
            }
        } = this
        const i = _.findIndex(projectFlags, { id })

        confirmToggle(projectFlags[i], environmentFlags[id], (environments) => {
            toggleFlag(i, environments)
        })
    }

    route = () => {
        const {
            props: {
                selectedEnvironment,
                feature: { name, id, created_date, type }, enabled, environmentFlags, projectFlags, confirmEdit, editFlag
            }
        } = this
        const i = _.findIndex(projectFlags, { id })

        confirmEdit(projectFlags[i], environmentFlags[id], (environments) => {
            editFlag(i, environments)
        })
    }

    render() {
        const {
            props: {
                feature: { name, id, created_date, type }, enabled, environmentFlags, projectFlags,
            }
        } = this;

        const i = _.findIndex(projectFlags, { id })
        return (
            <ListItem key={id} onPress={type == "FLAG" ? this.toggle : this.route} index={1}>
                <Text style={Styles.listItemTitle}>
                    {name}{'\n'}
                    <Text style={Styles.listItemText}>
                        Created {moment(created_date).format("DD/MMM/YYYY")}
                    </Text>
                </Text>
                {type == "FLAG" ? (
                    <Switch
                        onChange={this.toggle}
                        trackColor={{ true: pallette.primaryAlt }}
                        value={enabled}
                    />
                ) : (
                    <FeatureValue
                        value={environmentFlags[id] && environmentFlags[id].feature_state_value}
                    />
                )}
            </ListItem>
        )
    }
}

class ControledSwitch extends Component {
    static displayName = 'TheComponent';

    static propTypes = {};

    render() {
        // const { props } = this;
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={this.props.onChange}>
                <View pointerEvents="none">
                    <Switch
                        {...this.props}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

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

        const {
            props: {
                orgId,
                projectId,
                environmentId
            }
        } = this;
        Navigation.events().bindComponent(this);
        if (projectId && environmentId) {
            AppActions.getFeatures(projectId, environmentId);
            AppActions.getProject(projectId);
            AppActions.getIdentities(environmentId);
        }

    }

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        if (nextProps.environmentId !== this.props.environmentId) {
            AppActions.getFeatures(nextProps.projectId, nextProps.environmentId);
            AppActions.getProject(nextProps.projectId);
            AppActions.getIdentities(nextProps.environmentId);
        }
    }

    route = () => {
        Navigation.setStackRoot(this.props.componentId, {
            component: {
                name: '/',
            }
        });
    }

    componentDidAppear() {
        global.featuresScreen = this.props.componentId;
    }

    confirmToggle = (projectFlag, environmentFlag, cb) => {
        const {
            props: {
                selectedEnvironment
            }
        } = this;
        const isEnabled = environmentFlag && environmentFlag.enabled ? true : false;

        Alert.alert(
            'Confirm',
            `This will turn ${Format.enumeration.get(projectFlag.name)} ${isEnabled ? "Off" : "On"} for ${selectedEnvironment.name}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                    },
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        cb([selectedEnvironment])
                    },
                },
            ],
            { cancelable: false },
        );
    }


    confirmEdit = (projectFlag, environmentFlag, cb) => {
        const { props: { selectedEnvironment, selectedProject } } = this;
        Navigation.showModal(routes.withStack(routes.editFeaturesScreen({
            projectFlag,
            environmentFlag,
            selectedEnvironment,
            selectedProject,
            cb
        })));
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <Flex space style={[Styles.body]}>
                <FeatureListProvider onSave={this.onSave} onError={this.onError}>
                    {({ isLoading, projectFlags, environmentFlags, lastSaved }, { environmentHasFlag, toggleFlag, editFlag, removeFlag }) => (
                        <Flex>
                            <Select
                                extraData={{lastSaved:lastSaved+""}}
                                placeholder="Search Features"
                                items={isLoading ? [1] : projectFlags}
                                multiple={false}
                                keyExtractor={this._keyExtractor}
                                filterItem={(item, search) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1}
                                renderRow={item => isLoading ? (
                                    <View style={Styles.centeredContainer}>
                                        <Loader/>
                                    </View>
                                ) : (
                                    <Feature
                                        key={item.id}
                                        confirmToggle={this.confirmToggle}
                                        confirmEdit={this.confirmEdit}
                                        feature={item}
                                        enabled={environmentFlags[item.id] && !!environmentFlags[item.id].enabled}
                                        environmentFlags={environmentFlags}
                                        projectFlags={projectFlags}
                                        toggleFlag={toggleFlag}
                                    />
                                )}
                            />
                        </Flex>
                    )}
                </FeatureListProvider>
            </Flex>
        );
    }
};

module.exports = withNavigationContext(TermsScreen);
