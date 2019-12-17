import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

export default (
    <App>
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/markup" exact component={MarkupPage}/>
            <Route path="/login" exact component={HomePage}/>
            <Route path="/signup" exact component={HomePage}/>
            <Route path="/demo" exact component={DemoPage}/>
            <Route path="/signup" exact component={HomePage}/>
            <Route path="/home" exact component={HomePage}/>
            <Route path="/pricing" exact component={PricingPage}/>
            <Route path="/legal/:section" exact component={TermsPoliciesPage}/>
            <Route path="/legal" exact component={TermsPoliciesPage}/>
            <Route path="/open-source" exact component={OpenSourcePage}/>
            <Route path="/features" exact component={FeaturesExamplePage}/>
            <Route path="/projects" exact component={ProjectSelectPage}/>
            <Route path="/blog/remote-config-and-feature-flags" exact component={WhatAreFeatureFlagsPage}/>
            <Route path="/blog/01" exact component={WhenFeatureFlagsGoWrong}/>
            <Route path="/blog/02" exact component={SimulateScenarios}/>
            <Route path="/blog/03" exact component={HowToUseFeatureFlags}/>
            <Route path="/blog/04" exact component={HackingOurE2E}/>
            <Route path="/blog/05" exact component={SevenReasons}/>
            <Route path="/password-reset/confirm/:uid/:token/" exact component={PasswordResetPage}/>
            <Route path="/project/:projectId/environment/:environmentId/features" exact component={FlagsPage}/>
            <Route path="/invite/:id" exact component={InvitePage}/>
            <Route path="/project/:projectId/environment/:environmentId/settings" exact component={EnvironmentSettingsPage}/>
            <Route path="/project/:projectId/environment/:environmentId/users" exact component={UsersPage}/>
            <Route path="/project/:projectId/environment/:environmentId/users/:id" exact component={UserPage}/>
            <Route path="/project/:projectId/environment/create" exact component={CreateEnvironmentPage}/>
            <Route path="/project/:projectId/environment/:environmentId/project-settings" exact component={ProjectSettingsPage}/>
            <Route path="/project/:projectId/environment/:environmentId/segments" exact component={SegmentsPage}/>
            <Route path="/project/:projectId/environment/:environmentId/organisation-settings" exact component={OrganisationSettingsPage}/>
            <Route path="/project/:projectId/environment/:environmentId/audit-log" exact component={AuditLogPage}/>
            <Route path="/create" exact component={CreateOrganisationPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </App>
);
