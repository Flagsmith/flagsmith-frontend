import { PureComponent } from 'react';
import NavLink from 'react-router-dom/NavLink';

const cn = require('classnames');

const AsideTitleLink = class extends PureComponent {
    static displayName = 'AsideTitleLink'

    render() {
        return (
            <NavLink id={this.props.id} to={this.props.to}>
                <Button id={this.props.id} className="btn--neutral no-pointer" to={this.props.to}>
                    <div className="flex-row space">
                        <span className="aside__link-text">{this.props.title}</span>
                        <Tooltip
                          title={<span className={`aside__link-icon ${this.props.iconClassName || ''}`} />}
                          place="top"
                        >
                            {this.props.tooltip}
                        </Tooltip>
                    </div>
                </Button>
            </NavLink>
        );
    }
};

AsideTitleLink.displayName = 'AsideTitleLink';

// Card.propTypes = {
//     title: oneOfType([OptionalObject, OptionalString]),
//     icon: OptionalString,
//     children: OptionalNode,
// };

module.exports = AsideTitleLink;
