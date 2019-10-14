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
});

// Setup for toast messages
ReactDOM.render(<ToastMessages />, document.getElementById('toast'));

if (E2E) {
    document.body.classList.add('disable-transitions');
}

if (!E2E) {
    window.intercomSettings = {
        app_id: 'zh7jljcl',
    };
    (function () { const w = window; const ic = w.Intercom; if (typeof ic === 'function') { ic('reattach_activator'); ic('update', w.intercomSettings); } else { const d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; const l = function () { const s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/zh7jljcl'; const x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } }());
}
