import React from 'react';
import propTypes from 'prop-types';

const Container = ({
    ml0,
    ml5,
    ml10,
    ml15,
    ml20,
    mr0,
    mr5,
    mr10,
    mr15,
    mr20,
    style,
    children,
}) => (
    <View style={[
        ml10 && Styles.ml10,
        mr10 && Styles.mr10,
        ml0 && Styles.ml0,
        ml5 && Styles.ml5,
        ml15 && Styles.ml15,
        ml20 && Styles.ml20,
        mr0 && Styles.mr0,
        mr5 && Styles.mr5,
        mr15 && Styles.mr15,
        mr20 && Styles.mr20,
        style,
    ]}
    >
        {children}
    </View>
);

Container.displayName = 'Container';

Container.propTypes = {
    children: propTypes.node,
    ml0: propTypes.bool,
    ml5: propTypes.bool,
    ml10: propTypes.bool,
    ml15: propTypes.bool,
    ml20: propTypes.bool,
    mr0: propTypes.bool,
    mr5: propTypes.bool,
    mr10: propTypes.bool,
    mr15: propTypes.bool,
    mr20: propTypes.bool,
    style: propTypes.any,
};

Container.defaultProps = {
    ml10: true,
    mr10: true,
};

module.exports = Container;
