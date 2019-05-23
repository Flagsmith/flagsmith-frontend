/**
 * Created by kylejohnson on 18/04/2016.
 */
import { PixelRatio } from 'react-native';

const em = require('../base/style_pxToEm');

window.pallette = Object.assign({}, {

    bodyBackground: '#fff', // General app  background
    primary: '#3896DF',
    secondary: '#D8315B',
    success: '#3CBF88',
    divider: '#d1d1d1',
    textLight: '#a8a8a8',
    text: '#4c4c4c',

}, window.pallette);

//= = Other Variables

window.styleVariables = Object.assign({

    //= = Typography
    fontSizeBase: em(1),
    fontSizeH1: em(2.286), // 32px
    fontSizeH2: em(1.75), // 24px
    fontSizeH3: em(1.25), // 17px
    fontSizeH4: em(1), // 14px
    fontSizeParagraph: em(1.2), // 16px

    fontSizeAlert: em(1.1),
    fontSizeIcon: em(2),

    fontSizeAnchor: em(1.1),
    fontSizeAnchorIcon: em(2),
    fontSizeAnchorLarge: em(2),
    fontSizeAnchorIconLarge: em(2.6),


    // Buttons
    buttonHeight: 55,

    // Inputs
    fontSizeInputLarge: em(2),

    // Lists
    fontSizelistitem: em(1), // 10px
    fontSizelistTitle: em(0.857), // 12px

    button: 44,
    buttonTall: 54,

    //
    // ## Define common-mobile padding and border radius sizes and more.

    // Nav

    baseNavHeight: 44,
    marginBaseVertical: 10,
    marginBaseHorizontal: 10,
    paddingBase: 10,
    gutterBase: 5,
    borderWidth: 1,
    borderBottomWidth: 2 / PixelRatio.get(),
    disabledOpacity: 0.2,
    borderRadiusDefault: 8,

    // ## Notifications

    notificationWidth: 18,
    notificationHeight: 18,
    notificationBorderRadius: 12,
    notificationFontSize: 9,

    // Avatars
    avatarWidth: 64,
    avatarHeight: 64,
    avatarRadius: 32,

    avatarSmallWidth: 32,
    avatarSmallHeight: 32,
    avatarSmallRadius: 16,

    // Posts
    postWidth: 500,
    postHeight: 500,
}, window.styleVariables);

window.colour = Object.assign({}, pallette, {
    iosStyle: 0,
    buttonActiveOpacity: 0.8,
    disabledOpacity: 0.8,
    bodyBackground: '#ffffff', // General app  background
    backdropBackground: 'rgba(0,0,0,0.2)',

    // text
    text: pallette.text, // General app text colour
    anchor: pallette.anchor, // General app text colour
    textLight: pallette.textLight, // General app text colour
    label: pallette.textLightest, // text color for labels

    // input
    input: pallette.text,
    inputBackground: '#fff',
    inputBorder: pallette.divider,
    placeholderTextColor: pallette.textLight,
    disabledText: pallette.textLight,

    // radio
    radio: '#ffffff',
    radioBorder: pallette.toggle,
    radioText: pallette.text,
    radioTextActive: pallette.text, // text color for labels
    radioActive: pallette.toggleActive,
    radioActiveBorder: pallette.toggleActive,

    // tabs
    tabIcon: pallette.primaryDark,
    tabBackground: 'white',
    tabActive: pallette.primary,
    tabText: pallette.text,

    // notifications
    notification: pallette.primary,
    notificationText: '#fff',

    // switch

    switchActive: pallette.toggleActive, // text color for labels
    switchActiveBackground: pallette.toggleActiveAlt, // text color for labels

    // Menu.js
    menuDivider: pallette.divider,
    menu: pallette.secondary,
    menuItemText: pallette.text,

    // list items
    listBackground: 'white',
    listBackgroundAlt: '#f9f9fa',
    listItem: 'transparent',
    listItemNav: '#d9d9d9',
    listItemDivider: pallette.divider,

    dividerAlt: pallette.secondary,

    // Loader.js
    loader: pallette.text,

    // BUTTON / SELECT COLOURS

    buttonDefault: pallette.primary,
    btnAlt: pallette.primary,

    modalBackground: 'white',

    panel: '#f1f1f1',

    // nav
    navBar: pallette.primary,
    navBarIcon: 'white',
    // navBarSubtitle: pallette.secondary,
    navBarButtonText: 'white',
    navBarBorder: 'transparent',
    navBarText: 'black',
    alert: 'red',
    avatar: '#dbdbdb',

    facebook: '#3b5998',
    twitter: '#1DA1F3',
    google: '#dd4b39',

}, window.colour);
