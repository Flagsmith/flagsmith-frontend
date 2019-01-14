import React, { Component, PropTypes } from 'react';

const CancelPaymentPlanModal = class extends Component {
  static displayName = 'CancelPaymentPlanModal'

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {}

  sendCancellation = () => {
    this.setState({isSending: true});
    const {cancellationReason} = this.state;
    const org = AccountStore.getOrganisation();
    fetch(`https://post.formlyapp.com/bullet-train-payment-plan-cancellation`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          orgId: org.id,
          cancellationReason
        })
    })
        .then((res) => {
            const isSuccess = res.status >= 200 && res.status < 300;
            closeModal();
            toast(isSuccess ? 'Cancellation request sent' : 'Failed to send, try again later');
            if (isSuccess) {
              AppActions.editOrganisation(Object.assign({}, org, {pending_cancellation: true}));
            }
        })
  }

  render() {
    const { isSending } = this.state;
    return (
      <div>
        <div>You will continue being able to use Bullet Train till the end of your plan even after cancelling</div>
        <FormGroup>
          <div>
              <strong>
                  Would you like to tell us why you decided to cancel your plan?
              </strong>
          </div>
          <textarea name="cancellationReason" rows={5} value={this.state.cancellationReason} onChange={(e) => this.setState({cancellationReason: Utils.safeParseEventValue(e)})}></textarea>
        </FormGroup>
        <FormGroup className="text-right">
          <Button
            id="confirm-cancel-plan"
            className={"btn btn-primary"}
            disabled={isSending}
            onClick={this.sendCancellation}>
            Yes, cancel plan
          </Button>
        </FormGroup>
      </div>
    )
  }
}

export default CancelPaymentPlanModal;
