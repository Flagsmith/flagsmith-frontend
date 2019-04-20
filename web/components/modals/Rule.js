// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class TheComponent extends PureComponent {
    static displayName = 'Rule';

    static propTypes = {};

    render() {
        const { props: {} } = this;
        return (
            <FormGroup>
            <div className="panel">
                <div className="panel-content">
                    <Row space>
                        <div></div>
                        <div></div>
                        <Row>
                            <Button className="btn btn--anchor">
                                OR
                            </Button>
                            <Column>
                                <button
                                    id="remove-feature"
                                    onClick={() => this.confirmRemove(projectFlags[i], () => {
                                        removeFlag(this.props.params.projectId, projectFlags[i])
                                    })}
                                    className={"btn btn--with-icon"}>
                                    <img className="btn__icon" src="/images/icons/bin.svg" alt="Delete"/>
                                </button>
                            </Column>
                        </Row>
                    </Row>

                </div>
            </div>
            </FormGroup>
        );
    }
}
