import React, { Component } from 'react';
import Highlight from '../Highlight';
import Tabs from '../base/forms/Tabs';
import TabItem from '../base/forms/TabItem';
import withSegmentOverrides from '../../../common/providers/withSegmentOverrides';
import data from '../../../common/data/base/_data';
import SegmentOverrides from '../SegmentOverrides';
import ChipInput from '../ChipInput';

const CreateUser = class extends Component {
    static displayName = 'CreateUser'

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            text: '',
            value: [],
        };
    }

    close() {
        closeModal();
    }


    componentDidMount = () => {
        if (!E2E) {
            this.focusTimeout = setTimeout(() => {
                this.input.focus();
                this.focusTimeout = null;
            }, 500);
        }
    };

    componentWillUnmount() {
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
        }
    }

    submit = () => {
        const value = this.state.value;
        data.post(''.concat(Project.api, 'environments/').concat(this.props.environmentId, '/identities/'), {
            environment: this.props.environmentId,
            identifier: value[0],
        }).then(() => {
            closeModal();
            AppActions.getIdentities(this.props.environmentId);
        });
        data.get(`${Project.api}identities/?identifier=' + encodeURIComponent(identity)`);
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <label>
                        User IDs
                    </label>
                </FormGroup>
                <FormGroup className="text-right">
                    <ChipInput
                      placeholder="User1, User2, User3"
                      onChange={value => this.setState({ value })}
                      text={this.state.text}
                      value={this.state.value}
                      fullWidth
                    />
                </FormGroup>
                <FormGroup className="text-right">
                    <Button onClick={this.submit} disabled={!this.state.value || !this.state.value.length} >
                          Create users
                    </Button>
                </FormGroup>
            </div>
        );
    }
};

CreateUser.propTypes = {};

module.exports = CreateUser;
