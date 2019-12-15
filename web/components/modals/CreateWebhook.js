import React, { Component } from 'react';
import Highlight from '../Highlight';
import Tabs from '../base/forms/Tabs';
import TabItem from '../base/forms/TabItem';
import withSegmentOverrides from '../../../common/providers/withSegmentOverrides';
import data from '../../../common/data/base/_data';
import SegmentOverrides from '../SegmentOverrides';
import ErrorMessage from '../ErrorMessage';

const exampleJSON = `{
    "data": {
        "changed_by": "Ben Rometsch",
        "new_state": {
            "enabled": true,
            "environment": 4053,
            "feature": {
                "created_date": "2019-12-11T15:47:26.959385Z",
                "default_enabled": true,
                "description": null,
                "id": 2391,
                "initial_value": null,
                "name": "your_feature_name",
                "project": 1661,
                "type": "FLAG"
            },
            "feature_segment": null,
            "feature_state_value": null,
            "id": 7952,
            "identity": null
        },
        "timestamp": "2019-12-11T15:47:26.973Z"
    },
    "event_type": "FLAG_UPDATED"
}`;

const CreateFlag = class extends Component {
  static displayName = 'CreateFlag';

  static contextTypes = {
      router: propTypes.object.isRequired,
  };

  constructor(props, context) {
      super(props, context);
      this.state = {
          enabled: this.props.isEdit ? this.props.webhook.enabled : true,
          url: this.props.isEdit ? this.props.webhook.url : '',
          error: false,
      };
  }

  save = () => {
      const webhook = {
          url: this.state.url,
          enabled: this.state.enabled,
      };
      if (this.props.isEdit) {
          webhook.id = this.props.webhook.id;
      }
      this.setState({ isSaving: true, error: false });
      this.props.save(webhook)
          .then(() => closeModal())
          .catch((e) => {
              this.setState({ error: true, isSaving:false });
          });
  };

  render() {
      const { state: { error, isSaving, url, enabled }, props: { isEdit } } = this;
      return (
          <ProjectProvider
            id={this.props.projectId}
          >
              {({ project }) => (

                  <form
                    id="create-feature-modal"
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.save();
                    }}
                  >
                      <Row space>
                          <Flex className="mb-4 mr-4">
                              <div>
                                  <label>URL (Expects a 200 response from POST)</label>
                              </div>
                              <Input
                                ref={e => this.input = e}
                                value={this.state.url}
                                onChange={e => this.setState({ url: Utils.safeParseEventValue(e) })}
                                isValid={url && url.length}
                                type="text"
                                inputClassName="input--wide"
                                placeholder="https://example.com/feature-changed/"
                              />
                          </Flex>
                          <FormGroup className="mb-4 ml-1">
                              <div>
                                  <label>Enabled</label>
                              </div>
                              <div>
                                  <Switch
                                    defaultChecked={enabled}
                                    checked={enabled}
                                    onChange={enabled => this.setState({ enabled })}
                                  />
                              </div>
                          </FormGroup>
                      </Row>
                      <FormGroup className="mb-4 ml-1">
                          <div>
                              <label>Example Response</label>
                              <Highlight className="json">
                                  {exampleJSON}
                              </Highlight>
                          </div>
                      </FormGroup>
                      {error && <ErrorMessage error="Could not create a webhook for this url, please ensure you include http or https."/>}
                      <div className={isEdit ? 'footer' : ''}>
                          <div className="mb-3">
                              <p className="text-right">
                  This will {isEdit ? 'update' : 'create'} a webhook for the environment
                                  {' '}
                                  <strong>
                                      {
                      _.find(project.environments, { api_key: this.props.environmentId }).name
                    }
                                  </strong>
                              </p>
                          </div>
                          <div className="text-right">
                              {isEdit ? (
                                  <Button data-test="update-feature-btn" id="update-feature-btn" disabled={isSaving || !url}>
                                      {isSaving ? 'Creating' : 'Update Webhook'}
                                  </Button>
                              ) : (
                                  <Button data-test="create-feature-btn" id="create-feature-btn" disabled={isSaving || !url}>
                                      {isSaving ? 'Creating' : 'Create Webhook'}
                                  </Button>
                              )}
                          </div>
                      </div>
                  </form>
              )}
          </ProjectProvider>
      );
  }
};

CreateFlag.propTypes = {};

module.exports = ConfigProvider(withSegmentOverrides(CreateFlag));
