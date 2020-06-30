import { PureComponent } from 'react';
const cn = require('classnames');

const AsideTitleLink = class extends PureComponent {
    static displayName = 'AsideTitleLink'

    render() {
        return (
            <Row className={`pb-3 ${this.props.className || ''}`}>
                <Flex>
                    <Link
                        to="/projects"
                        className=""
                    >
                    <span className="aside__link-text">{this.props.title}</span>
                    </Link>
                </Flex>
                <Link
                    to="/projects"
                    className=""
                >
                <span className={`flex-column aside__link-icon pull-right ${this.props.iconClassName || ''}`} />
                </Link>
            </Row>
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
