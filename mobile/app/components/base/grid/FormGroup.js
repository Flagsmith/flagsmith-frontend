import React from 'react';
import propTypes from 'prop-types';
//
// const FormGroup = props => (
//     <View style={[Styles.formGroup, props.style]}>
//         {props.children}
//     </View>
// );
//
// FormGroup.displayName = 'FormGroup';
//
// FormGroup.propTypes = {
//     children: propTypes.node,
// };
//
// module.exports = FormGroup;


const FormGroup = ({
    pt0,
    pt5,
    pt10,
    pt15,
    pt20,
    pb0,
    pb5,
    pb10,
    pb15,
    pb20,
    style,
    children,
}) => (
    <View style={[
        pb10 && Styles.pb10,
        pt10 && Styles.pt10,
        pb0 && Styles.pb0,
        pb15 && Styles.pb15,
        pb20 && Styles.pb20,
        pb5 && Styles.pb5,
        pt0 && Styles.pt0,
        pt5 && Styles.pt5,
        pt15 && Styles.pt15,
        pt20 && Styles.pt20,
        style,
    ]}
    >
        {children}
    </View>
);

FormGroup.displayName = 'FormGroup';

FormGroup.propTypes = {
    children: propTypes.node,
    pt0: propTypes.bool,
    pt5: propTypes.bool,
    pt10: propTypes.bool,
    pt15: propTypes.bool,
    pt20: propTypes.bool,
    pb0: propTypes.bool,
    pb5: propTypes.bool,
    pb10: propTypes.bool,
    pb15: propTypes.bool,
    pb20: propTypes.bool,
    style: propTypes.any,
};

FormGroup.defaultProps = {
    pt10: true,
    pb10: true,
};

module.exports = FormGroup;
