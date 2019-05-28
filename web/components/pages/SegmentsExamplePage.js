/**
 * Created by niallquinn on 28/05/2019.
 */

import React, { Component } from 'react';

export default class SegmentsExampleView extends Component {
    static displayName = 'SegmentsExamplePage'

    render() {
        return (
            <div>
                <div className="container app-container text-center mb-4">
                    <div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                        <h1>Segments</h1>
                        <p>Create detailed user segments for feature targeting. Try the example form below to see how your user traits affect the segments you belong to!</p>
                    </div>
                </div>


                <div className="container">
                    <div className="row user-stats mt-3 mb-5">
                        <div className="col-md-2 col-xs-12">
                            <h4>User Traits</h4>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">102</p>
                            <p>Page Views</p>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">12</p>
                            <p>Log ins</p>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">826</p>
                            <p>Seconds on page</p>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">2</p>
                            <p>Submitted form</p>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <p className="user-stats__value m-0">33</p>
                            <p>Years old</p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 segments-form-example pr-3 pl-3">
                            <FormGroup className="pb-3 pt-5">
                                <Input
                                    inputProps={{
                                        name: 'Age',
                                        className: 'full-width',
                                    }}
                                    className="input-default full-width"
                                    placeholder="Age"
                                    type="number"
                                    name="firstName" id="firstName"
                                />
                            </FormGroup>

                            <FormGroup className="pb-3">
                                <Input
                                    inputProps={{
                                        name: 'Location',
                                        className: 'full-width',
                                    }}
                                    className="input-default full-width"
                                    placeholder="Location"
                                    type="number"
                                    name="firstName" id="firstName"
                                />
                            </FormGroup>

                            <Button className="btn-block">Submit</Button>

                        </div>
                        <div className="col-md-6">
                            <div className="panel panel__segments-achievements segment-achievements">
                                <div className="panel-heading">
                                    <Row space>
                                        <Row className="flex-1">
                                            <span className="panel-icon"><ion className="icon ion-ios-rocket"/></span>
                                            <h6 className="m-b-0">User Segments</h6>
                                        </Row>
                                    </Row>
                                </div>
                                <div className="panel-content">

                                    <Row>
                                        <span className="panel-icon panel-icon--success"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Viewed page 4 times</h6>
                                    </Row>

                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Spent 30 seconds on page</h6>
                                    </Row>
                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Is over 30 years old</h6>
                                    </Row>
                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Logged in 5 times</h6>
                                    </Row>
                                    <Row className="mt-3">
                                        <span className="panel-icon panel-icon--disabled"><ion className="icon ion-ios-rocket"/></span>
                                        <h6 className="segment-achievements__text">Submitted form</h6>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}
