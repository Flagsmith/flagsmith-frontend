import FocusMonitor from './higher-order/FocusMonitor';
import cn from 'classnames';
const Popover = class extends React.Component {
  displayName: 'Popover'

  constructor (props, context) {
    super(props, context);
    this.state = { isActive: false };
  }

  _focusChanged = (isActive)=>this.setState({ isActive });

  toggle = ()=>{
    this.refs.focus.toggle();
  }

  render () {
    var classNames = cn({
      popover: true,
      in: this.state.isActive
    }, this.props.className);

    return (
        <FocusMonitor
            ref="focus"
            onFocusChanged={this._focusChanged}
            isHover={this.props.isHover}>
          <div className={this.props.className}>
            {this.props.renderTitle(this.toggle,this.state.isActive)}
            <div className="popover-inner">
              <div className={classNames + ' popover-bt'}>
                {this.props.children(this.toggle)}
              </div>
            </div>
          </div>
        </FocusMonitor>
    );
  }
};

Popover.propTypes = {
  isHover: OptionalBool,
  className: OptionalString,
  renderTitle: RequiredFunc,
  children: Any
};

module.exports = Popover;
