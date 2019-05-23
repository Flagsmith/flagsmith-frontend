module.exports = {

    //
    // Base styles
    // --------------------------------------------------

    body: {
        flex: 1,
        backgroundColor: pallette.bodyBackground,
    },

    divider: {
        height: (1 / PixelRatio.get()) * 2,
        alignSelf: 'stretch',
        borderColor: pallette.divider,
        borderBottomWidth: 1 / PixelRatio.get(),
    },

};
