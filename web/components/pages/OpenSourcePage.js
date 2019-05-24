import React, {Component} from 'react';
import Tabs from '../base/forms/Tabs';
import SegmentStore from "../../../common/stores/segment-list-store";
import TabItem from "../base/forms/TabItem";

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
                        onChange={(tab)=>this.setState({tab})}
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
                            <div>
                                <a className="open-source-card" href="https://github.com/SolidStateGroup/bullet-train-api" target="_blank">
                                    <div className="panel panel-default panel--open-source mt-5">
                                        <div className="panel-content">
                                            <h2>bullet-train-api</h2>
                                            <p className="m-0">Python REST API for Bullet-Train. Ship features with confidence using feature flags and remote config. Host yourself or use our hosted version at <a href="https://bullet-train.io/" rel="nofollow">https://bullet-train.io/</a>
                                            </p>
                                            <div className="colour-block colour-block--small colour-block--python"/>
                                            <small className="technology-name">Python</small>
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
                            <div>
                                Tab 2
                            </div>
                        </TabItem>
                    </Tabs>

                </div>

            </div>
        );
    }
}
