import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App'; // App Wrapper
import HomePage from './components/pages/HomePage';
import MarkupPage from './components/pages/__MarkupPage__';
import DemoPage from './components/pages/DemoPage';
import ProjectSelectPage from './components/pages/ProjectSelectPage';
import CreateOrganisationPage from './components/pages/CreateOrganisationPage';
import CreateEnvironmentPage from './components/pages/CreateEnvironmentPage';
import UsersPage from './components/pages/UsersPage';
import UserPage from './components/pages/UserPage';
import FlagsPage from './components/pages/FeaturesPage';
import SegmentsPage from './components/pages/SegmentsPage';
import OrganisationSettingsPage from './components/pages/OrganisationSettingsPage';
import ComingSoon from './components/pages/ComingSoonPage';
import ProjectSettingsPage from './components/pages/ProjectSettingsPage';
import WhatAreFeatureFlagsPage from './components/pages/WhatAreFeatureFlagsPage';
import WhenFeatureFlagsGoWrong from './components/pages/blog/WhenFeatureFlagsGoWrong';
import SimulateScenarios from './components/pages/blog/SimulateScenarios';
import HowToUseFeatureFlags from './components/pages/blog/HowToUseFeatureFlags';
import HackingOurE2E from './components/pages/blog/HackingOurE2E';
import SevenReasons from './components/pages/blog/SevenReasons';
import PasswordResetPage from './components/pages/PasswordResetPage';
import EnvironmentSettingsPage from './components/pages/EnvironmentSettingsPage';
import InvitePage from './components/pages/InvitePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PricingPage from './components/pages/PricingPage';
import TermsPoliciesPage from './components/pages/TermsPoliciesPage';
import OpenSourcePage from './components/pages/OpenSourcePage';
import FeaturesExamplePage from './components/pages/FeaturesExamplePage';
import AuditLogPage from './components/pages/AuditLogPage';

window.Link = Link;


export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="markup" component={MarkupPage}/>
        <Route path="login" component={HomePage}/>
        <Route path="demo" component={DemoPage}/>
        <Route path="signup" component={HomePage}/>
        <Route path="home" component={HomePage}/>
        <Route path="pricing" component={PricingPage}/>
        <Route path="legal/:section" component={TermsPoliciesPage}/>
        <Route path="legal" component={TermsPoliciesPage}/>
        <Route path="open-source" component={OpenSourcePage}/>
        <Route path="features" component={FeaturesExamplePage}/>
        <Route path="projects" component={ProjectSelectPage}/>
        <Route path="/blog/remote-config-and-feature-flags" component={WhatAreFeatureFlagsPage}/>
        <Route path="/blog/01" component={WhenFeatureFlagsGoWrong}/>
        <Route path="/blog/02" component={SimulateScenarios}/>
        <Route path="/blog/03" component={HowToUseFeatureFlags}/>
        <Route path="/blog/04" component={HackingOurE2E}/>
        <Route path="/blog/05" component={SevenReasons}/>
        <Route path="password-reset/confirm/:uid/:token/" component={PasswordResetPage}/>
        <Route path="project/:projectId/environment/:environmentId/features" component={FlagsPage}/>
        <Route path="invite/:id" component={InvitePage}/>
        <Route path="project/:projectId/environment/:environmentId/settings" component={EnvironmentSettingsPage}/>
        <Route path="project/:projectId/environment/:environmentId/users" component={UsersPage}/>
        <Route path="project/:projectId/environment/:environmentId/users/:id" component={UserPage}/>
        <Route path="project/:projectId/environment/create" exact component={CreateEnvironmentPage}/>
        <Route path="project/:projectId/environment/:environmentId/project-settings" exact component={ProjectSettingsPage}/>
        <Route path="project/:projectId/environment/:environmentId/segments" exact component={SegmentsPage}/>
        <Route path="project/:projectId/environment/:environmentId/organisation-settings" exact component={OrganisationSettingsPage}/>
        <Route path="project/:projectId/environment/:environmentId/audit-log" exact component={AuditLogPage}/>
        <Route path="create" component={CreateOrganisationPage}/>
        <Route path="404" component={NotFoundPage}/>
        <Redirect from="*" to="404"/>
    </Route>
);
