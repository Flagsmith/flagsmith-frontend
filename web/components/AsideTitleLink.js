import { PureComponent } from 'react';

const cn = require('classnames');

const AsideTitleLink = class extends PureComponent {
    static displayName = 'AsideTitleLink'

    render() {
        return (
            <Button className="btn--neutral" onClick={this.props.onClick}>
                <div className="flex-row space">
                    <span className="aside__link-text">{this.props.title}</span>
                    <span className={`aside__link-icon ${this.props.iconClassName || ''}`} />
                </div>
            </Button>
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
