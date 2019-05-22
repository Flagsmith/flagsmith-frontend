import React, {Component, PropTypes} from 'react';
import Rule from './Rule';
import Tabs from "../base/forms/Tabs";
import TabItem from "../base/forms/TabItem";
import Highlight from "../Highlight";
import engine from 'bullet-train-rules-engine';
import SegmentStore from '../../../common/stores/segment-list-store';
const CreateSegment = class extends Component {
        displayName: 'CreateSegment'

        constructor(props, context) {
            super(props, context);
            ES6Component(this);
            const {description, name, id, rules = []} = this.props.segment ? _.cloneDeep(this.props.segment) :
                {
                    rules: [{all: {rules: [{any: {rules: [{...Constants.defaultRule}]}}]},}]
                }

            this.state = {
                tab: 0, description, name, rules, id,
                data: `{\n}`
            };
            this.listenTo(SegmentStore, 'saved', ()=>{
                this.close()
            })
        }

        addRule = () => {
            const rules = this.state.rules;
            rules[0].all.rules = rules[0].all.rules.concat([{
                any: {
                    rules: [
                        {...Constants.defaultRule}
                    ]
                }
            }]);
            this.setState({rules})
        }

        close() {
            closeModal();
        }


        componentDidMount = () => {
            this.focusTimeout = setTimeout(() => {
                this.input.focus();
                this.focusTimeout = null;
            }, 500);
        };

        componentWillUnmount() {
            if (this.focusTimeout) {
                clearTimeout(this.focusTimeout);
            }
        }

        updateRule = (rulesIndex, elementNumber, newValue) => {
            const {rules} = this.state;
            rules[rulesIndex].all.rules[elementNumber] = newValue;
            this.setData(this.state.exampleData);
            this.setState({rules});
        }

        removeRule = (rulesIndex, elementNumber) => {
            const {rules} = this.state;
            rules[rulesIndex].all.rules.splice(elementNumber, 1);
            this.setData(this.state.exampleData);
            this.setState({rules});
        }

        save = (e) => {
            Utils.preventDefault(e);
            const {state: {description,id, name, rules}} = this;
            console.log({
                description,
                name,
                rules,
                id
            });
            if (description && name) {
                if(this.props.segment) {
                    AppActions.editSegment(this.props.projectId,{description,name,rules,id});
                } else {
                    AppActions.createSegment(this.props.projectId,{description,name,rules});
                }
            }
        };

        setData = (data) => {
            console.log(data)
            try {
                data = JSON.parse(data)
                engine(data, this.state.rules)
                    .then((ruleEval)=>{
                        this.setState({exampleData:data, ruleEval})
                    })
            } catch(e){}

            // this.codeEditor.highlightCode();
            // this.setState({data})
        }

        render() {
            const {name, description, rules, isSaving, createSegment, editSegment} = this.state;
            const {isEdit, segment, identity} = this.props;

            const rulesEl = <div className="panel--grey overflow-visible">
                <div>
                    <FormGroup>
                        {rules[0].all.rules.map((rule, i) => (
                                <div>
                                    {i > 0 && (
                                        <Row className="and-divider">
                                            <Flex className="and-divider__line"></Flex>
                                            AND
                                            <Flex className="and-divider__line"></Flex>
                                        </Row>
                                    )}
                                    <Rule rule={rule}
                                          onRemove={(v) => this.removeRule(0, i, v)}
                                          onChange={(v) => this.updateRule(0, i, v)}
                                    />
                                </div>
                            )
                        )}
                    </FormGroup>
                    <div onClick={this.addRule} style={{marginTop: 20}}
                         className={"text-center"}
                    >
                        <Button type="button" className="btn btn--anchor">
                            ADD RULE
                        </Button>
                    </div>
                </div>
            </div>;

            return (
                <div>
                    {/*<FormGroup className="mb-4">*/}
                    {/*    <Tabs className={"pill"} value={this.state.tab}*/}
                    {/*          onChange={(tab) => this.setState({tab})}>*/}
                    {/*        <TabItem id={"btn-select-flags"}*/}
                    {/*                 value={"CREATE"}*/}
                    {/*                 tabLabel={<Row className={"row-center"}>*/}
                    {/*                     <ion className="tab-icon ion-ios-switch"/>*/}
                    {/*                     Create</Row>}/>*/}
                    {/*        <TabItem*/}
                    {/*            value={"CONFIG"}*/}
                    {/*            id={"btn-select-remote-config"} tabLabel={<Row className={"row-center"}>*/}
                    {/*            <ion className="tab-icon ion-ios-settings"/>*/}
                    {/*            Preview</Row>}/>*/}
                    {/*    </Tabs>*/}
                    {/*</FormGroup>*/}

                    {this.state.tab === 0 ? (
                        <form
                            id="create-segment-modal"
                            onSubmit={this.save}
                        >
                            <InputGroup
                                ref={(e) => this.input = e}
                                inputProps={{
                                    className: "full-width",
                                    name: "featureID"
                                }}
                                value={name}
                                onChange={(e) => this.setState({name: Format.enumeration.set(Utils.safeParseEventValue(e)).toLowerCase()})}
                                isValid={name && name.length}
                                type="text" title={isEdit ? "ID" : "ID*"}
                                placeholder="E.g. power_users"
                            />

                            <FormGroup>
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
                                    placeholder="e.g. 'People who have spent over $100' "
                                />
                            </FormGroup>

                            <div className={"form-group "}>
                                <label className="cols-sm-2 control-label">Include users when</label>
                                {
                                    rulesEl
                                }
                            </div>

                            <div className="text-right">
                                {isEdit ? (
                                    <Button type="submit" id="update-feature-btn" disabled={isSaving || !name}>
                                        {isSaving ? 'Creating' : 'Update Segment'}
                                    </Button>
                                ) : (
                                    <Button type="submit" id="create-feature-btn" disabled={isSaving || !name}>
                                        {isSaving ? 'Creating' : 'Create Segment'}
                                    </Button>
                                )}
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className={"hljs-container"}>
                                <Highlight ref={(e)=>this.codeEditor = e} onChange={(text) => {
                                    this.setData(text);
                                }} className={"json"}>
                                    {this.state.data}
                                </Highlight>
                            </div>
                            <div className="text-center">Paste in your user JSON to see if they belong to your segment</div>
                            {rulesEl}
                        </div>
                    )}
                </div>
            )
        }
    }
;

CreateSegment.propTypes = {};

module.exports = hot(module)(CreateSegment);
