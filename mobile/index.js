import { Navigation } from 'react-native-navigation';
import crashlytics from 'react-native-fabric-crashlytics';

import './app/project/globals';
import './app/routes';
import loadIcons from './load-icons';

const getUser = () => new Promise((resolve) => {
    setTimeout(() => {
        AsyncStorage.getItem('t', (err, t) => { // Load the user from async storage
            AsyncStorage.getItem('user', (err, res) => { // Load the user from async storage
                if (res) {
                    AccountStore.setToken(t);
                    AccountStore.setUser(JSON.parse(res));
                    setTimeout(() => {
                        AsyncStorage.getItem('lastEnv')
                            .then(lastEnvRes => {
                                if (lastEnvRes) {
                                    const lastEnv = JSON.parse(lastEnvRes);
                                    const lastOrg = _.find(AccountStore.getUser().organisations, { id: lastEnv.orgId }) || AccountStore.getUser().organisations[0];
                                    const org = AccountStore.getOrganisation();
                                    if (!org || org.id !== lastOrg.id) {
                                        AppActions.selectOrganisation(lastOrg.id);
                                    }
                                    AppActions.selectEnvironment(lastEnv);
                                    AppActions.getOrganisation(lastOrg.id);
                                    resolve({ res, environment: true });
                                } else {
                                    resolve({ res });
                                }
                            });
                    }, 100)
                } else {
                    resolve({ res });
                }
            });
        })
    }, Constants.simulate.NEW_USER ? 500 : 0);
});

const initialiseApp = (user,environment) => {
    global.modalNavButtons = {
        topBar: {
            leftButtons: [],
            rightButtons: [
                {
                    icon: global.iconsMap['md-close'], // for icon button, provide the local image asset name
                    id: 'close', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                },
            ],
        },
    };

    // Determine the initial route\
    let screen = user?routes.featuresScreen():routes.homeScreen();
    if (environment) {
        screen = routes.featuresScreen();
    }
    const defaultOptions = {
        topBar: {
            elevation: 0,
        },
    };
    const duration = 400;
    // const duration = null;
    const fromFade = 0;
    const toFade = 1;
    const fromX = DeviceWidth;
    const toX = 0;

    if (Platform.OS === 'android') {
        defaultOptions.animations = {
            push: {
                content: {
                    x: {
                        from: fromX,
                        to: toX,
                        interpolation: 'decelerate',
                    },
                    alpha: {
                        from: fromFade,
                        to: toFade,
                        duration,
                        interpolation: 'decelerate',
                    },
                },
            },
            pop: {
                topBar: {
                    alpha: {
                        from: toFade,
                        to: fromFade,
                    },
                },
                content: {
                    x: {
                        from: toX,
                        to: fromX * 2.5,
                        duration,
                        interpolation: 'accelerateDecelerate',
                    },
                    alpha: {
                        from: toFade,
                        to: fromFade,
                        duration,
                        interpolation: 'accelerateDecelerate',
                    },
                },
            },
        };
    } else {
        defaultOptions.animations = {
            setStackRoot: {
                enabled: true
            }
        }
    }
    // Navigation.setDefaultOptions(defaultOptions);

    Navigation.setRoot({
        root: {
            ...routes.dashboardScreen(screen),
        },
    });
};


Navigation.events().registerAppLaunchedListener(() => {
    Promise.all([
        getUser(),
        loadIcons(),
    ])
        .then(([{res,environment}]) => {
            initialiseApp(res,environment);
        });
});

// eslint-disable-next-line
console.disableYellowBox = true;
crashlytics.init();

if (Constants.simulate.NOT_ACCEPTED_TERMS) {
    AsyncStorage.removeItem(Constants.strings.ACCEPTED_TERMS);
}
