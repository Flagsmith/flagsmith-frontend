var SLACK_TOKEN = process.env.SLACK_TOKEN;

var Bot = require('slackbots');
var settings = {
    token: SLACK_TOKEN,
    name: "nightwatch-bot"
};
var params = {
    icon_emoji: ':owl:',
    link_names: true
};

bot = new Bot(settings);
var toChannel = function (message, channel) {
    console.log("Posting to channel", channel, "Message is ", message);
    if (channel){
        bot.postMessageToChannel(channel, message, params);
    }
};

module.exports = toChannel;
