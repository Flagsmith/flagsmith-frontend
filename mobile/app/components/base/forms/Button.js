import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

export default class Button extends PureComponent {
    static displayName = 'Button';

    static propTypes = {
        onPress: propTypes.func, // What to do on press
        onPressIn: propTypes.func, // What to do on press in
        onPressOut: propTypes.func, // What to do on press out
        onLongPress: propTypes.func, // What to do on long press
        style: propTypes.any,
        textStyle: propTypes.object, // style for the button text
        disabled: propTypes.bool, // whether the button is disabled
        variation: propTypes.string, // a way to use predefined style variations (e.g. large, warning)
        testID: propTypes.string, // used for e2e testing
    };

    _computeActiveOpacity() {
        if (this.props.disabled) {
            return 1;
        }
        return colour.buttonActiveOpacity;
    }

    render() {
        const touchableProps = {
            activeOpacity: this._computeActiveOpacity(),
        };

        if (!this.props.disabled) {
            touchableProps.onPress = this.props.onPress || this.props.onClick;
            touchableProps.onPressIn = this.props.onPressIn;
            touchableProps.onPressOut = this.props.onPressOut;
            touchableProps.onLongPress = this.props.onLongPress;
        }

        // compute styles e.g. buttonGroupLeft, big, bigRight, buttonGroupText, bigText, but
        const groupStyle = [Styles.buttonGroup, this.props.style];

        const textStyle = [{ color: 'white', letterSpacing: 2, fontSize: 14 }, this.props.textStyle];

        return Platform.OS === 'android' && Platform.Version >= 21 ? (
            <View style={{ opacity: this.props.disabled ? 0.5 : 1 }}>
                <TouchableNativeFeedback
                  {...touchableProps}
                  background={TouchableNativeFeedback.Ripple('rgba(255,255,255,.5)')}
                  testID={this.props.testID}
                >
                    <View style={groupStyle}>
                        {typeof this.props.children === 'string' ? (
                            <Text style={textStyle}>{this.props.children.toUpperCase()}</Text>
                        ) : this.props.children}
                    </View>
                </TouchableNativeFeedback>
            </View>
        ) : (
            <View style={{ opacity: this.props.disabled ? 0.5 : 1 }}>
                <TouchableOpacity
                  {...touchableProps}
                  style={[groupStyle]}
                  testID={this.props.testID}
                >
                    {typeof this.props.children === 'string' ? (
                        <Text pointerEvents="none" style={textStyle}>{this.props.children.toUpperCase()}</Text>
                    ) : this.props.children}
                </TouchableOpacity>
            </View>
        );
    }
}


export const ButtonPrimary = props => <Button {...props} style={[{ backgroundColor: pallette.primary }, props.style]}/>;

export const ButtonSecondary = props => (
    <Button
      {...props}
      style={[{ backgroundColor: pallette.secondary }, props.style]}
    />
);
export const ButtonTertiary = props => <Button {...props} style={[{ backgroundColor: 'white', borderColor: pallette.CoolGray, borderWidth: 1 }, props.style]}/>;

export const ButtonAlt = props => <Button {...props} style={[{ backgroundColor: pallette.primaryDark }, props.style]}/>;

export const ButtonFlat = props => <Button {...props} style={[Styles.buttonWhiteShadow, props.style]}/>;

export const ButtonDashed = props => <Button {...props} style={[Styles.buttonDashed, props.style]}/>;

export const ButtonOutlinePrimary = props => <Button {...props} style={[Styles.buttonOutlinePrimary, props.style]}/>;

export const ButtonGoogle = props => <Button {...props} style={[{ backgroundColor: pallette.primaryDanger }, props.style]}/>;

export const TabPillButton = props => (
    <Button {...props} style={[styles.TabButtonPill, props.style]}>
        <Text
          pointerEvents="none" style={[
          styles.TabButtonPillText,
          props.textStyle,
      ]}
        >
            {props.children}
        </Text>
    </Button>
);

const styles = StyleSheet.create({
    TabButtonPill: {
        height: 34,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
    },
    TabButtonPillText: {
        color: pallette.primaryDark,
    },
});
