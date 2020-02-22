import React, { Component } from 'react';
import propTypes from 'prop-types';
import PermissionsStore from '../stores/permissions-store';
import ConfigProvider from './ConfigProvider';

const Permission = class extends Component {
  static displayName = 'Permission'

  static propTypes = {
      id: propTypes.string.isRequired,
      level: propTypes.string.isRequired,
      permission: propTypes.string.isRequired,
      loadingView: propTypes.any,
  }

  constructor(props, context) {
      super(props, context);
      this.state = {
          isLoading: !PermissionsStore.getPermissions(this.props.id, this.props.level),
      };
      ES6Component(this);
  }

  componentDidMount() {
      if (this.state.isLoading) {
          AppActions.getPermissions(this.props.id, this.props.level);
      }
      this.listenTo(PermissionsStore, 'change', () => {
          this.setState({
              isLoading: !PermissionsStore.getPermissions(this.props.id, this.props.level),
          });
      });
  }

  render() {
      const permission = PermissionsStore.getPermission(this.props.id, this.props.level, this.props.permission);
      const isLoading = this.state.isLoading;
      return this.props.children({ permission, isLoading }) || <div/>;
  }
};

module.exports = ConfigProvider(Permission);
