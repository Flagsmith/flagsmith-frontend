import { Navigation } from 'react-native-navigation';

const routes = {

    // The initial screen
    homeScreen: () => ({
        component: {
            name: '/',
            options: _.merge({}, global.navbarStyle, global.navbarHidden),
        },
    }),

    // The initial screen
    usersScreen: () => ({
        component: {
            name: '/users',
            options: _.merge({},global.backHidden, global.navbarWithTabsStyle,global.navbarStyle, routes.withProjectNav('usersScreen')),
        },
    }),

    // The initial screen
    settingsScreen: () => ({
        component: {
            name: '/settings',
            options: _.merge({},global.backHidden, global.navbarWithTabsStyle),
        },
    }),
    // The initial screen
    segmentsScreen: () => ({
        component: {
            name: '/segments',
            options: _.merge({},global.backHidden, global.navbarWithTabsStyle,global.navbarStyle, routes.withProjectNav('segmentsScreen')),
        },
    }),
    // The initial screen
    featuresScreen: () => ({
        component: {
            name: '/features',
            options: _.merge({},global.backHidden, global.navbarWithTabsStyle, routes.withProjectNav('featuresScreen')),
        },
    }),
    // The initial screen
    organisationSelect: (isFromLogin,onComplete) => ({
        component: {
            name: '/organisationSelect',
            passProps: {onComplete},
            options: _.merge({}, global.navbarStyle, global.tabsHidden, routes.withTitle("Select your Organisation"),isFromLogin? {
                topBar: {
                    leftButtons: [
                        {
                            color: pallette.navBarText,
                            icon: iconsMap['ios-arrow-back'],
                            id: 'logout', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                        },
                    ],
                }
            } : backHidden),
        },
    }),
    // The initial screen
    projectSelect: (organisation,onComplete) => ({
        component: {
            name: '/projectSelect',
            passProps:{organisation,onComplete},
            options: _.merge({}, global.navbarStyle, global.tabsHidden, routes.withTitle("Select your Project")),
        },
    }),


    // The initial screen
    environmentSelect: (organisation,project, onComplete) => ({
        component: {
            name: '/environmentSelect',
            options: _.merge({}, global.navbarStyle, global.tabsHidden,  routes.withTitle("Select your Environment")),
            passProps: {organisation,project, onComplete}
        },
    }),


    // Standardised routing for logging out
    logout(componentId) {
        Alert.alert(
            'Confirm',
            'Are you sure you want logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        AppActions.setUser(null);
                        Navigation.setRoot({
                            root: {
                                ...routes.dashboardScreen(routes.homeScreen()),
                            },
                        });
                    },
                },
            ],
            { cancelable: false },
        );

    },

    editFeaturesScreen: (passProps) => ({
        component: {
            name: '/editFeature',
            passProps:{...passProps, isEdit:true},
            options: _.merge({}, global.navbarStyle, global.modalNavButtons, routes.withTitle("Edit Feature")),
        },
    }),

    // Initial tab upon logging in
    dashboardScreen: (screen) => ({
        bottomTabs: {
            children: [
                routes.withStack(screen, {
                    // eslint-disable-next-line
                    bottomTab: routes.tab('Features', iconsMap['ios-rocket']),
                }),
                routes.withStack(routes.usersScreen(), {
                    // eslint-disable-next-line
                    bottomTab: routes.tab('Users', iconsMap['md-person']),
                }),
                // routes.withStack(routes.segmentsScreen(), {
                //     // eslint-disable-next-line
                //     bottomTab: routes.tab('Segments', iconsMap['ios-globe']),
                // }),
                routes.withStack(routes.settingsScreen(), {
                    // eslint-disable-next-line
                    bottomTab: routes.tab('Settings', iconsMap['md-settings']),
                }),
            ],
            options: {
                titleDisplayMode: 'alwaysShow',
                bottomTabs: {
                    animate: false, // Controls whether BottomTabs visibility changes should be animated
                    drawBehind: false,
                    backgroundColor: '#22354a',
                }
            },
        },
    }),

    webModal: (uri, title) => routes.withStack({
        component: {
            name: '/webmodal',
            passProps: { uri },
            options: _.merge({}, global.navbarStyle, global.modalNavButtons, {
                topBar: { title: { text: title || '' } },
            }),
        },
    }),

    withTitle: (title) => ({
        topBar: { title: { text: title || '' } }
    }),

    withProjectNav: (id) => ({
        topBar: {
            elevation: 1,
            noBorder: true,
            drawBehind: false,
            visible: true,
            background: {
                translucent: false,
                color: pallette.navBarBackground,
            },
            title: {
                component: {
                    name: 'projectnav',
                    alignment: 'fill',
                    passProps: {id}
                }
            }

        }
    }),

    navEvents: {
        WILL_SHOW: 'willAppear',
        SHOW: 'didAppear',
        HIDE: 'didDisappear',
    },

    // Shorthand for wrapping a screen in a stack
    withStack: (screen, options) => ({
        stack: {
            children: [screen],
            options,
        },
    }),

    // Shorthand for wrapping a screen in a stack
    tab: (title, image) => ({
        text: title,
        icon: image,
        iconColor: pallette.tabIcon,
        textColor: pallette.tabText,
        selectedIconColor: pallette.tabIconActive,
        fontSize: 12,
        selectedTextColor: pallette.tabTextActive,
        disableIconTint: true,
    }),

    selectModal: (title, { items, renderRow, onChange, multiple, filterItem, autoclose }) => routes.withStack({
        component: { name: '/select',
            passProps: { items, renderRow, onChange, multiple, filterItem, autoclose },
            options: _.merge({}, global.navbarStyle, global.modalNavButtons, {
                topBar: {
                    drawBehind: false,
                    background: {
                        color: pallette.bodyBackground,
                        translucent: false,
                    },
                },
            }),
        },
    }),

    // A styleguide screen used to show off all components
    markupScreen: () => ({
        component: {
            name: '/markup',
            options: { ...global.navbarStyle },
        },
    }),

    aboutScreen: () => ({
        component: {
            name: '/example/about',
            options: _.merge({}, global.navbarStyle, {
                topBar: {
                    title: {
                        text: 'About',
                    },
                },
            }),
        },
    }),

    interactiveScreen: () => ({
        component: {
            name: '/example/interactive',
            options: _.merge({}, global.navbarStyle, {
                topBar: {
                    title: {
                        text: 'Interactables',
                    },
                },
            }),
        },
    }),

    contactSelectModal: (title, onChange) => ({
        component: {
            name: '/contact-select',
            passProps: { onChange },
            options: _.merge({}, global.navbarStyle, global.modalNavButtons, {
                topBar: {
                    title: {
                        text: title || '',
                    },
                },
            }),
        },
    }),
};

