const bodyParser = require('body-parser');
const express = require('express');
const api = require('./api');
const spm = require('./middleware/single-page-middleware');
const webpackMiddleware = require('./middleware/webpack-middleware');

const isDev = process.env.NODE_ENV !== 'production';
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.use('/api', api());

let devMiddleware;
if (isDev) { // Serve files from src directory and use webpack-dev-server
    console.log('Enabled Webpack Hot Reloading');
    devMiddleware = webpackMiddleware(app);
} else {
    console.log('Running production mode');
}


app.use(express.static('build'));
app.set('views', 'build/');

// Rewrite request URL if necessary
app.use(spm);

// parse various different custom JSON types as JSON
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    if (!isDev) {
        res.sendFile(path.resolve('build/index.html'));
    } else {
        const compiler = devMiddleware.context.compiler;
        const filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening on: ${port}`);
});
