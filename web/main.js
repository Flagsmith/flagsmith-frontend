import './project/polyfil';
import './project/libs';
import './project/api';
import './project/project-components';
import './styles/styles.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ToastMessages from './project/toast';
import routes from './routes';

import AccountStore from '../common/stores/account-store';

window.Project = require('../common/project');
window.Utils = require('../common/utils/utils');
window.Constants = require('../common/constants');

window.openModal = require('./project/modals').openModal;
window.openConfirm = require('./project/modals').openConfirm;

const rootElement = document.getElementById('app');

const params = Utils.fromParam();

if (params.token) {
    if (Project.cookieDomain) {
        require('js-cookie').set('t', params.token, { path: '', domain: Project.cookieDomain });
    } else {
        require('js-cookie').set('t', params.token);
    }
    document.location = document.location.origin;
}

function hashLinkScroll() {
    const { hash } = window.location;
    if (hash !== '') {
        // Push onto callback queue so it runs after the DOM is updated,
        // this is required when navigating from a different page so that
        // the element is rendered on the page before trying to getElementById.
        setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }
}

// Render the React application to the DOM
const res = require('js-cookie').get('t');

if (res) {
    AppActions.setToken(res);
}

setTimeout(() => {
    const browserHistory = createBrowserHistory();

    // redirect before login
    // todo: move to util to decide if url is public
    if (
        (document.location.pathname.indexOf('/project/') !== -1
                || document.location.pathname.indexOf('/create') !== -1
                || document.location.pathname.indexOf('/invite') !== -1
                || document.location.pathname.indexOf('/projects') !== -1)
            && !AccountStore.getUser()) {
        browserHistory.push(`/?redirect=${encodeURIComponent(document.location.pathname)}`);
    }

    ReactDOM.render(
        <Router>{routes}</Router>,
        rootElement,
    );
}, 1);

// Setup for toast messages
ReactDOM.render(<ToastMessages />, document.getElementById('toast'));

if (E2E) {
    document.body.classList.add('disable-transitions');
}

if (!E2E && Project.freshChat) {
    function initFreshChat() {
        window.fcWidget.init(Project.freshChat);
    }
    function initialize(i, t) { let e; i.getElementById(t) ? initFreshChat() : ((e = i.createElement('script')).id = t, e.async = !0, e.src = 'https://wchat.freshchat.com/js/widget.js', e.onload = initFreshChat, i.head.appendChild(e)); } function initiateCall() { initialize(document, 'freshchat-js-sdk'); }window.addEventListener ? window.addEventListener('load', initiateCall, !1) : window.attachEvent('load', initiateCall, !1);
}
