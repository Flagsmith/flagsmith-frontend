
import React, { Component } from 'react';
import _data from '../../common/data/base/_data';

const CreateEditIntegration = require('./modals/CreateEditIntegrationModal');

const integrationList = {
    datadog: {
        perEnvironment: false,
        image: '/images/integrations/datadog.svg',
        fields: [
            { key: 'base_url', label: 'Base URL' },
            { key: 'api_key', label: 'API Key' },
        ],
        tags: ['logging'],
        title: 'Data dog',
        description: 'Sends logs to Data dog for when flags are created, updated and removed. Logs are tagged with the environment they came from e.g. production.\n',
    },
}; // we need this to make JSX compile


class Integration extends Component {
    add =() => {
        this.props.addIntegration(this.props.integration);
    }

    render() {
        const { image, title, description } = this.props.integration;
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
                    <Button
                      className="btn-lg btn-primary ml-4" id="show-create-segment-btn" data-test="show-create-segment-btn"
                      onClick={this.add}
                    >
                        <span className="icon ion-ios-apps"/>
                        {' '}
                        Add integration
                    </Button>
                </Row>
                )}
            >
                <div className="text-center">

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

    addIntegration =(integration) => {
        openModal(`${integration.title} Integration`, <CreateEditIntegration integration={integration} projectId={this.props.projectId} onComplete={this.refresh} />);
    }

    render() {
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
                              projectId={this.props.projectId}
                              key={i}
                              activeIntegration={this.state.activeIntegrations[index]}
                              integration={integrationList[i]}
                            />
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default IntegrationList;
