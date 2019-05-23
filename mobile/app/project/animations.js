import * as Animatable from 'react-native-animatable';
import { Easing } from 'react-native';

Animatable.initializeRegistryWithDefinitions({
    basicListEntrance: {
        from: { opacity: 0, 'translateX': 20 },
        to: { opacity: 1, 'translateX': 0 },
    },
    basicListEntranceFade: {
        from: { opacity: 0, 'translateX': 40 },
        to: { opacity: 1, 'translateX': 0 },
    },
});

global.Animatable = Animatable;

const acceleration = Easing.bezier(0.4, 0.0, 1, 1);
const deceleration = Easing.bezier(0.0, 0.0, 0.2, 1);
const standard = Easing.bezier(0.4, 0.0, 0.2, 1);
global.Animations = {
    acceleration, // See https://material.io/design/motion/speed.html#easing
    deceleration, // See https://material.io/design/motion/speed.html#easing
    standard, // See https://material.io/design/motion/speed.html#easing
    listItem: {
        useNativeDriver: true,
        animation: 'basicListEntrance',
        duration: 150,
        easing: acceleration,
    },
};