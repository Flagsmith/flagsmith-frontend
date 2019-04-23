import ION from 'react-native-vector-icons/Ionicons';

import styleVariables from './app/style/project/style_variables';

const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const defaultIconProvider = ION;

const icons = {
    // 'ios-menu': [30, styleVariables.navColor],
    // 'ios-add': [30, styleVariables.navColor],
    // 'ios-chatbubbles': [34, styleVariables.navColor],
    // 'ios-home': [34, styleVariables.navColor],
    'md-close': [28, pallette.navColor],
    'ios-rocket': [28, pallette.navColor],
    'md-person': [28, pallette.navColor],
    'ios-globe': [28, pallette.navColor],
    'ios-arrow-back': [30, pallette.navColor],
    'md-settings': [28, pallette.navColor],
    // 'md-more': [30, styleVariables.navColor],
    // 'ios-arrow-back': [30, styleVariables.navColor],
    // 'ios-search': [30, styleVariables.navColor],
};

global.iconsMap = {};
module.exports = () => new Promise((resolve) => { // cache all icons as images
    // eslint-disable-next-line
    new Promise.all(
        Object.keys(icons).map((iconName) => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1],
            );
        }),
    ).then((sources) => {
        Object.keys(icons)
            .forEach((iconName, idx) => global.iconsMap[iconName] = sources[idx]);

        global.navbarStyle = {
            statusBar: {
                style: 'light'
            },
            topBar: {
                elevation: 0,
                noBorder: true,
                background: {
                    translucent: false,
                    color: pallette.navBarBackground,
                },
                title: {
                    color: pallette.navBarText,
                },
                subtitle: {
                    fontSize: 10,
                    color: pallette.navBarSubtitle,
                },
                backButton: {
                    title: '',
                    icon: iconsMap['ios-arrow-back'],
                    color: pallette.navBarText,
                },
            },
        };

        global.navbarWithTabsStyle = {
            statusBar: {
                style: 'light'
            },
            topBar: {
                elevation: 0,
                noBorder: true,
                drawBehind: true,
                visible: false,
                title: {
                    color: pallette.navBarText,
                },
                subtitle: {
                    fontSize: 10,
                    color: pallette.navBarSubtitle,
                },
                backButton: {
                    title: '',
                    icon: iconsMap['ios-arrow-back'],
                    color: pallette.navBarText,
                },
            },
        };

        global.backHidden = {
            topBar: {
                backButton: {
                    visible: false,
                },
            },
        };

        global.navbarHidden = {
            topBar: {
                drawBehind:true,
                visible: false,
                elevation: 0,
            },
            bottomTabs: {
                drawBehind: true,
                visible: false,
            },
            backButton: {
                title: '',
                color: pallette.navBarText,
            },
        };

        global.tabsHidden = {
            bottomTabs: {
                drawBehind: true,
                visible: false,
            },
            backButton: {
                // title: '',
                color: pallette.navBarText,
            },
        };

        module.exports = {

            navIcon: {
                fontSize: 28,
                color: 'white',
                marginTop: 10,
            },

            barText: {
                color: 'black',
            },

        };
        // Call resolve (and we are done)
        resolve(true);
    });
});
