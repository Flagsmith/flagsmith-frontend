// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AccountStore from '../../common/stores/account-store';

export default class TheComponent extends PureComponent {
  static displayName = 'TheComponent';

  static propTypes = {};

  render() {
      // const { props } = this;
      return (
          <div>
              <AccountProvider>
                  {({ isSaving, twoFactorEnabled }, { login }) => (
                      <div>
                          {!twoFactorEnabled && (
                          <div>
                              <Button>
                                Enable Two-Factor Authentication
                              </Button>
                          </div>
                          )}
                      </div>
                  )}
              </AccountProvider>
          </div>
      );
  }
}
