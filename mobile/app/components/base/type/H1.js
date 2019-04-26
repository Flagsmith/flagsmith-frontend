/**
 * Created by kylejohnson on 11/05/2016.
 */
/**
 * Created by kylejohnson on 04/05/2016.
 */
const h1 = class extends React.Component {
    render() {
        return (
            <Text {...this.props} style={[Styles.h1, this.props.style]}>{this.props.children}</Text>
        );
    }
};

h1.propTypes = {
    style: React.PropTypes.any,
    children: OptionalElement,
};

module.exports = h1;
