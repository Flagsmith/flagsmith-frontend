// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class TheComponent extends PureComponent {
    static displayName = 'Rule';

    static propTypes = {};

    renderRule = (rule,i)=>{
        const { props: {rule:{any:{rules}}} } = this;
        const isLastRule = i === (rules.length-1);
        const hasOr = i >0 ;
        return (
            <div className="rule__row">
                {hasOr && (
                    <Row className="or-divider">
                        <Row>
                        <div className="or-divider__up"/>
                        Or
                        <div className="or-divider__down"/>
                        </Row>
                        <Flex className="or-divider__line"></Flex>
                    </Row>
                )}
                <Row noWrap className="rule reveal">
                    <Flex>
                        {rule.property}
                    </Flex>
                    <div>
                    {isLastRule && (
                        <Row noWrap>
                            <Button className="btn btn--anchor">
                                OR
                            </Button>
                        <div>
                            <button
                                id="remove-feature"
                                onClick={() => this.confirmRemove(projectFlags[i], () => {
                                    removeFlag(this.props.params.projectId, projectFlags[i])
                                })}
                                className={"btn btn--with-icon btn--condensed reveal--child btn--remove"}>
                                <RemoveIcon />
                            </button>
                        </div>
                    </Row>
                    )}
                    </div>
            </Row>
            </div>
        )
    }

    render() {
        const { props: {rule:{any:{rules}}} } = this;
        return (
            <FormGroup>
            <div className="panel">
                <div className="panel-content">
                    {rules.map(this.renderRule)}
                </div>
            </div>
            </FormGroup>
        );
    }
}
