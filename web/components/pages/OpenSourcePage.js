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
            <div className="app-container container-fluid">
                <div className="hero__open-source text-center">
                <h1>Open Source</h1>
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
                                    <ion className="tab-icon ion-ios-switch"/>
                                    Platform
                                </Row>
                            )}
                        >
                            <div>
                                <div className="panel panel-default mt-5">
                                    <div className="panel-content">
                                        <h2>Bullet Train API</h2>
                                    </div>
                                </div>
                            </div>
                        </TabItem>
                        <TabItem
                            value="Client"
                            id="btn-select-remote-config" tabLabel={(
                            <Row className="row-center">
                                <ion className="tab-icon ion-ios-settings"/>
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
