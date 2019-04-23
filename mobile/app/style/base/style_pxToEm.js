import { Dimensions } from 'react-native';
// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;

// We set our base font size value
const baseUnit = 16;
// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX;

// We add an em() shortcut function
module.exports = global.em = function (value) {
    return unit * value;
};
