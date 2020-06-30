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
            <div className={`collapsible ${this.props.className || ''}`}>
                <div onClick={(e)=>this.togglePanel(e)} className="collapsible__header">
                    <div className="flex-row">
                        {this.state.open ? (
                            <img className="mr-2" src="/images/icons/aside/caret-down.svg" />
                        ) :  <img className="mr-2" src="/images/icons/aside/caret-up.svg" />}
                        {this.props.title}
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
