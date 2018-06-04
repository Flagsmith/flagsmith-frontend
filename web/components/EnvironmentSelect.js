import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <ProjectProvider id={this.props.id}>
                {({isLoading, project}) => (
                    <div id="env-list">
                        {project && project.environments && project.environments.map((environment) =>
                            this.props.renderRow ? this.props.renderRow(environment,
                                () => {
                                    this.props.onChange && this.props.onChange(environment.api_key);
                                }
                            ) : (
                                <div key={environment.id}>
                                    <div href={"#"} className={"list-item " + (this.props.value == (environment.api_key+"") ? "active" : "")} onClick={() => {
                                        this.props.onChange && this.props.onChange(environment.api_key);
                                    }}>
                                        <Row>
                                            <Flex className="text-left">
                                                {environment.name}
                                            </Flex>
                                            <span className="icon ion-ios-arrow-forward list-item"></span>
                                        </Row>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </ProjectProvider>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
