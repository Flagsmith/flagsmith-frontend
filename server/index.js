const bodyParser = require('body-parser');
const api = require('./api');
const express = require('express');
const spm = require('./middleware/single-page-middleware');
const webpackMiddleware = require('./middleware/webpack-middleware');
const isDev = process.env.NODE_ENV !== 'production';
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');


var devMiddleware;
if (isDev) { // Serve files from web directory and use webpack-dev-server
    console.log('Enabled Webpack Hot Reloading');
    devMiddleware = webpackMiddleware(app);
} else {
    console.log('Running production mode');
}

// Intercept all API requests
app.use('/api', api());


// Serve up the build folder as a static view (server running in production mode)
app.use(express.static('build'));
app.set('views', 'build/');

// Rewrite request URL if necessary
// app.use(spm);

// Parse various different custom JSON types as JSON
app.use(bodyParser.json());

// Fallback for non-root routes i.e. /page
app.get('/', function (req, res, next) {
    if (!isDev) {
        res.sendFile(path.resolve('build/index.html'));
    } else {
        const compiler = devMiddleware.context.compiler;
        const filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type','text/html');
            res.send(result);
            res.end();
        })
    }
});

app.listen(port, function () {
    console.log('Server listening on: ' + port);
});
