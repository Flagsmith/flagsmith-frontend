//propTypes: value: OptionalNumber
const cn = require('classnames');
const Column = class extends React.Component {
  render () {
    return (
      <div {... this.props} className={(this.props.className||'') + ' flex-column'}>
        {this.props.children}
      </div>
    );
  }
};

Column.defaultProps = {
};

Column.propTypes = {
  className: OptionalString,
  value: OptionalNumber,
  children: OptionalNode,
  style: React.PropTypes.any
};

module.exports = Column;
