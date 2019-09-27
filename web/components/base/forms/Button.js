import { PureComponent } from 'react';

const Button = class extends PureComponent {
    static displayName = 'Button'

    onMouseUp = () => {
        this.refs.button.blur();
    }

    render() {
        return (
            <button
              ref="button" {...this.props} onMouseUp={this.onMouseUp}
              className={`btn ${this.props.className || ''}`}
            >
                {this.props.children}
            </button>
        );
    }
};

Button.propTypes = {
    className: OptionalString,
    children: OptionalNode,
};

export default class extends PureComponent {
    static displayName = 'Button';

    render() {
        return <Button {...this.props} className={`btn-primary ${this.props.className || ''}`}/>;
    }
}

export const ButtonSecondary = class extends PureComponent {
    static displayName = 'ButtonSecondary';

    render() {
        return <Button {...this.props} className={`btn--secondary ${this.props.className || ''}`}/>;
    }
};

export const ButtonWhite = class extends PureComponent {
    static displayName = 'ButtonWhite';

    render() {
        return <Button {...this.props} className={`white ${this.props.className || ''}`}/>;
    }
};
