const Button = class extends React.Component {
  displayName:'Button'

  constructor (props, context) {
    super(props, context);
    this.state = {};
  }

  onMouseUp = () => {
    this.refs.button.blur();
  }

  render () {
    return (
      <button ref="button" {... this.props} onMouseUp={this.onMouseUp}
              className={"btn  " + (this.props.className || "btn-primary")}>
        {this.props.children}
      </button>
    );
  }
};

Button.propTypes = {
  className: OptionalString,
  children: OptionalNode
};

module.exports = Button;
