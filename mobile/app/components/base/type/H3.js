/**
 * Created by kylejohnson on 04/05/2016.
 */
const h3 = class extends React.Component {
    render() {
        return (
            <Text {...this.props} style={[Styles.h3, this.props.style]}>{this.props.children}</Text>
        );
    }
};

h3.propTypes = {
    style: React.PropTypes.any,
    children: OptionalElement,
};

export default h3;