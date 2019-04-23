module.exports = {

    hero: {
        overflow: 'hidden',
        paddingTop: styleVariables.marginBaseVertical,
        backgroundColor: 'transparent',
    },
    bodyAlt: {
        backgroundColor: pallette.backgroundLight,
    },

    bodyWithTabs: {
        backgroundColor: pallette.bodyBackground,
    },

    shadow: {
        shadowColor: '#333',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },

    // ICONS
    iconDefault: {
        height: 30,
        resizeMode: 'contain',
    },

    iconButton: {
        resizeMode: 'contain',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 1,
        height: 25,
        marginRight: 10,
    },

    roundedAnimationContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        top: -40,
        zIndex: 2,
        position: 'absolute',
        borderRadius: 40,
        width: 80,
        height: 80,
        justifyContent: 'center',
    },

    roundedAnimationInner: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 35,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
};
