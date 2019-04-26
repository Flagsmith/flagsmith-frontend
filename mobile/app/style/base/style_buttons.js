module.exports = {

    button: {
        height: styleVariables.buttonHeight,
    },

    buttonWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonText: {
        backgroundColor: 'transparent',
        color: 'white',
    },

    buttonIcon: {
        fontSize: em(1),
        color: 'white',
        marginRight: 10,
    },

    buttonIconRight: {
        marginLeft: 10,
        marginRight: 0,
    },

    buttonGroup: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pallette.primary,
        height: styleVariables.buttonHeight,
    },

    buttonGroupLeft: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },

    buttonGroupRight: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
};
