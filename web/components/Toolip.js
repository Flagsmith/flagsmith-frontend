const ReactTooltip = require('react-tooltip');
const Tooltip = class extends React.Component {
	displayName: 'Tooltip'

	id = Utils.GUID()

	render() {
		return (
			<span className="question-tooltip">
                    <span className="fa fa-question-circle" data-for={this.id} data-tip/>
                <ReactTooltip id={this.id} place={this.props.place || "top"} type="dark" effect="solid">
                    {this.props.children}
                </ReactTooltip>
            </span>
		);
	}
};

Tooltip.propTypes = {
	children: RequiredElement,
	place: OptionalString
};

module.exports = Tooltip;
