import React from 'react';

const AlertBar = class extends React.Component {
    componentDidMount() {
        document.body.classList.add('alert-shown');
    }

    componentWillUnmount() {
        document.body.classList.remove('alert-shown');
    }

    render() {
        return (
            <div className={"footer-bar " + (this.props.className||'')}>
                {this.props.children}
            </div>
        )
    }
};

module.exports = AlertBar;
