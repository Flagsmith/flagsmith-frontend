import './project/polyfil';
import './project/libs';
import './project/api';
import './project/project-components';
import './styles/styles.scss';
import { Router, browserHistory } from 'react-router';
import ToastMessages from './project/toast';
import routes from './routes';

import AccountStore from '../common/stores/account-store';

window.Project = require('../common/project');
window.Utils = require('../common/utils/utils');
window.Constants = require('../common/constants');

window.openModal = require('./project/modals').openModal;
window.openConfirm = require('./project/modals').openConfirm;

const rootElement = document.getElementById('app');

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
AsyncStorage.getItem('t', (err, res) => {
    if (res) {
        AppActions.setToken(res);
    }

    setTimeout(() => {
        // redirect before login
        // todo: move to util to decide if url is public
        if (
            document.location.pathname.indexOf('/pricing') == -1
            && document.location.pathname.indexOf('/legal') == -1
            && document.location.pathname.indexOf('password-reset') == -1
            && document.location.pathname.indexOf('/blog') == -1
            && document.location.pathname.indexOf('/markup') == -1
            && document.location.pathname != '/' && document.location.pathname != '/login' && document.location.pathname != '/demo' && document.location.pathname != '/signup' && !AccountStore.getUser()) {
            browserHistory.push(`/?redirect=${encodeURIComponent(document.location.pathname)}`);
        }

        ReactDOM.render(
            <Router history={browserHistory} routes={routes} onUpdate={hashLinkScroll} />,
            rootElement,
        );
    }, 1);
});

// Setup for toast messages
ReactDOM.render(<ToastMessages />, document.getElementById('toast'));
