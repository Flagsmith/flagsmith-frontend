/**
 * Created by Kyle on 17/06/2016.
 */
const Column = props => (
    <View style={[Styles.column, props.style]}>{props.children}</View>
);

Column.propTypes = {
    style: propTypes.any,
    children: propTypes.any,
};

module.exports = Column;
