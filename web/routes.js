import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './components/App'; //App Wrapper
import DocumentationPage from './components/pages/DocumentationPage';
import HomePage from './components/pages/HomePage';
import ProjectSelectPage from './components/pages/ProjectSelectPage';
import CreateOrganisationPage from './components/pages/CreateOrganisationPage';
import CreateEnvironmentPage from './components/pages/CreateEnvironmentPage';
import UsersPage from './components/pages/UsersPage';
import UserPage from './components/pages/UserPage';
import FlagsPage from './components/pages/FeaturesPage';
import OrganisationSettingsPage from './components/pages/OrganisationSettingsPage';
import ComingSoon from './components/pages/ComingSoonPage';
import ProjectSettingsPage from './components/pages/ProjectSettingsPage';
import EnvironmentSettingsPage from './components/pages/EnvironmentSettingsPage';
import InvitePage from './components/pages/InvitePage';
import NotFoundPage from './components/pages/NotFoundPage';


window.Link = Link;


export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="login" component={HomePage}/>
        <Route path="signup" component={HomePage}/>
        <Route path="documentation" component={DocumentationPage}/>
        <Route path="projects" component={ProjectSelectPage}/>
        <Route path="project/:projectId/environment/:environmentId/features" component={FlagsPage}/>
        <Route path="invite/:id" component={InvitePage}/>
        <Route path="project/:projectId/environment/:environmentId/settings" component={EnvironmentSettingsPage}/>
        <Route path="project/:projectId/environment/:environmentId/users" component={UsersPage}/>
        <Route path="project/:projectId/environment/:environmentId/users/:id" component={UserPage}/>
        <Route path="project/:projectId/environment/create"  exact={true} component={CreateEnvironmentPage}/>
        <Route path="project/:projectId/environment/:environmentId/project-settings"  exact={true} component={ProjectSettingsPage}/>
        <Route path="project/:projectId/environment/:environmentId/segments"  exact={true} component={ComingSoon}/>
        <Route path="project/:projectId/environment/:environmentId/organisation-settings"  exact={true} component={OrganisationSettingsPage}/>
        <Route path="create" component={CreateOrganisationPage}/>
        <Route path="404" component={NotFoundPage}/>
        <Redirect from="*" to="404"/>
    </Route>
);
