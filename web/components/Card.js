import { PureComponent } from 'react';

const Card = class extends PureComponent {
    static displayName = 'Card'

    render() {
        return (
            <div className={`panel panel-default ${this.props.className || ''}`}>
                {/*<div className="panel-heading">*/}
                {/*    <Row space>*/}
                {/*        <Row className="flex-1">*/}
                {/*            {this.props.icon && (*/}
                {/*                <span className="panel-icon"><span className={`icon ${this.props.icon}`}/></span>*/}
                {/*            )}*/}
                {/*            <h6 className="m-b-0">{this.props.title}</h6>*/}
                {/*        </Row>*/}
                {/*        {this.props.action}*/}
                {/*    </Row>*/}
                {/*</div>*/}
                <div className="panel-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
};

Card.displayName = 'Card';

Card.propTypes = {
    title: oneOfType([OptionalObject, OptionalString]),
    icon: OptionalString,
    children: OptionalNode,
};

module.exports = Card;
