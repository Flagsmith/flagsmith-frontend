
import React, { Component } from 'react';
import _data from '../../common/data/base/_data';

const CreateEditIntegration = require('./modals/CreateEditIntegrationModal');

class Integration extends Component {
    add =() => {
        this.props.addIntegration(this.props.integration, this.props.id);
    }

    render() {
        const { image, title, description, perEnvironment } = this.props.integration;
        const activeIntegrations = this.props.activeIntegrations;
        const showAdd = !(!perEnvironment && activeIntegrations && activeIntegrations.length);
        return (
            <Panel
              className="no-pad"
              title={(
                  <Row style={{ flexWrap: 'noWrap' }}>
                      <img height={64} className="mr-4" src={image}/>
                      <div>
                          <h4>
                              {title}
                          </h4>
                          <div className="subtitle mt-2">
                              {description}
                          </div>
                      </div>
                      {showAdd && (
                      <Button
                        className="btn-lg btn-primary ml-4" id="show-create-segment-btn" data-test="show-create-segment-btn"
                        onClick={this.add}
                      >
                          <span className="icon ion-ios-apps"/>
                          {' '}
                          Add integration
                      </Button>
                      )}
                  </Row>
                )}
            >
                <div className="text-center">
                    {activeIntegrations && activeIntegrations.map((integration) => (
                        <div onClick={()=>this.props.editIntegration(integration)}>
                        Hi
                        </div>
                    ))}
                </div>
            </Panel>
        );
    }
}


class IntegrationList extends Component {
    state = {}

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        const integrationList = this.props.getValue('integration_data') && JSON.parse(this.props.getValue('integration_data'));
        Promise.all(this.props.integrations.map((key) => {
            const integration = integrationList[key];
            if (integration) {
                return _data.get(`${Project.api}projects/${this.props.projectId}/integrations/${key}/`)
                    .catch((e) => {

                    });
            }
        })).then((res) => {
            this.setState({ isLoading: false, activeIntegrations: res });
        });
    }

    addIntegration =(integration, id) => {
        openModal(`${integration.title} Integration`, <CreateEditIntegration
          id={id} integration={integration}
          projectId={this.props.projectId} onComplete={this.fetch}
        />);
    }

    render() {
        const integrationList = this.props.getValue('integration_data') && JSON.parse(this.props.getValue('integration_data'));
        return (
            <div>
                {this.state.isLoading && !this.state.activeIntegrations && (
                <div className="text-center">
                    <Loader/>
                </div>
                )}
                <div>
                    {this.state.activeIntegrations && (
                        this.props.integrations.map((i, index) => (
                            <Integration
                              addIntegration={this.addIntegration}
                              editIntegration={this.editIntegration}
                              projectId={this.props.projectId}
                              id={i}
                              key={i}
                              activeIntegrations={this.state.activeIntegrations[index]}
                              integration={integrationList[i]}
                            />
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default ConfigProvider(IntegrationList);
