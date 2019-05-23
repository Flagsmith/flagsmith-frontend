const Button = class extends React.Component {
  static displayName ='Button'

  constructor(props, context) {
      super(props, context);
      this.state = {};
  }

  onMouseUp = () => {
      this.refs.button.blur();
  }

  render() {
      return (
          <button
            ref="button" {... this.props} onMouseUp={this.onMouseUp}
            className={`btn ${this.props.className || ''}`}
          >
              {this.props.children}
          </button>
      );
  }
};

Button.propTypes = {
    className: OptionalString,
    children: OptionalNode,
};

export default props => (
    <Button {...props} className={`btn-primary ${props.className || ''}`}/>
);


export const ButtonSecondary = props => (
    <Button {...props} className={`btn--secondary ${props.className || ''}`}/>
);

export const ButtonWhite = props => (
    <Button {...props} className={`white ${props.className || ''}`}/>
);
