/**
 * Created by kylejohnson on 28/01/2017.
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Svg, {
    Circle,
    Rect,
} from 'react-native-svg';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

import Path from 'react-native-svg/elements/Path';
import AccountStore from '../../../common-mobile/stores/account-store';

const ExampleScreen = class extends Component {
    static propTypes = {
        componentId: propTypes.string,
    };

    static displayName = 'ExampleScreen';

    state = {};

    componentWillMount() {
        ES6Component(this);
        Navigation.events().bindComponent(this);
    }

    componentDidMount() {
        this.listenTo(AccountStore, 'change', () => this.forceUpdate());
        API.push.getInitialNotification()
            .then((e) => {
                if (e) this.onNotification(Object.assign({}, e, { fromClick: true }));
            });
    }

    onNavigatorEvent = (event) => {
        if (event.id === routes.navEvents.SHOW) {
            this.props.navigator.setDrawerEnabled({ side: 'right', enabled: true });
            API.trackPage('Home Screen');
        } else if (event.id === routes.navEvents.HIDE) {
            this.props.navigator.setDrawerEnabled({ side: 'right', enabled: false });
        }
    };

    getInitialLink = () => {
        API.getInitialLink(this.onLink);
    }

    showUpload = () => {
        API.showUpload('Upload a file', false, 100, 100, 0.8, () => {
            this.setState({ isUploading: true });
        })
            .then((res) => {
                alert(JSON.stringify(res));
            });
    };

    openSelect = () => {
        Navigation.showModal(
            routes.selectModal('Select a thing', {
                items: ['item 1', 'item 2'],
                filterItem: (contact, search) => contact.indexOf(search) !== -1,
                onChange: options => this.setState({ options }),
                renderRow: (item, isSelected, toggleItem) => (
                    <ListItem onPress={toggleItem}>
                        <Text>{item}</Text>
                        <Checkbox value={isSelected}/>
                    </ListItem>
                ),
            }),
        );
    };

    selectContact = () => {
        Navigation.showModal(
            routes.contactSelectModal('Select Contact', (contact) => {
                this.setState({ contacts: [contact] });
            }),
        );
    };

    selectMultipleContacts = () => {
        Navigation.showModal(
            routes.contactSelectModal('Select Contacts', (contact) => {
                this.setState({ contacts: [contact] });
            }, true),
        );
    };

    showExampleLightbox = () => {
        Navigation.showOverlay(routes.exampleLightbox());
    };

    openWebModal = () => {
        Navigation.showModal(routes.webModal('https://www.google.com', 'Google'));
    };

    generateLink = () => {
        API.generateLink('SSG Boilerplate', {
            route: {
                screen: 'aboutScreen',
                data: {
                    customData: 'bla',
                },
            },
        }, 'www.solidstategroup.com')
            .then((branchURL) => {
                this.setState({ branchURL });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    registerPush = () => {
        if (this.state.token) {
            this.setState({ token: null });
            API.push.unsubscribe('/topics/all');
            API.push.stop();
        } else {
            this.initPush(false);
        }
    };

    initPush = (silent) => {
        API.push.init(this.onNotification, silent)
            .then((token) => {
                API.push.subscribe('/topics/all');
                this.setState({ token });
            });
    };


    onLink = (notification) => {
        if (notification.route) {
            const route = notification.route;
            if (routes[route.screen]) this.props.navigator.push(routes[route.screen](route.data));
        }
    }

    onNotification = (notification) => {
        if (notification.fromClick) {
            if (notification.route) {
                const route = JSON.parse(notification.route);
                if (routes[route.screen]) this.props.navigator.push(routes[route.screen](route.data));
            }
        }
    };

    triggerError = () => {
        console.log({}.hell.no);
    };

    googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const googleUserInfo = await GoogleSignin.signIn();
            this.setState({ googleUserInfo, error: null });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // sign in was cancelled
                Alert.alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation in progress already
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play services not available or outdated');
            } else {
                Alert.alert('Something went wrong', error.toString());
                this.setState({
                    error,
                });
            }
        }
    };

    render() {
        const { state: { uri, googleUserInfo }, props: { componentId } } = this;
        return (
            <Flex testID="example-screen">
                <Fade value={1} style={[{ flex: 1 }, Styles.body]} autostart>
                    <Flex>
                        <ScrollView keyboardShouldPersistTaps="handled">
                            <Row>
                                <Flex value={1}>
                                    <Container>
                                        <FormGroup>
                                            <TextInput
                                              onChangeText={val => this.setState({ val })}
                                              value={this.state.val}
                                              placeholder="Example input"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <TextInput
                                              onChangeText={val2 => this.setState({ val2 })}
                                              value={this.state.val2}
                                              mask="11:11 am"
                                              placeholder="Example input"
                                            />
                                        </FormGroup>
                                    </Container>
                                </Flex>
                                <Flex/>
                            </Row>
                            <View style={Styles.centeredContainer}>
                                <Loader/>
                            </View>

                            <Text>Auto height image</Text>
                            <AutoHeightImage source={{ uri: 'https://www.placecage.com/c/400/200' }} width={DeviceWidth - 20} />

                            <Button onPress={() => this.setState({ showDatepicker: true })}>
                                Show DatePicker
                            </Button>
                            <DateTimePicker
                              isVisible={this.state.showDatepicker}
                              onConfirm={date => this.setState({ showDatepicker: false, date })}
                              onCancel={() => this.setState({ showDatepicker: false })}
                            />
                            {this.state.date ? (
                                <Text>
You picked
                                    {' '}
                                    {moment(this.state.date).toString()}
                                </Text>
                            ) : null}


                            {this.state.branchURL && (
                                <Fade value={1} autostart>
                                    <Container>
                                        <TextInput value={this.state.branchURL} style={Styles.anchor}/>
                                    </Container>
                                </Fade>
                            )}


                            <ListItem
                              index={0} icon={(
                                  <ION
                                    name="ios-notifications"
                                    style={[Styles.listIcon, { color: pallette.secondary }]}
                                  />
                            )}
                            >
                                <Text>Register for Push</Text>
                                <ReactNative.Switch
                                  value={!!this.state.token}
                                  onChange={this.registerPush}
                                />
                            </ListItem>

                            <GoogleSigninButton
                              style={{ width: 192, height: 48 }}
                              size={GoogleSigninButton.Size.Wide}
                              color={GoogleSigninButton.Color.Dark}
                              onPress={this.googleSignIn}
                            />
                            {googleUserInfo ? (
                                <Text>
You are signed in with Google as
                                    {' '}
                                    {googleUserInfo.user.name}
                                </Text>
                            ) : null}

                            <FBLogin
                              style={{ marginBottom: 10 }}
                              ref={(fbLogin) => { this.fbLogin = fbLogin; }}
                              permissions={['email', 'user_friends']}
                              loginBehavior={FBLoginManager.LoginBehaviors.Native}
                              onLogin={(data) => {
                                  console.log('Logged in!');
                                  console.log(data);
                                  this.setState({ fbUser: data.credentials });
                              }}
                              onLogout={() => {
                                  console.log('Logged out.');
                                  this.setState({ fbUser: null });
                              }}
                              onLoginFound={(data) => {
                                  console.log('Existing login found.');
                                  console.log(data);
                                  this.setState({ fbUser: data.credentials });
                              }}
                              onLoginNotFound={() => {
                                  console.log('No user logged in.');
                                  this.setState({ fbUser: null });
                              }}
                              onError={(err) => {
                                  console.log('ERROR');
                                  console.log(err);
                              }}
                              onCancel={() => {
                                  console.log('User cancelled.');
                              }}
                              onPermissionsMissing={(data) => {
                                  console.log('Check permissions!');
                                  console.log(data);
                              }}
                            />

                            <ListItem index={1} onPress={() => Navigation.push(componentId, routes.markupScreen())}>
                                <Text>Markup</Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>

                            <ListItem index={1} onPress={() => Navigation.push(componentId, routes.aboutScreen())}>
                                <Text>About</Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>

                            <ListItem index={1} onPress={this.showExampleLightbox}>
                                <Text>Example Lightbox</Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>

                            <ListItem
                              index={1} onPress={() => Navigation.push(componentId, routes.interactiveScreen())}
                            >
                                <Text>Interactive examples</Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>

                            <ListItem
                              index={1} onPress={this.openWebModal}
                            >
                                <Text>Web modal</Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>

                            <ListItem index={2} onPress={this.showUpload}>
                                <Text>Show Upload</Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>

                            <ListItem index={3} onPress={this.selectContact}>
                                <Text>
                                    Select Contact
                                    {' '}
                                    {this.state.contacts
                                    && (
                                        <Text>
                                            (
                                            {_.map(this.state.contacts, 'givenName').join(',')}
                                            )
                                        </Text>
                                    )
                                    }
                                </Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>
                            <ListItem index={4} onPress={this.selectMultipleContacts}>
                                <Text>
                                    Select Multiple Contacts
                                    {' '}
                                    {this.state.contacts
                                    && (
                                        <Text>
                                            (
                                            {_.map(this.state.contacts, 'givenName').join(',')}
                                            )
                                        </Text>
                                    )
                                    }
                                </Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>


                            <ListItem index={5} onPress={this.openSelect}>
                                <Text>Generic Select</Text>
                                <ION name="ios-arrow-forward" style={[Styles.listIconNav]}/>
                            </ListItem>

                            <ListItem index={6} onPress={() => API.share('www.google.com', 'Just google')}>
                                <Text style={Styles.anchor}>Share something</Text>
                            </ListItem>

                            <ListItem index={8} onPress={this.generateLink}>
                                <Text style={[Styles.anchor]}>Generate branch link</Text>
                            </ListItem>
                            <ListItem index={9} onPress={this.getInitialLink}>
                                <Text style={[Styles.anchor]}>Get initial branch link</Text>
                            </ListItem>

                            <ListItem index={7} onPress={this.triggerError}>
                                <Text style={[Styles.anchor, { color: 'red' }]}>
                                    Trigger Crashlytics error (this will crash the app)
                                </Text>
                            </ListItem>

                            {uri ? (
                                <Image
                                  style={{ height: 100, width: 100 }} resizeMode="contain"
                                  source={{ uri }}
                                />
                            ) : null}

                            <Svg style={{alignSelf:'center'}} height="126pt" viewBox="0 -21 512 512" width="126"><Path d="M301 394.703v30c0 24.899-20.098 45-45 45s-45-20.101-45-45v-30c0-8.402 6.598-15 15-15h60c8.402 0 15 6.598 15 15zm0 0" fill="#4a696f" /><Path d="M301 394.703v30c0 24.899-20.098 45-45 45v-90h30c8.402 0 15 6.598 15 15zm0 0" fill="#384949" /><Path d="M256 19.703c-94.2 0-165 75.899-165 165 0 53.399 25.5 103.5 70.2 135 12.3 8.7 19.8 24 19.8 41.098v3.902c0 24.899 20.098 45 45 45h60c24.902 0 45-20.101 45-45v-4.8c0-16.2 8.7-31.801 23.7-43.2 42-31.5 66.3-79.5 66.3-132 0-90.601-72.898-164.7-165-165zm0 0" fill="#ffe470" /><Path d="M421 184.703c0 52.5-24.3 100.5-66.3 132-15 11.399-23.7 27-23.7 43.2v4.8c0 24.899-20.098 45-45 45h-30v-390c92.102.3 165 74.399 165 165zm0 0" fill="#fdbf00" /><Path d="M497 199.703h-31c-8.29 0-15-6.71-15-15 0-8.293 6.71-15 15-15h31c8.29 0 15 6.707 15 15 0 8.29-6.71 15-15 15zm0 0" fill="#f4d7af" /><Path d="M46 199.703H15c-8.29 0-15-6.71-15-15 0-8.293 6.71-15 15-15h31c8.29 0 15 6.707 15 15 0 8.29-6.71 15-15 15zm0 0" fill="#faecd8" /><Path d="M393.887 46.816c-5.86-5.859-5.86-15.351 0-21.21l21.21-21.211c5.86-5.86 15.352-5.86 21.212 0s5.859 15.351 0 21.21l-21.211 21.211c-5.86 5.86-15.352 5.86-21.211 0zm0 0" fill="#f4d7af" /><Path d="M75.691 365.012c-5.859-5.86-5.859-15.352 0-21.211l21.211-21.211c5.86-5.86 15.352-5.86 21.211 0 5.86 5.855 5.86 15.351 0 21.21l-21.21 21.212c-5.86 5.86-15.352 5.86-21.212 0zm0 0M96.902 46.816l-21.21-21.21c-5.86-5.86-5.86-15.352 0-21.211 5.859-5.86 15.351-5.86 21.21 0l21.211 21.21c5.86 5.86 5.86 15.352 0 21.211s-15.351 5.86-21.21 0zm0 0" fill="#faecd8" /><Path d="M415.098 365.012L393.887 343.8c-5.86-5.86-5.86-15.356 0-21.211 5.86-5.86 15.351-5.86 21.21 0l21.212 21.21c5.859 5.86 5.859 15.352 0 21.212s-15.352 5.86-21.211 0zm0 0" fill="#f4d7af" /><Path d="M339.402 202.102l-79.203-52.5L284.5 101.3c3.3-6.598 1.2-14.399-4.8-18.899-6-4.199-14.098-3.601-19.2 1.801l-90 90c-3.3 3-4.8 7.5-4.5 12 .602 4.5 3 8.399 6.598 11.098l79.203 52.5-24.301 48.3c-3.3 6.602-1.2 14.403 4.8 18.903 6 4.2 14.098 3.598 19.2-1.8l90-90c3.3-3 4.8-7.5 4.5-12-.602-4.5-3-8.403-6.598-11.102zm0 0" fill="#fdbf00" /><Path d="M346 213.203c.3 4.5-1.2 9-4.5 12l-85.5 85.5v-222l4.5-4.5c5.102-5.402 13.2-6 19.2-1.8 6 4.5 8.1 12.3 4.8 18.898l-24.3 48.3 79.202 52.5c3.598 2.7 5.996 6.602 6.598 11.102zm0 0" fill="#ff9f00" /></Svg>

                            <Text style={Styles.textCenter}>
                                {`You are using a ${DeviceInfo.getModel()}`}
                            </Text>


                        </ScrollView>
                    </Flex>
                </Fade>
            </Flex>
        );
    }
};

module.exports = ExampleScreen;
