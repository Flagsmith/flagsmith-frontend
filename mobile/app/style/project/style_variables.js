import { NativeModules, PixelRatio } from 'react-native';

import { Platform, Dimensions } from 'react-native';

const em = require('../base/style_pxToEm');


const tabHeight = (() => {
    const isIphoneX = () => {
        let dimensions;
        if (Platform.OS !== 'ios') {
            return false;
        }
        if (Platform.isPad || Platform.isTVOS) {
            return false;
        }
        dimensions = Dimensions.get('window');
        if (dimensions.height === 812 || dimensions.width === 812) { // Checks for iPhone X in portrait or landscape
            return true;
        }
        if (dimensions.height === 896 || dimensions.width === 896) {
            return true;
        }
        return false;
    };

    if (isIphoneX()) {
        return 84; // iPhone X
    } if (Platform.OS == 'ios') {
        return 50; // Other iPhones
    }
    return 56; // Android
})();

window.pallette = {
    bodyBackground: '#fff', // General app  background
    primary: '#2cd6ca',
    primaryAlt: '#61d0de',
    secondary: '#D8315B',
    success: '#3CBF88',
    divider: '#d1d1d1',
    textLight: '#a8a8a8',
    textLighter: '#cacacf',
    text: '#4c4c4c',
    navColor:'white',
    tabBackground: '#22354a',
    tabText: 'white',
    tabTextActive: '#2cd6ca',
    tabIconActive: '#2cd6ca',
    navBarButtonText: 'white',
    navBarBorder: 'transparent',
    navBarText: 'white',
    navBarBackground: '#374e66',

};

window.styleVariables = Object.assign({


}, require('./style_platform_variables'));
