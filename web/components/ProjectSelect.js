import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <OrganisationProvider id={this.props.id}>
                {({isLoading, projects}) => (
                    <div id="project-list">
                        {projects && projects.map((project) =>
                            this.props.renderRow ? this.props.renderRow(project,
                                () => {
                                    this.props.onChange && this.props.onChange(project);
                                }
                            ) : (
                                <div key={project.id}>
                                    <div href={"#"} className={"project-nav__item" + (this.props.value == (project.id+"") ? "active" : "")} onClick={() => {
                                        this.props.onChange && this.props.onChange(project);
                                    }}>
                                        <Row>
                                            <Flex className="text-left">
                                                {project.name}
                                            </Flex>
                                            <span className={"icon " + (this.props.value == (project.id+"") ? "ion-ios-radio-button-on" : "ion-ios-radio-button-off")}></span>
                                        </Row>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </OrganisationProvider>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
