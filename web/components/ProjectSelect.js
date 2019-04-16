import React, {Component, PropTypes} from 'react';
import EnvironmentSelect from './EnvironmentSelect';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    toggleNav= (event) => {
        var closestElement = event.target.closest(".project-nav__item");
    }

    render() {
        return (
            <OrganisationProvider id={this.props.id}>
                {({isLoading, projects}) => (
                    <ul id="project-list" className="aside-list list-unstyled">
                        {projects && projects.map((project) =>
                            this.props.renderRow ? this.props.renderRow(project,
                                () => {
                                    this.props.onChange && this.props.onChange(project);
                                }
                            ) : (
                                <li key={project.id} className="project-nav__item project-nav__item--open m-t-1">
                                    <button className={"project-nav__button project-nav__button--title" + (this.props.value == (project.id+"") ? "active" : "")} onClick={(event) => {
                                        this.props.onChange && this.props.onChange(project); this.toggleNav(event);
                                    }}>
                                        <Row>
                                            <Flex className="text-left">
                                                {project.name}
                                            </Flex>
                                            <span className=" flex-column icon ion-ios-arrow-down"/>
                                        </Row>
                                    </button>
                                    <div className="env-list">
                                        <EnvironmentSelect
                                            clearableValue={false}
                                            onChange={(environment) => {
                                                this.context.router.push(`/project/${this.props.projectId}/environment/${environment}/features`);
                                                AsyncStorage.setItem('lastEnv', JSON.stringify({
                                                    orgId: AccountStore.getOrganisation().id,
                                                    projectId: this.props.projectId,
                                                    environmentId: environment
                                                }));
                                            }}/>
                                        <ul className="project-list list-unstyled">
                                            <li className="project-nav__item flex-row">
                                                <span className="flex-1 project-nav__item__text">Environments</span>
                                                <Link
                                                    id="create-env-link"
                                                    to={`/project/${this.props.projectId}/environment/create`} className="project-nav__button project-nav__button--cta">
                                                    <img className="project-nav__icon" src="/images/plus-button.svg" alt="New" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </OrganisationProvider>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
