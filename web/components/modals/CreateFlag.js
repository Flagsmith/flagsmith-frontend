import React, {Component, PropTypes} from 'react';
import Highlight from '../Highlight';
import Tabs from '../base/forms/Tabs';
import TabItem from '../base/forms/TabItem';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        const {name, feature_state_value, description, enabled} = this.props.isEdit ? Utils.getFlagValue(this.props.projectFlag, this.props.environmentFlag, this.props.identityFlag) : {};
        const {allowEditDescription} = this.props;
        this.state = {
            enabled,
            name,
            initial_value: Utils.getTypedValue(feature_state_value),
            description,
            allowEditDescription
        };
    }

    close() {
        closeModal();
    }


    componentDidMount = () => {
        if (!this.props.isEdit) {
            setTimeout(() => {
                this.input.focus()
            }, 500);
        }
    };

    render() {
        const {name, initial_value, description, enabled} = this.state;
        const {isEdit, projectFlag, environmentFlag, identity} = this.props;
        const Provider = identity ? IdentityProvider : FeatureListProvider;
        const valueString = isEdit ? "Value" : "Initial value";
        return (
            <ProjectProvider
                id={this.props.projectId}>
                {({project}) => (
                    <Provider onSave={this.close}>
                        {({isLoading, isSaving, error}, {createFlag, editFlag}) => (
                            <form
                                id="create-feature-modal"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const func = isEdit ? editFlag : createFlag;
                                    this.save(func, isSaving);
                                }}>
                                <FormGroup>
                                    <label>Feature type</label>
                                    <Tabs className={"pill"} value={this.state.tab}
                                          onChange={(tab) => this.setState({tab})}>
                                        <TabItem id={"btn-select-flags"}
                                                 value={"FLAG"}
                                                 tabLabel={<Row className={"row-center"}>
                                            <ion className="tab-icon ion-ios-switch"/>
                                            Feature Flag</Row>}/>
                                        <TabItem
                                            value={"CONFIG"}
                                            id={"btn-select-remote-config"} tabLabel={<Row className={"row-center"}>
                                            <ion className="tab-icon ion-ios-settings"/>
                                            Remote config</Row>}/>
                                    </Tabs>
                                </FormGroup>
                                <InputGroup
                                    ref={(e) => this.input = e}
                                    inputProps={{
                                        readOnly: isEdit,
                                        className: "full-width",
                                        name: "featureID"
                                    }}
                                    value={name}
                                    onChange={(e) => this.setState({name: Format.enumeration.set(Utils.safeParseEventValue(e)).toLowerCase()})}
                                    isValid={name && name.length}
                                    type="text" title={isEdit ? "ID" : "ID*"}
                                    placeholder="E.g. header_size"/>
                                <InputGroup
                                    value={initial_value}
                                    inputProps={{name: "featureValue", className: "full-width"}}
                                    onChange={(e) => this.setState({initial_value: Utils.getTypedValue(Utils.safeParseEventValue(e))})}
                                    type="text"
                                    title={valueString + " (optional)" + (!isEdit ? " - these can be set later per environment" : "")}
                                    placeholder="e.g. 'big' "/>

                                <InputGroup
                                    value={description}
                                    inputProps={{
                                        className: "full-width",
                                        readOnly: identity ? true : false,
                                        name: "featureDesc"
                                    }}
                                    onChange={(e) => this.setState({description: Utils.safeParseEventValue(e)})}
                                    isValid={name && name.length}
                                    type="text" title="Description (optional)"
                                    placeholder="e.g. 'This determines what size the header is' "/>

                                {error && <Error error={error}/>}
                                {isEdit && (
                                    <div>
                                        {identity ? (
                                            <p className={"text-right faint-lg"}>
                                                This will update the feature value for the
                                                user <strong>{identity}</strong> in<strong> {
                                                _.find(project.environments, {api_key: this.props.environmentId}).name
                                            }</strong>
                                            </p>
                                        ) : (
                                            <p className={"text-right faint-lg"}>
                                                This will update the feature value for the environment <strong>{
                                                _.find(project.environments, {api_key: this.props.environmentId}).name
                                            }</strong>
                                            </p>
                                        )}

                                    </div>
                                )}

                                <FormGroup className={"flag-example"}>
                                    <strong>Example SDK response:</strong>
                                    <Highlight className={"json no-pad"}>
                                        {JSON.stringify({value: initial_value, name, enabled})}
                                    </Highlight>
                                </FormGroup>

                                <div className="pull-right">
                                    {isEdit ? (
                                        <Button id="update-feature-btn" disabled={isSaving || !name}>
                                            {isSaving ? 'Creating' : 'Update Feature'}
                                        </Button>
                                    ) : (
                                        <Button id="create-feature-btn" disabled={isSaving || !name}>
                                            {isSaving ? 'Creating' : 'Create Feature'}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        )}

                    </Provider>
                )}
            </ProjectProvider>
        );
    }

    save = (func, isSaving) => {
        const {projectFlag, environmentFlag, identity, identityFlag, environmentId} = this.props;
        const {name, initial_value, description} = this.state;
        if (identity) {
            !isSaving && name && func({
                identity,
                projectFlag,
                environmentFlag,
                identityFlag: Object.assign({}, identityFlag || {}, {feature_state_value: initial_value}),
                environmentId
            })
        } else {
            !isSaving && name && func(this.props.projectId, this.props.environmentId, {
                name,
                initial_value,
                description
            }, projectFlag, environmentFlag)
        }

    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
