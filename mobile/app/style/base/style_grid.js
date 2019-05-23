module.exports = {
    //
    // Grid system / Rows
    // --------------------------------------------------

    column: {
        marginLeft: styleVariables.gutterBase,
        marginRight: styleVariables.gutterBase,
    },

    container: {
        marginLeft: styleVariables.marginBaseHorizontal,
        marginRight: styleVariables.marginBaseHorizontal,
    },

    noPad: {
        marginLeft: -styleVariables.paddingBase,
        marginRight: -styleVariables.paddingBase,
    },

    containerLoading: {
        opacity: 0.8,
    },

    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    alignCenter: {
        alignSelf: 'center',
    },

    alignRight: {
        alignSelf: 'flex-end',
    },

    centeredRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    row: {
        alignSelf: 'stretch',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },

    spacedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    mb0: { marginBottom: 0 },
    mb5: { marginBottom: em(0.5) },
    mb10: { marginBottom: em(1) },
    mb15: { marginBottom: em(1.5) },
    mb20: { marginBottom: em(2) },

    ml0: { marginLeft: 0 },
    ml5: { marginLeft: em(0.5) },
    ml10: { marginLeft: em(1) },
    ml15: { marginLeft: em(1.5) },
    ml20: { marginLeft: em(2) },

    mr0: { marginRight: 0 },
    mr5: { marginRight: em(0.5) },
    mr10: { marginRight: em(1) },
    mr15: { marginRight: em(1.5) },
    mr20: { marginRight: em(2) },

    mt0: { marginTop: 0 },
    mt5: { marginTop: em(0.5) },
    mt10: { marginTop: em(1) },
    mt15: { marginTop: em(1.5) },
    mt20: { marginTop: em(2) },

    pb0: { paddingBottom: 0 },
    pb5: { paddingBottom: em(0.5) },
    pb10: { paddingBottom: em(1) },
    pb15: { paddingBottom: em(1.5) },
    pb20: { paddingBottom: em(2) },

    pl0: { paddingLeft: 0 },
    pl5: { paddingLeft: em(0.5) },
    pl10: { paddingLeft: em(1) },
    pl15: { paddingLeft: em(1.5) },
    pl20: { paddingLeft: em(2) },

    pr0: { paddingRight: 0 },
    pr5: { paddingRight: em(0.5) },
    pr10: { paddingRight: em(1) },
    pr15: { paddingRight: em(1.5) },
    pr20: { paddingRight: em(2) },

    pt0: { paddingTop: 0 },
    pt5: { paddingTop: em(0.5) },
    pt10: { paddingTop: em(1) },
    pt15: { paddingTop: em(1.5) },
    pt20: { paddingTop: em(2) },
};
