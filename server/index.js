require('dotenv').config();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const api = require('./api');
const spm = require('./middleware/single-page-middleware');
const webpackMiddleware = require('./middleware/webpack-middleware');

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const slackMessage = SLACK_TOKEN && require('../tests/slack-message.test');

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

app.post('/api/webhook', (req, res) => {
    let body = {};
    try {
        body = JSON.stringify(req.body);
        res.json(req.body);
        if (slackMessage) {
            slackMessage(body, E2E_SLACK_CHANNEL_NAME);
        }
    } catch (e) {
        res.json({ error: e.message || e });
    }
});

app.listen(port, () => {
    console.log(`Server listening on: ${port}`);
});
