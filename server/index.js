require('dotenv').config();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const api = require('./api');
const spm = require('./middleware/single-page-middleware');
const webpackMiddleware = require('./middleware/webpack-middleware');
const env = require('../common/project').env;

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const slackMessage = SLACK_TOKEN && require('./slack-client');

const E2E_SLACK_CHANNEL_NAME = process.env.E2E_SLACK_CHANNEL_NAME;

const isDev = process.env.NODE_ENV !== 'production';
const app = express();
const port = process.env.PORT || 8080;

if (isDev) { // Serve files from src directory and use webpack-dev-server
    console.log('Enabled Webpack Hot Reloading');
    webpackMiddleware(app);
    app.set('views', 'web/');
    app.use(express.static('web'));
} else { // Serve files from build directory
    console.log('Running production mode');
    app.use(express.static('build'));
    app.set('views', 'build/');
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse various different custom JSON types as JSON
app.use(bodyParser.json());

app.use('/api', api());
app.use(spm);
app.get('/', (req, res) => {
    console.log('Returning index');
    if (isDev) {
        return res.render('index', {
            isDev,
        });
    }
    return res.render('static/index', {
        isDev,
    });
});

app.get('/api/yaml', (req, res) => {
    res.json({ res: process.env.EVENTS_SLACK_CHANNEL });
});

app.post('/api/webhook', (req, res) => {
    try {
        const body = req.body;
        let message = '';
        res.json(body);
        if (body.data) {
            const state = body.data.new_state;
            if (state.identity_identifier) {
                message = `\`${env} webhook:\` ${body.data.changed_by} changed \`${state.feature.name}\` to \`${state.feature.type === 'FLAG' ? state.enabled : state.feature_state_value || state.feature.initial_value}\` for user \`${state.identity_identifier}(${state.identity})\``;
            } else {
                message = `\`${env} webhook:\` ${body.data.changed_by} changed \`${state.feature.name}\` to \`${state.feature.type === 'FLAG' ? state.enabled : state.feature_state_value || state.feature.initial_value}\``;
            }
            if (slackMessage) {
                slackMessage(message, E2E_SLACK_CHANNEL_NAME);
            }
        }
    } catch (e) {
        console.log(e);
        res.json({ error: e.message || e });
    }
});

// app.post('/api/events', (req, res) => {
//     try {
//         const body = req.body;
//         let message = '';
//         res.json(body);
//         if (process.env) {
//             const state = body.data.new_state;
//             if (state.identity_identifier) {
//                 message = `\`${env} webhook:\` ${body.data.changed_by} changed \`${state.feature.name}\` to \`${state.feature.type === 'FLAG' ? state.enabled : state.feature_state_value || state.feature.initial_value}\` for user \`${state.identity_identifier}(${state.identity})\``;
//             } else {
//                 message = `\`${env} webhook:\` ${body.data.changed_by} changed \`${state.feature.name}\` to \`${state.feature.type === 'FLAG' ? state.enabled : state.feature_state_value || state.feature.initial_value}\``;
//             }
//             if (slackMessage) {
//                 slackMessage(message, E2E_SLACK_CHANNEL_NAME);
//             }
//         }
//     } catch (e) {
//         console.log(e);
//         res.json({ error: e.message || e });
//     }
// });

app.listen(port, () => {
    console.log(`Server listening on: ${port}`);
});
