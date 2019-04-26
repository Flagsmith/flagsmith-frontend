/**
 * Created by kylejohnson on 28/01/2017.
 */
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import propTypes from 'prop-types';
import TextInput from "../components/base/forms/TextInput";
import Logo from "../components/Logo";
import Background from "../components/Background";

export const HomeInput = props => (
    <TextInput {...props} lineColour="white" placeholderTextColor="white"
               style={{ borderBottomColor: 'white', color: 'white' }}
    />
);
export const HomeButton = props => (
    <Button {...props} style={[{ backgroundColor: 'white' }, props.style]} textStyle={{ color: 'black' }}/>
);
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
        API.trackPage("Home");
    }

    onLogin = () => {
        Navigation.setStackRoot(this.props.componentId, routes.organisationSelect(true,(componentId)=>{
            Navigation.setStackRoot(componentId, routes.featuresScreen())
        }))
    }

    render() {
        const { state: { email, password } } = this;
        const canLogin = Utils.isValidEmail(email) && password
        return (
            <Fade autostart value={1} style={{ flex: 1 }}>
                <LinearGradient style={[{ flex: 1 }]} colors={['#2cd6ca', '#22354a']}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                >
                    <AccountProvider onLogin={this.onLogin}>
                        {({ isLoading, isSaving, error }, { login, loginDemo }) => (
                            <View style={{ alignItems: 'center', }}>
                                <View style={{ position: 'absolute',paddingTop: DeviceHeight * .25, top: DeviceHeight / 2.5, left: -200 }}>
                                    <Background/>
                                </View>
                                <View
                                    bounces={false}
                                    keyboardShouldPersistTaps="handled"
                                    style={{ paddingTop:DeviceHeight*.1, width: DeviceWidth / 1.5 }}>
                                    <View style={Styles.centeredContainer}>
                                        <Logo/>
                                    </View>
                                    <FormGroup>
                                        <HomeInput
                                            onChangeText={email => this.setState({ email })}
                                            value={email}
                                            placeholder="Email Address"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <HomeInput
                                            onChangeText={password => this.setState({ password })}
                                            value={password}
                                            secureTextEntry={true}
                                            placeholder="Password"
                                        />
                                    </FormGroup>
                                    {error && (
                                        <FormGroup style={Styles.centeredContainer}>
                                            <Text style={{ color: 'white', textAlign: 'center' }}>Could not login,
                                                please check your details and try again</Text>
                                        </FormGroup>
                                    )}
                                    <FormGroup style={Styles.centeredContainer}>
                                        <HomeButton
                                            disabled={!canLogin || isLoading}
                                            onPress={() => {
                                                login({ email, password });
                                            }}
                                            style={{ width: 200 }}
                                        >
                                            Login
                                        </HomeButton>
                                    </FormGroup>
                                    <View style={Styles.centeredContainer}>
                                        <TouchableOpacity onPress={loginDemo}>
                                            <Text style={{
                                                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                                textShadowOffset: {width: -2, height: 1},
                                                textShadowRadius: 20,
                                                color: 'white'
                                            }}>
                                                Login to Demo account
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    </AccountProvider>
                </LinearGradient>
            </Fade>
        );
    }
};

module
    .exports = TermsScreen;
