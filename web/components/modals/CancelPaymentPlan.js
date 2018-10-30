import React, { Component, PropTypes } from 'react';

const CancelPaymentPlanModal = class extends Component {
  static displayName = 'CancelPaymentPlanModal'

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {}

  render() {
    return (
      <div>
        <div>You will continue being able to use Bullet Train till the end of your plan even after cancelling</div>
        <FormGroup>
          <div>
              <strong>
                  Would you like to tell us why you decided to cancel your plan?
              </strong>
          </div>
          <textarea name="cancellationReason" rows={5} value={this.state.cancellationReason} onChange={(e) => Utils.safeParseEventValue(e)}></textarea>
        </FormGroup>
        <FormGroup className="text-right">
          <Button
            id="confirm-cancel-plan"
            className={"btn btn-primary"}>
            Yes, cancel plan
          </Button>
        </FormGroup>
      </div>
    )
  }
}

export default CancelPaymentPlanModal;
