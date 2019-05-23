import React, { Component, PropTypes } from 'react';
import EnvironmentSelect from './EnvironmentSelect';

const ProjectSelect = class extends Component {
    static displayName = 'ProjectSelect'

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    toggleNav = (event) => {
        var closestElement = event.target.closest(".project-nav__item");
    }

    render() {
        return (
            <OrganisationProvider id={this.props.id}>
                {({ isLoading, projects }) => (
                    <ul id="project-list" className="aside-list list-unstyled">
                        {projects && projects.map((project) =>
                            this.props.renderRow ? this.props.renderRow(project,
                                () => {
                                    this.props.onChange && this.props.onChange(project);
                                }
                            ) : (
                                <li key={project.id}
                                    className={"project-nav__item  " + (this.props.projectId === (project.id + "") ? "project-nav__item--open" : "")}
                                >
                                    <button
                                        data-test={`switch-project-${project.name.toLowerCase()}${this.props.projectId === (project.id + "") ? '-active' : ''}`}
                                        className={
                                            "project-nav__button project-nav__button--title"
                                        } onClick={(event) => {
                                        this.props.onChange && this.props.onChange(project);
                                        this.toggleNav(event);
                                    }}
                                    >
                                        <Row>
                                            <Flex className="text-left">
                                                {project.name}
                                            </Flex>
                                            <span className=" flex-column icon ion-ios-arrow-forward pull-right"/>
                                        </Row>
                                    </button>
                                    {this.props.projectId === (project.id + "") && (
                                        <div className="env-list">
                                            <EnvironmentSelect
                                                environmentId={this.props.environmentId}
                                                clearableValue={false}
                                                onChange={(environment) => {
                                                    this.context.router.push(`/project/${this.props.projectId}/environment/${environment}/features`);
                                                    AsyncStorage.setItem('lastEnv', JSON.stringify({
                                                        orgId: AccountStore.getOrganisation().id,
                                                        projectId: this.props.projectId,
                                                        environmentId: environment
                                                    }));
                                                }}
                                            />
                                            <ul className="project-list list-unstyled pt-0">
                                                <li className="project-nav__item flex-row">
                                                    <Link
                                                        id="create-env-link"
                                                        to={`/project/${this.props.projectId}/environment/create`}
                                                        className="project-nav__button project-nav__button--cta"
                                                    >
                                                        <span className="project-nav__item__text">Environments</span>
                                                        <img className="project-nav__icon" src="/images/plus-button.svg"
                                                             alt="New"
                                                        />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                    </ul>
                )}
            </OrganisationProvider>
        );
    }
};

ProjectSelect.propTypes = {};

module.exports = ProjectSelect;
