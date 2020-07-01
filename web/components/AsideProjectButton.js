import { PureComponent } from 'react';

const AsideProjectButton = class extends PureComponent {
    static displayName = 'AsideProjectButton'

    render() {
        return (
            <div className="flex-column">
                <div className="aside__projects-item">
                    <div className="flex-row justify-content-center">
                        <div className="flex-column">
                            <Tooltip
                                title={<ButtonProject className={this.props.className}>{this.props.projectLetter}</ButtonProject>}
                                place="right"
                            >
                                {this.props.name}
                            </Tooltip>
                        </div>
                        <div className="flex-column">
                            <p className="aside__projects-item-title">{this.props.name}</p>
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
