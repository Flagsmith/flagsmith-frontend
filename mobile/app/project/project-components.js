// global.LoginProvider = require('../common-mobile/providers/LoginProvider');
import React from 'react';

global.AccountStore = require('../../common-mobile/stores/account-store');
window.IdentityProvider = require('../../common-mobile/providers/IdentityProvider');
window.SegmentListProvider = require('../../common-mobile/providers/SegmentListProvider');
window.AccountProvider = require('../../common-mobile/providers/AccountProvider');
window.AccountStore = require('../../common-mobile/stores/account-store');
window.FeatureListProvider = require('../../common-mobile/providers/FeatureListProvider');
window.OrganisationProvider = require('../../common-mobile/providers/OrganisationProvider');
window.SelectedProjectProvider = require('../../common-mobile/providers/SelectedProjectProvider');
window.ProjectProvider = require('../../common-mobile/providers/ProjectProvider');
window.EnvironmentProvider = require('../../common-mobile/providers/EnvironmentProvider');
window.IdentityListProvider = require('../../common-mobile/providers/IdentityListProvider');
import ProjectNavigator from '../components/ProjectNavigator'
global.ProjectNavigator = ProjectNavigator;
