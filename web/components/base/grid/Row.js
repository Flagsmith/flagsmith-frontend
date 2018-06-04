/**
 * Created by kylejohnson on 24/07/2016.
 */
import cn from 'classnames';

var Row = (props) => {
  const { space, ...rest } = props;

  return (
    <div
      {... rest}
      className={cn({
        'flex-row': true,
        space: props.space
      }, props.className)}>
      {props.children}
    </div>
  )
};

Row.propTypes = {
  className: OptionalString,
  space: OptionalBool,
  children: OptionalNode,
  style: React.PropTypes.any
};

module.exports = Row;
