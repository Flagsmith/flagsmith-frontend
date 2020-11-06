import React, { Component } from 'react';
import EnvironmentSelect from '../EnvironmentSelect';
import _data from '../../../common/data/base/_data';

const CreateEditIntegration = class extends Component {
    static displayName = 'CreateEditIntegration'

    constructor(props, context) {
        super(props, context);
        this.state = { data: this.props.data || {} };
    }


    update = (key, e) => {
        this.setState({ data: {
            ...this.state.data,
            [key]: Utils.safeParseEventValue(e),
        },
        });
    }

    onComplete() {
        closeModal();
        this.props.onComplete && this.props.onComplete();
    }

    submit = (e) => {
        Utils.preventDefault(e);
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        if (this.props.data) {
            _data.put(`${Project.api}projects/${this.props.projectId}/integrations/${this.props.id}/`, this.state.data)
                .then(this.onComplete).catch(this.onError);
        } else {
            _data.post(`${Project.api}projects/${this.props.projectId}/integrations/`, this.state.data)
                .then(this.onComplete).catch(this.onError);
        }
    }

    onError = () => {
        this.setState({
            error: true,
            isLoading: false,
        });
    }

    render() {
        return (
            <form
              data-test="create-project-modal"
              id="create-project-modal" onSubmit={this.submit}
            >
                {this.props.integration.perEnv && (
                  <>
                      <label>Bullet Train Environment</label>
                      <EnvironmentSelect value={this.state.api_key} onChange={environment => this.update(environment)}/>
                  </>
                )}
                {this.props.integration.fields.map(field => (
                  <>
                      <div>
                          <label htmlFor={field.label.replace(/ /g, '')}>
                              {field.label}
                          </label>
                      </div>
                      <Input
                        id={field.label.replace(/ /g, '')}
                        ref={e => this.input = e}
                        value={this.state[field.key]}
                        onChange={e => this.update(field.key, e)}
                        isValid={!!this.state[field.key]}
                        type="text"
                        className="full-width mb-2"
                      />
                  </>
                ))}
                <div className="text-right">
                    <Button disabled={this.state.isLoading} type="submit">
                        Save
                    </Button>
                </div>
            </form>
        );
    }
};

CreateEditIntegration.propTypes = {};

module.exports = CreateEditIntegration;
