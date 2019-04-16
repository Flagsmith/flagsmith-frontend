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
                    <ul id="env-list" className="project-list list-unstyled">
                        {project && project.environments && project.environments.map((environment) =>
                            this.props.renderRow ? this.props.renderRow(environment,
                                () => {
                                    this.props.onChange && this.props.onChange(environment.api_key);
                                }
                            ) : (
                                <li key={environment.id} className="project-nav__item">
                                    <button className={"project-nav__button " + (this.props.value == (environment.api_key+"") ? "project-nav__item--active" : "")} onClick={() => {
                                        this.props.onChange && this.props.onChange(environment.api_key);
                                    }}>
                                        <Row>
                                            <Flex className="text-left">
                                                {environment.name}
                                            </Flex>
                                            <span className=" flex-column icon ion-ios-arrow-down"/>
                                        </Row>
                                    </button>
                                    <ul className="env-nav list-unstyled">
                                        <li className="env-nav__item flex-row">
                                            <Link
                                                activeClassName={"active"}
                                                to={`/project/${project.id}/environment/${environment.api_key}/features`
                                                }>Features</Link>
                                        </li>
                                        <li className="env-nav__item flex-row">
                                            <Link
                                                id="users-link"
                                                activeClassName={"active"}
                                                to={`/project/${project.id}/environment/${environment.api_key}/users`
                                                }>Users</Link>
                                        </li>
                                        <li className="env-nav__item flex-row">
                                            <Link
                                                id="users-link"
                                                activeClassName={"active"}
                                                to={`/project/${project.id}/environment/${environment.api_key}/settings`
                                                }>Settings</Link>
                                        </li>
                                    </ul>
                                </li>
                            ))}
                    </ul>
                )}
            </ProjectProvider>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
