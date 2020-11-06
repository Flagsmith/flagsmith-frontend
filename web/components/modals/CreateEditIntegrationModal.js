import React, { Component } from 'react';
import EnvironmentSelect from '../EnvironmentSelect';

const CreateEditIntegration = class extends Component {
    static displayName = 'CreateEditIntegration'

    constructor(props, context) {
        super(props, context);
        this.state = { data: {} };
    }


    update = (key, e) => {
        this.setState({ [key]: Utils.safeParseEventValue(e) });
    }

    submit = (e) => {
        Utils.preventDefault(e);
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
                    <Button type="submit">
                        Save
                    </Button>
                </div>
            </form>
        );
    }
};

CreateEditIntegration.propTypes = {};

module.exports = CreateEditIntegration;
