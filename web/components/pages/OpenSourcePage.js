import React, { Component } from 'react';
import Tabs from '../base/forms/Tabs';
import SegmentStore from '../../../common/stores/segment-list-store';
import TabItem from '../base/forms/TabItem';

export default class OpenSourcePage extends Component {
    static displayName = 'OpenSourcePage'

    constructor(props, context) {
        super(props, context);
        ES6Component(this);

        this.state = {
            tab: 0,
        };
    }

    setTab = (tab) => {
        this.setState({ tab, type: this.getTypeFromTab(tab) });
    };


    render() {
        return (
            <div className="">
                <div className="hero__open-source pt-3 text-center">
                    <h1 className="display pt-5">Open Source</h1>
                    <p className="pb-3">All of our open source repositiories are listed here</p>
                </div>

                <div className="container">

                    <Tabs
                      className="pill" value={this.state.tab}
                      onChange={tab => this.setState({ tab })}
                    >
                        <TabItem
                          id="btn-select-flags"
                          value="Platform"
                          tabLabel={(
                              <Row className="row-center">
                                    Platform
                              </Row>
                            )}
                        >
                            <div className="mb-5">
                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-api" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-api</h2>
                                            <p className="m-0">
Python REST API for Bullet-Train.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--python"/>
                                            <small className="technology-name">Python</small>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-frontend" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-frontend</h2>
                                            <p className="m-0">
Website and mobile app for Bullet Train.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--javascript"/>
                                            <small className="technology-name">JavaScript</small>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-docs" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-docs</h2>
                                            <p className="m-0">
This is the documentation repository for the Docs of Bullet Train.
                                            </p>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-examples" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-examples</h2>
                                            <p className="m-0">
A collection of integrations to Bullet Train in a number of different frameworks.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--typescript"/>
                                            <small className="technology-name">TypeScript</small>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-rules-engine" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-rules-engine</h2>
                                            <p className="m-0">
Evaluate objects against a set of JSON rules supporting nested ALL, NONE and ANY predicates with standard operators.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--javascript"/>
                                            <small className="technology-name">JavaScript</small>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </TabItem>

                        <TabItem
                          value="Client"
                          id="btn-select-remote-config" tabLabel={(
                              <Row className="row-center">
                                Client libraries
                              </Row>
                        )}
                        >
                            <div className="mb-5">
                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-js-client" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-js-client</h2>
                                            <p className="m-0">
Javascript/React/React Native client.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--javascript"/>
                                            <small className="technology-name">JavaScript</small>
                                        </div>
                                    </div>
                                </a>
                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-nodejs-client" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-nodejs-client</h2>
                                            <p className="m-0">
Node.js client.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--javascript"/>
                                            <small className="technology-name">JavaScript</small>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-dotnet-client" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-dotnet-client</h2>
                                            <p className="m-0">
.NET Standard client.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--c"/>
                                            <small className="technology-name">C#</small>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-ruby-client" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-ruby-client</h2>
                                            <p className="m-0">
Ruby client.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--ruby"/>
                                            <small className="technology-name">Ruby</small>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-python-client" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-python-client</h2>
                                            <p className="m-0">
Python client.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--python"/>
                                            <small className="technology-name">Python</small>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-java-client" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-java-client</h2>
                                            <p className="m-0">
Java/Android client.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--java"/>
                                            <small className="technology-name">Java</small>
                                        </div>
                                    </div>
                                </a>

                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-ios-client" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-4">
                                        <div className="panel-content">
                                            <h2>bullet-train-ios-client</h2>
                                            <p className="m-0">
iOS/Swift client.
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--java"/>
                                            <small className="technology-name">iOS/Swift</small>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </TabItem>
                    </Tabs>

                </div>

            </div>
        );
    }
}
