import React, { Component } from 'react';

const EnvironmentSelect = class extends Component {
    static displayName = 'EnvironmentSelect'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const { hasFeature } = this.props;

        return (
            <ProjectProvider id={this.props.id}>
                {({ isLoading, project }) => (
                    <div>
                        <ul id="env-list" className="project-list list-unstyled">
                            {project && project.environments && project.environments.map(environment => (this.props.renderRow ? this.props.renderRow(environment,
                                () => {
                                    this.props.onChange && this.props.onChange(environment.api_key);
                                }) : (
                                    <li key={environment.id} className={`project-nav__item project-list__item ${this.props.environmentId === (`${environment.api_key}`) ? 'project-list__item--open' : ''}`}>
                                        <button
                                          data-test={`switch-environment-${environment.name.toLowerCase()}${this.props.environmentId === (`${environment.api_key}`) ? '-active' : ''}`}
                                          className="project-nav__button" style={{ width: '100%' }} onClick={() => {
                                              this.props.onChange && this.props.onChange(environment.api_key);
                                          }}
                                        >
                                            <Row>
                                                <Flex className="text-left">
                                                    {environment.name}
                                                </Flex>
                                                <span className=" flex-column icon ion-ios-arrow-forward"/>
                                            </Row>
                                        </button>
                                        {this.props.environmentId === (`${environment.api_key}`) && (
                                        <Permission level="environment" permission="ADMIN" id={environment.api_key}>
                                            {({ permission: environmentAdmin, isLoading }) => (isLoading ? <div><Loader/></div> : (
                                                <ul className="env-nav list-unstyled">
                                                    <li className="env-nav__item flex-row">
                                                        <Link
                                                          id="features-link"
                                                          activeClassName="active"
                                                          to={`/project/${project.id}/environment/${environment.api_key}/features`
                                                            }
                                                        >
                                                              Features
                                                        </Link>
                                                    </li>
                                                    {hasFeature('segments') && environmentAdmin && (
                                                    <li className="env-nav__item flex-row">
                                                        <Link
                                                          id="segments-link"
                                                          activeClassName="active"
                                                          to={`/project/${project.id}/environment/${environment.api_key}/segments`
                                                              }
                                                        >
                                                                Segments
                                                        </Link>
                                                    </li>
                                                    )}
                                                    <li className="env-nav__item flex-row">
                                                        <Link
                                                          id="users-link"
                                                          activeClassName="active"
                                                          to={`/project/${project.id}/environment/${environment.api_key}/users`
                                                            }
                                                        >
                                                              Users
                                                        </Link>
                                                    </li>
                                                    <li className="env-nav__item flex-row">
                                                        <Link
                                                          id="audit-log-link"
                                                          activeClassName="active"
                                                          to={`/project/${project.id}/environment/${environment.api_key}/audit-log`
                                                            }
                                                        >
                                                              Audit Log
                                                        </Link>
                                                    </li>
                                                    {environmentAdmin && (
                                                    <li className="env-nav__item flex-row">
                                                        <Link
                                                          id="env-settings-link"
                                                          activeClassName="active"
                                                          to={`/project/${project.id}/environment/${environment.api_key}/settings`
                                                              }
                                                        >
                                                                Settings
                                                        </Link>
                                                    </li>
                                                    )}
                                                </ul>
                                            ))}
                                        </Permission>
                                        )}
                                    </li>
                            )))}
                        </ul>
                    </div>
                )}
            </ProjectProvider>
        );
    }
};

EnvironmentSelect.propTypes = {};

module.exports = ConfigProvider(EnvironmentSelect);
