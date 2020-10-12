import { PureComponent } from 'react';

const cn = require('classnames');

const Collapsible = class extends PureComponent {
    static displayName = 'Collapsible'

    static propTypes = {};

    render() {
        return (
            <div
              onClick={this.props.onClick}
              data-test={this.props['data-test']}
              className={cn(
                  'collapsible',
                  this.props.className,
                  {
                      active: this.props.active,
                  },
              )}
            >
                <div className="collapsible__header">
                    <div className="flex-row">
                        {this.props.active ? (
                            <img className="mr-2" src="/images/icons/aside/caret-down.svg" />
                        ) : <img className="mr-2" src="/images/icons/aside/caret-right.svg" />}
                        {this.props.title}
                    </div>
                </div>
                {this.props.active ? (
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
