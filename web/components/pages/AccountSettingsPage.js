// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '../base/forms/Button';
import ErrorMessage from '../ErrorMessage';
import _data from '../../../common/data/base/_data';
import ConfigProvider from '../../../common/providers/ConfigProvider';
import TwoFactor from '../TwoFactor';

class TheComponent extends PureComponent {
  static displayName = 'TheComponent';

  static propTypes = {};

  constructor(props) {
      super(props);
      this.state = {
          ...AccountStore.getUser(),
      };
  }

  save = (e) => {
      Utils.preventDefault(e);
      const { state: {
          first_name,
          last_name,
          error,
          isSaving,
          email,
      } } = this;
      if (isSaving || !first_name || !last_name) {
          return;
      }
      // _data.patch(`${Project.api}auth/users/me/`, {
      _data.put(`${Project.api}auth/user/`, {
          first_name,
          last_name,
          email,
          organisations: AccountStore.getUser().organisations,
      }).then(() => {
          toast('Your account has been updated');
      }).catch(error => this.setState({ error }));
  }

  savePassword = (e) => {
      Utils.preventDefault(e);
      const { state: {
          current_password,
          new_password1,
          new_password2,
      } } = this;
      if (!current_password || !new_password1 || !new_password2 || (new_password2 !== new_password1)) {
          return;
      }
      // _data.post(`${Project.api}auth/users/set_password/`, {
      _data.post(`${Project.api}auth/password/change/`, {
          new_password1,
          new_password2,
      }).then(() => {
          toast('Your password has been updated');
      }).catch(passwordError => this.setState({ passwordError }));
  }

  render() {
      const { state: {
          first_name,
          last_name,
          error,
          isSaving,
          current_password,
          new_password1,
          new_password2,
          passwordError,
          email,
      } } = this;
      return (
          <div className="app-container container">
              <h3>
                Your Account
              </h3>
              <div className="row mt-5">
                  <div className="col-md-4 col-lg-3 col-sm-12">
                      <h5>Your details</h5>
                  </div>

                  <div className="col-md-6">
                      <form className="mb-5" onSubmit={this.save}>
                          <InputGroup
                            title="First Name"
                            data-test="firstName"
                            inputProps={{
                                className: 'full-width',
                                name: 'groupName',
                            }}
                            value={first_name}
                            onChange={e => this.setState({ first_name: Utils.safeParseEventValue(e) })}
                            isValid={first_name && first_name.length}
                            type="text"
                            name="First Name*"
                            placeholder="E.g. Paul"
                          />
                          <InputGroup
                            title="Last Name"
                            data-test="lastName"
                            inputProps={{
                                className: 'full-width',
                                name: 'groupName',
                            }}
                            value={last_name}
                            onChange={e => this.setState({ last_name: Utils.safeParseEventValue(e) })}
                            isValid={last_name && last_name.length}
                            type="text"
                            name="Last Name*"
                            placeholder="E.g. Paul"
                          />
                          {error && (
                          <ErrorMessage>
                              {error}
                          </ErrorMessage>
                          )}
                          <div className="text-right">
                              <Button type="submit" disabled={isSaving || !first_name || !last_name}>
                        Save Details
                              </Button>
                          </div>

                      </form>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-4 col-lg-3 col-sm-12">
                      <h5>Change password</h5>
                  </div>
                  <div className="col-md-6">
                      <form className="mb-5" onSubmit={this.savePassword}>
                          <InputGroup
                            title="Current Password"
                            data-test="currentPassword"
                            inputProps={{
                                className: 'full-width',
                                name: 'groupName',
                            }}
                            value={current_password}
                            onChange={e => this.setState({ current_password: Utils.safeParseEventValue(e) })}
                            isValid={current_password && current_password.length}
                            type="password"
                            name="Current Password*"
                          />
                          <InputGroup
                            title="New Password"
                            data-test="newPassword"
                            inputProps={{
                                className: 'full-width',
                                name: 'groupName',
                            }}
                            value={new_password1}
                            onChange={e => this.setState({ new_password1: Utils.safeParseEventValue(e) })}
                            isValid={new_password1 && new_password1.length}
                            type="password"
                            name="New Password*"
                          />
                          <InputGroup
                            title="Confirm New Password"
                            data-test="newPassword"
                            inputProps={{
                                className: 'full-width',
                                name: 'groupName',
                            }}
                            value={new_password2}
                            onChange={e => this.setState({ new_password2: Utils.safeParseEventValue(e) })}
                            isValid={new_password2 && new_password2.length}
                            type="password"
                            name="Confirm New Password*"
                          />
                          {passwordError && (
                          <ErrorMessage>
                              {passwordError}
                          </ErrorMessage>
                          )}
                          <div className="text-right">
                              <Button type="submit" disabled={isSaving || !new_password2 || !new_password1 || !current_password || (new_password1 !== new_password2)}>
                          Save Password
                              </Button>
                          </div>
                      </form>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-4 col-lg-3 col-sm-12">

                      <h5>Two-Factor Authentication</h5>
                      <p>
                      Increase your account's security by enabling Two-Factor Authentication (2FA)
                      </p>
                  </div>
                  <div className="col-md-6">
                      {this.props.hasFeature('2_factor') && (
                      <TwoFactor/>
                      ) }
                  </div>
              </div>
          </div>
      );
  }
}

export default ConfigProvider(TheComponent);
