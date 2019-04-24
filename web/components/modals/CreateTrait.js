import React, { Component, PropTypes } from 'react';
import Highlight from '../Highlight';

const CreateTrait = class extends Component {
    static displayName = 'CreateTrait'

    constructor(props, context) {
        super(props, context);
        const { props: { trait_key, trait_value } } = this;
        this.state = { trait_key, trait_value }
    }

    close() {
        closeModal();
    }

    componentDidMount = () => {
        if (!this.props.isEdit) {
            this.focusTimeout = setTimeout(() => {
                this.input.focus();
                this.focusTimeout = null;
            }, 500);
        }
    };

    componentWillUnmount() {
		if (this.focusTimeout) {
			clearTimeout(this.focusTimeout);
		}
	}

    render() {
        const { props: { isEdit, identity, environmentId, projectId } } = this;
        const { state: { trait_key, trait_value, error, isSaving } } = this;
        var x = "test3"

        return (
            <ProjectProvider
                id={projectId}
            >
                {({ project }) => (
                    <IdentityProvider onSave={this.close}>
                        {({ isLoading, isSaving, error }, { editTrait }) => (
                            <form
                                id="create-trait-modal"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    this.save(editTrait, isSaving);
                                }}
                            >
                                <InputGroup
                                    ref={(e) => this.input = e}
                                    inputProps={{
                                        readOnly: isEdit,
                                        className: "full-width",
                                        name: "traitID"
                                    }}
                                    value={trait_key}
                                    onChange={(e) => this.setState({ trait_key: Format.enumeration.set(Utils.safeParseEventValue(e)).toLowerCase() })}
                                    isValid={trait_key && trait_key.length}
                                    type="text" title={isEdit ? "Trait ID" : "Trait ID*"}
                                    placeholder="E.g. favourite_colour"
                                />
                                <InputGroup
                                    textarea={true}
                                    inputProps={{ name: "traitValue", className: "full-width" }}
                                    value={trait_value}
                                    title="Value"
                                    onChange={(e) => this.setState({ trait_value: Utils.getTypedValue(Utils.safeParseEventValue(e)) })}
                                    type="text"
                                    placeholder="e.g. 'big', true, 1 "
                                />

                                {error && <Error error={error}/>}

                                <p className={"text-right faint-lg"}>
                                    This will {isEdit ? 'update' : 'create'} a user
                                    trait <strong>{trait_key || ''}</strong> for the
                                    user <strong>{identity}</strong> in<strong> {
                                    _.find(project.environments, { api_key: this.props.environmentId }).name
                                }</strong>
                                </p>

                                <FormGroup className={"flag-example"}>
                                    <strong>Example SDK response:</strong>
                                    <Highlight className={"json no-pad"}>
                                        {JSON.stringify({ trait_key, trait_value })}
                                    </Highlight>
                                </FormGroup>

                                <div className="text-right">
                                    {isEdit ? (
                                        <Button id="update-trait-btn" disabled={isSaving || !trait_key || !trait_value}>
                                            {isSaving ? 'Creating' : 'Update Trait'}
                                        </Button>
                                    ) : (
                                        <Button id="create-trait-btn" disabled={isSaving || !trait_key || !trait_value}>
                                            {isSaving ? 'Creating' : 'Create Trait'}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        )}
                    </IdentityProvider>
                )}
            </ProjectProvider>
        );
    }

    save = (func, isSaving) => {
        const { props: { identity, environmentId }, state: { trait_key, trait_value } } = this;
        func({
            identity,
            trait: { trait_value, trait_key },
            environmentId
        })
    }
};

CreateTrait.propTypes = {};

module.exports = CreateTrait;
