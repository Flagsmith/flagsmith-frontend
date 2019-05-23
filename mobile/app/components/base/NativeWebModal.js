import propTypes from 'prop-types';
import { WebView } from 'react-native-webview';

const WebModal = class extends React.PureComponent {
    static displayName = 'WebModal'

    static propTypes = {
        componentId: propTypes.string,
        uri: propTypes.string.isRequired,
    }

    onNavigatorEvent(event) { // todo
        if (event.id === 'close' || event.id === 'back') {
            Navigation.dismissModal(this.props.componentId);
        } else {
            this.refs.webview.goBack();
        }
    }

    onNavigationStateChange = (navState) => {
        // const buttons = navState.canGoBack ? {
        //     leftButtons: [
        //         {
        //             icon: global.iconsMap['ios-arrow-back'], // for icon button, provide the local image asset name
        //             id: 'back2', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //         },
        //     ],
        // } : {
        //     leftButtons: [
        //         {
        //             icon: global.iconsMap['ios-arrow-back'], // for icon button, provide the local image asset name
        //             id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //         },
        //     ],
        // };
        //
        // this.props.navigator.setButtons(buttons);
    };

    render() {
        return (
            <Flex>
                <WebView
                  onNavigationStateChange={this.onNavigationStateChange}
                  ref="webview"
                  style={{ flex: 1 }}
                  source={{ uri: this.props.uri }}
                  scalesPageToFit
                />
            </Flex>
        );
    }
};

module.exports = WebModal;
