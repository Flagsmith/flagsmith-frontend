import React, {Component, PropTypes} from 'react';

const FeatureValue = class extends Component {
    displayName: 'FeatureValue'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const type = typeof Utils.getTypedValue(this.props.value);
        return (
         <View style={styles.container}>
             <Text style={[
                 styles.text,
                 type ==='string' && styles.textString,
             ]}>
                 {type==='string'&&'"'}{Format.truncateText(this.props.value+"",20)}{type==='string'&&'"'}
             </Text>
         </View>
        );
    }
};

FeatureValue.propTypes = {};

const styles = StyleSheet.create({
    text: {
        color:'#6896ba'
    },
    textString: {
        color:'#6a8759'
    },
    container: {
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:20,
        backgroundColor:'#23364a'
    }
})

module.exports = FeatureValue;
