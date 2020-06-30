import { PureComponent } from 'react';
const cn = require('classnames');

const Collapsible = class extends PureComponent {
    static displayName = 'Collapsible'

    static propTypes = {};

    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <div className="collapsible">
                <div onClick={(e)=>this.togglePanel(e)} className="collapsible__header">
                    <div className="flex-row space">
                        {this.props.title}
                        {this.state.open ? (
                            <span className={`flex-column ion-ios-arrow-up aside__link-icon pull-right ${this.props.iconClassName || ''}`} />
                        ) : <span className={`flex-column ion-ios-arrow-down aside__link-icon pull-right ${this.props.iconClassName || ''}`} />}
                    </div>
                </div>
                {this.state.open ? (
                    <div className="collapsible__content">
                        {this.props.children}
                    </div>
                ) : null}
            </div>
        );
    }
};

Collapsible.displayName = 'Collapsible';

// Card.propTypes = {
//     title: oneOfType([OptionalObject, OptionalString]),
//     icon: OptionalString,
//     children: OptionalNode,
// };

module.exports = Collapsible;
