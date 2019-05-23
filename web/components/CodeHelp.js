import React, { Component, PropTypes } from 'react';
import Tabs from './base/forms/Tabs';
import TabItem from './base/forms/TabItem';
import Highlight from './Highlight';

const CodeHelp = class extends Component {
    static displayName = 'CodeHelp'

    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: this.props.showInitially || this.props.hideHeader,
        };
    }

    copy = (s) => {
        const res = Clipboard.setString(s);
        toast(res ? 'Clipboard set' : 'Could not set clipboard :(');
    };

    render() {
        const { hideHeader } = this.props;
        return (
            <div>
                {!hideHeader && (
                    <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ visible: !this.state.visible })}>
                        <Row>
                            <Flex>
                                <div>
                                    <pre className="hljs-header">
                                        <ion className="ion-ios-code"/>
                                        {' '}
Code example:
                                        {' '}
                                        <span className="hljs-description">
                                            {this.props.title}
                                            {' '}
                                        </span>
                                        <ion
                                          className={this.state.visible ? 'icon ion-ios-arrow-down' : 'icon ion-ios-arrow-forward'}
                                        />
                                    </pre>
                                </div>
                            </Flex>
                        </Row>
                    </div>
                )}

                {this.state.visible && (
                    <div className="tabbed">
                        <Tabs value={this.state.tab} onChange={tab => this.setState({ tab })}>
                            {_.map(this.props.snippets, (s, key) => (
                                <TabItem tabLabel={key}>
                                    <div className="hljs-container">
                                        <Highlight className={Constants.codeHelp.keys[key]}>
                                            {s}
                                        </Highlight>
                                        <Button onClick={() => this.copy(s)} className="btn btn-primary hljs-copy">
                                            Copy
                                        </Button>
                                    </div>
                                </TabItem>
                            ))}
                        </Tabs>
                    </div>
                )}

            </div>
        );
    }
};

CodeHelp.propTypes = {};

module.exports = CodeHelp;
