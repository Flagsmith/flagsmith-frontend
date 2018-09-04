import './project/polyfil';
import './project/libs';
import './project/api';
import './project/project-components';
import './styles/styles.scss';
import ToastMessages from './project/toast';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

window.Project = require('../common/project');
window.Utils = require('../common/utils/utils');
window.Constants = require('../common/constants');

window.openModal = require('./project/modals').openModal;
window.openConfirm = require('./project/modals').openConfirm;

import AccountStore from '../common/stores/account-store';

const rootElement = document.getElementById('app');

// Render the React application to the DOM
AsyncStorage.getItem("t", (err, res) => {
    if (res) {
        AppActions.setToken(res)
    }

    setTimeout(() => {
        //redirect before login
        //todo: move to util to decide if url is public
        if (
            document.location.pathname.indexOf('/pricing') == -1 &&
            document.location.pathname.indexOf("password-reset") == -1 &&
            document.location.pathname.indexOf("/blog") == -1 &&
            document.location.pathname != '/' && document.location.pathname != '/login' && document.location.pathname != '/demo' && document.location.pathname != '/signup' && !AccountStore.getUser()) {
            browserHistory.push('/?redirect=' + encodeURIComponent(document.location.pathname));
        }

        ReactDOM.render(
            <Router history={browserHistory} routes={routes}/>,
            rootElement
        );
    }, 1)


});

//Setup for toast messages
ReactDOM.render(<ToastMessages/>, document.getElementById('toast'));
