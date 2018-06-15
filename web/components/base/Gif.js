import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {
            paused: true
        };
    }

    render() {
        return (
            <Flex onClick={()=>this.setState({paused: !this.state.paused})} className={"centered-container gif " + (this.state.paused? "paused":"playing")}>
            <img  {...this.props}
                 src={this.state.paused ? this.props.pausedSrc:this.props.src}
            />
                <ion className="ion ion-ios-play"/>
            </Flex>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;