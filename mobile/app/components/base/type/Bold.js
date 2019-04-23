/**
 * Created by kylejohnson on 11/05/2016.
 */
/**
 * Created by kylejohnson on 04/05/2016.
 */
const bold = class extends React.Component {
    render() {
        return (
            <Text style={[Styles.bold, this.props.style]}>{this.props.children}</Text>
        );
    }
};

bold.propTypes = {
    style: React.PropTypes.any,
    children: OptionalElement,
};

module.exports = bold;
