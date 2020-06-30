import { PureComponent } from 'react';

const AsideProjectButton = class extends PureComponent {
    static displayName = 'AsideProjectButton'

    render() {
        return (
            <div className="flex-column">
                <div className="aside__projects-item">
                    <div className="flex-row justify-content-center">
                        <div className="flex-column">
                            <ButtonProject className={this.props.className}>
                                S
                            </ButtonProject>
                        </div>
                        <div className="flex-column">
                            <p className="aside__projects-item-title">{this.props.name || 'SSG Website'}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

AsideProjectButton.displayName = 'AsideProjectButton';

// Card.propTypes = {
//     title: oneOfType([OptionalObject, OptionalString]),
//     icon: OptionalString,
//     children: OptionalNode,
// };

module.exports = AsideProjectButton;
