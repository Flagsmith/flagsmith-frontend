//Define common loaders for different file types
module.exports = [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {test: /\.json$/, loader: "json-loader"},
    {
        test: /\.html$/,
        use: 'html-loader?attrs[]=source:src&attrs[]=img:src'
    },
    {
        test: /\.(otf|ttf|eot|png|jpg|jpeg|gif|svg|woff|woff2|ogv|mp4|webm)$/,
        use: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
    }
];
