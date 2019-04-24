import React, {Component, PropTypes} from 'react';

const ProjectSelect = class extends Component {
    displayName: 'ProjectSelect'

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
                                    <div href={"#"} className={"list-item " + (this.props.value == (project.id+"") ? "active" : "")} onClick={() => {
                                        this.props.onChange && this.props.onChange(project);
                                    }}>
                                        <Row>
                                            <Flex className="text-left">
                                                {project.name}
                                            </Flex>
                                            <span className="icon ion-ios-arrow-forward list-item"></span>
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

ProjectSelect.propTypes = {};

module.exports = ProjectSelect;