// BASE Routes
Navigation.registerComponent('/markup', () => require('./screens/__MarkupScreen__'));
Navigation.registerComponent('/select', () => require('./components/base/SelectModal'));
Navigation.registerComponent('/webmodal', () => require('./components/base/NativeWebModal'));
Navigation.registerComponent('/contact-select', () => require('./components/base/ContactSelectModal'));

// Login
Navigation.registerComponent('/', () => require('./screens/HomeScreen'));

// Tabs
Navigation.registerComponent('/users', () => require('./screens/dashboard/UsersScreen'));
Navigation.registerComponent('/features', () => require('./screens/dashboard/FeaturesScreen'));
Navigation.registerComponent('/settings', () => require('./screens/dashboard/SettingsScreen'));
Navigation.registerComponent('/segments', () => require('./screens/dashboard/SegmentsScreen'));

// OrganisationSelect
Navigation.registerComponent('/organisationSelect', () => require('./screens/organisation-select/OrganisationSelect'));
Navigation.registerComponent('/projectSelect', () => require('./screens/organisation-select/ProjectSelect'));
Navigation.registerComponent('/environmentSelect', () => require('./screens/organisation-select/EnvironmentSelect'));
Navigation.registerComponent('projectnav', () => require('./components/ProjectNavigator'));
Navigation.registerComponent('/editFeature', () => require('./screens/EditFeatureScreen'));


// EXAMPLE Routes
Navigation.registerComponent('/example/lightbox', () => require('./screens/example/ExampleLightbox'));
Navigation.registerComponent('/example/about', () => require('./screens/example/AboutScreen'));
Navigation.registerComponent('/example/interactive', () => require('./screens/example/InteractiveScreen'));

Navigation.events().registerNavigationButtonPressedListener(({ buttonId, componentId }) => {
    if (buttonId === 'close') {
        Navigation.dismissModal(componentId);
    }
});

global.routes = routes;
module.exports = routes;



Navigation.events().registerNavigationButtonPressedListener(({ buttonId, componentId }) => {
   if (buttonId === 'logout') {
        routes.logout(componentId);
    }
});
