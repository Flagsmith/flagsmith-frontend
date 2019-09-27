import React, { Component } from 'react';
import ConfirmToggleFeature from '../modals/ConfirmToggleFeature';
import ConfirmRemoveFeature from '../modals/ConfirmRemoveFeature';
import CreateFlagModal from '../modals/CreateFlag';
import CreateTraitModal from '../modals/CreateTrait';
import TryIt from '../TryIt';

const UserPage = class extends Component {
    static displayName = 'UserPage'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        AppActions.getIdentity(this.props.match.params.environmentId, this.props.match.params.id);
        AppActions.getIdentitySegments(this.props.match.params.projectId, this.props.match.params.id);
        AppActions.getFeatures(this.props.match.params.projectId, this.props.match.params.environmentId);
        API.trackPage(Constants.pages.USER);
    }

    onTraitSaved = () => {
        AppActions.getIdentitySegments(this.props.match.params.projectId, this.props.match.params.id);
    }

    confirmToggle = (projectFlag, environmentFlag, cb) => {
        openModal('Toggle Feature', <ConfirmToggleFeature
          identity={this.props.match.params.id}
          environmentId={this.props.match.params.environmentId}
          projectFlag={projectFlag}
          environmentFlag={environmentFlag}
          cb={cb}
        />);
    }

    editFlag = (projectFlag, environmentFlag, identityFlag) => {
        API.trackEvent(Constants.events.VIEW_USER_FEATURE);
        openModal('Edit User Feature', <CreateFlagModal
          isEdit
          identity={this.props.match.params.id}
          environmentId={this.props.match.params.environmentId}
          projectId={this.props.match.params.projectId}
          projectFlag={projectFlag}
          identityFlag={identityFlag}
          environmentFlag={environmentFlag}
        />);
    };

    createTrait = () => {
        API.trackEvent(Constants.events.VIEW_USER_FEATURE);
        openModal('Create User Trait', <CreateTraitModal
          isEdit={false}
          onSave={this.onTraitSaved}
          identity={this.props.match.params.id}
          environmentId={this.props.match.params.environmentId}
          projectId={this.props.match.params.projectId}
        />);
    };

    editTrait = (trait) => {
        API.trackEvent(Constants.events.VIEW_USER_FEATURE);
        openModal('Edit User Trait', <CreateTraitModal
          isEdit
          {...trait}
          onSave={this.onTraitSaved}
          identity={this.props.match.params.id}
          environmentId={this.props.match.params.environmentId}
          projectId={this.props.match.params.projectId}
        />);
    };

    confirmRemove = (projectFlag, cb) => {
        openModal('Reset User Feature', <ConfirmRemoveFeature
          identity={this.props.match.params.id}
          environmentId={this.props.match.params.environmentId}
          projectFlag={projectFlag}
          cb={cb}
        />);
    }

    removeTrait = (id, trait_key) => {
        openConfirm(
            <h3>Delete Trait</h3>,
            <p>
                {'Are you sure you want to delete trait '}
                <strong>{trait_key}</strong>
                {' from this user?'}
            </p>,
            () => AppActions.deleteIdentityTrait(this.props.match.params.environmentId, this.props.match.params.id, id),
        );
    }

    render() {
        const { hasFeature } = this.props;
        return (
            <div className="app-container">
                <IdentityProvider onSave={this.onSave}>
                    {({ isSaving, isLoading, error, environmentFlags, projectFlags, traits, identityFlags, identity }, { toggleFlag, removeFlag, editFlag }) => (isLoading || !identityFlags
                        ? <div className="text-center"><Loader/></div> : (
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>
                                            {(identity && identity.identity.identifier) || this.props.match.params.id}
                                        </h3>
                                        <p>
                                            View and manage feature states and traits for this user. This will override
                                            any feature
                                            states you have for your current environment for this user only. Any
                                            features that are not overriden for this user will fallback to the
                                            environment defaults.
                                        </p>
                                        <FormGroup>
                                            <FormGroup>
                                                <PanelSearch
                                                  id="user-features-list"
                                                  className="no-pad"
                                                  icon="ion-ios-rocket"
                                                  title="Features"
                                                  items={projectFlags}
                                                  renderRow={({ name, id, enabled, created_date, feature, type }, i) => {
                                                      const identityFlag = identityFlags[id];
                                                      const featureIsDifferent = identityFlag.identity;
                                                      const values = Object.assign({}, environmentFlags[id], identityFlag || {});
                                                      return (
                                                          <Row className="list-item clickable" key={id} space>
                                                              <div
                                                                onClick={() => this.editFlag(projectFlags[i], environmentFlags[id], identityFlag)}
                                                                className="flex flex-1"
                                                              >
                                                                  <Row>
                                                                      <a href="#">
                                                                          {name}
                                                                      </a>
                                                                  </Row>
                                                                  {featureIsDifferent ? (
                                                                      <Row className="chip">
                                                                          <span>
                                                                                Overriding defaults
                                                                                since
                                                                              {' '}
                                                                              {moment(created_date).format('DD/MMM/YYYY')}
                                                                          </span>
                                                                          <span
                                                                            className="chip-icon icon ion-md-information"
                                                                          />
                                                                      </Row>

                                                                  ) : (
                                                                      <div className="list-item-footer faint">
                                                                            Using environment defaults
                                                                      </div>
                                                                  )}
                                                              </div>
                                                              <Row>
                                                                  <Column>
                                                                      {type == 'FLAG' ? (
                                                                          <Switch
                                                                            checked={identityFlags[id] ? identityFlags[id].enabled : environmentFlags[id].enabled}
                                                                            onChange={() => this.confirmToggle(projectFlags[i], environmentFlags[id], (environments) => {
                                                                                toggleFlag({
                                                                                    environmentId: this.props.match.params.environmentId,
                                                                                    identity: this.props.match.params.id,
                                                                                    projectFlag: { id },
                                                                                    environmentFlag: environmentFlags[id],
                                                                                    identityFlag,
                                                                                });
                                                                            })}
                                                                          />
                                                                      ) : (
                                                                          <FeatureValue
                                                                            value={`${values.feature_state_value}`}
                                                                          />
                                                                      )}

                                                                  </Column>
                                                                  {featureIsDifferent && (
                                                                  <Column>
                                                                      <Button
                                                                        onClick={() => this.confirmRemove(projectFlags[i], () => {
                                                                            removeFlag({
                                                                                environmentId: this.props.match.params.environmentId,
                                                                                identity: this.props.match.params.id,
                                                                                identityFlag,
                                                                            });
                                                                        })}
                                                                      >
                                                                                Reset
                                                                      </Button>
                                                                  </Column>
                                                                  )}
                                                              </Row>
                                                          </Row>
                                                      );
                                                  }
                                                    }
                                                  renderNoResults={(
                                                      <Panel
                                                        icon="ion-ios-rocket"
                                                        title="Features"
                                                        className="text-center"
                                                      >
                                                            This user has no features yet.
                                                          {' '}
                                                          <br/>
                                                            When you start
                                                          {' '}
                                                          <Link
                                                            className="dark"
                                                            to={`project/${this.props.match.params.projectId}/environment/${this.props.match.params.environmentId}/features`}
                                                          >
                                                                creating features
                                                          </Link>
                                                          {' '}
                                                            for your project you will set them per user here.
                                                      </Panel>
                                                    )}
                                                  filterRow={({ name }, search) => name.toLowerCase().indexOf(search) > -1}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <PanelSearch
                                                  id="user-traits-list"
                                                  className="no-pad"
                                                  icon="ion-ios-person"
                                                  title="Traits"
                                                  items={traits}
                                                  acti
                                                  renderRow={({ trait_value, trait_key }, i) => (
                                                      <Row
                                                        className="list-item clickable" key={trait_key}
                                                        space
                                                      >
                                                          <div
                                                            onClick={() => this.editTrait({
                                                                trait_value,
                                                                trait_key,
                                                            })}
                                                            className="flex flex-1"
                                                          >
                                                              <Row>
                                                                  <a className={`js-trait-key-${i}`} href="#">
                                                                      {trait_key}
                                                                  </a>
                                                              </Row>
                                                          </div>
                                                          <Row>
                                                              <Column>
                                                                  <FeatureValue
                                                                    className={`js-trait-value-${i}`}
                                                                    value={`${trait_value}`}
                                                                  />
                                                              </Column>
                                                              <Column>
                                                                  <button
                                                                    id="remove-feature"
                                                                    className="btn btn--with-icon"
                                                                    type="button"
                                                                    onClick={() => this.removeTrait(id, trait_key)}
                                                                  >
                                                                      <RemoveIcon/>
                                                                  </button>
                                                              </Column>
                                                          </Row>
                                                      </Row>
                                                  )
                                                    }
                                                  renderNoResults={(
                                                      <Panel
                                                        icon="ion-ios-person"
                                                        title="Traits"
                                                        className="text-center"
                                                      >
                                                            This user has no traits.
                                                      </Panel>
                                                    )}
                                                  filterRow={({ trait_key }, search) => trait_key.toLowerCase().indexOf(search) > -1}
                                                />
                                            </FormGroup>
                                            <FormGroup className="text-center">
                                                <Button id="add-trait" onClick={this.createTrait}>Add new trait</Button>
                                            </FormGroup>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <CodeHelp
                                              title="Managing user traits and segments"
                                              snippets={Constants.codeHelp.USER_TRAITS(this.props.match.params.id)}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <TryIt
                                              title="Check to see what features and traits are coming back for this user"
                                              environmentId={this.props.match.params.environmentId}
                                              userId={(identity && identity.identity.identifier) || this.props.match.params.id}
                                            />
                                        </FormGroup>
                                        {hasFeature('identity_segments') && (
                                            <IdentitySegmentsProvider>
                                                {({ isLoading: segmentsLoading, segments }) => (segmentsLoading ? <div className="text-center"><Loader/></div> : (
                                                    <FormGroup>
                                                        <PanelSearch
                                                          id="user-segments-list"
                                                          className="no-pad"
                                                          icon="ion-ios-globe"
                                                          title="Segments"
                                                          items={segments ? segments.results : []}
                                                          acti
                                                          renderRow={({ name, id, enabled, created_date, type, description }, i) => (
                                                              <Row
                                                                className="list-item"
                                                                space
                                                                key={i}
                                                              >
                                                                  <div
                                                                    className="flex flex-1"
                                                                  >
                                                                      <Row>
                                                                          <span data-test={`segment-${i}-name`} className="bold-link">
                                                                              {name}
                                                                          </span>
                                                                      </Row>
                                                                      <div className="list-item-footer faint">
                                                                          {description ? <div>{description}<br/></div> : ''}
                                                                            Created
                                                                          {' '}
                                                                          {moment(created_date).format('DD/MMM/YYYY')}
                                                                      </div>
                                                                  </div>
                                                              </Row>
                                                          )
                                                            }
                                                          renderNoResults={(
                                                              <Panel
                                                                icon="ion-ios-globe"
                                                                title="Segments"
                                                                className="text-center"
                                                              >
                                                                    This user is not part of any segment.
                                                              </Panel>
                                                            )}
                                                          filterRow={({ name }, search) => name.toLowerCase().indexOf(search) > -1}
                                                        />
                                                    </FormGroup>
                                                ))}
                                            </IdentitySegmentsProvider>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </IdentityProvider>
            </div>
        );
    }
};

UserPage.propTypes = {};

module.exports = ConfigProvider(UserPage);
