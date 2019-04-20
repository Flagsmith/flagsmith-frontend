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
                            <Button className="btn btn-anchor">
                                OR
                            </Button>
                            <button
                                id="remove-feature"
                                onClick={() => {

                                }}
                                className={"btn btn-link btn-remove"}>
                                <span className="ion ion-md-close"/>
                            </button>
                        </Row>
                    </Row>

                </div>
            </div>
            </FormGroup>
        );
    }
}
