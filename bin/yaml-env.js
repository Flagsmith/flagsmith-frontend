/**
 * Created by kylejohnson on 02/08/2016.
 */
require('colors');
const fs = require('fs');
const extra = require('fs-extra');
const path = require('path');

const src = path.resolve(__dirname, '../app.yaml');
let str = extra.readFileSync(src, 'utf8');
str += `
env_variables:
  SLACK_TOKEN: ${process.env.SLACK_TOKEN}
  EVENTS_SLACK_CHANNEL: ${process.env.EVENTS_SLACK_CHANNEL}
  FLAGSMITH: ${process.env.FLAGSMITH}
  GA: ${process.env.GA}
  CRISP_CHAT: ${process.env.CRISP_CHAT}
  PREVENT_SIGNUP: ${process.env.CRISP_CHAT}
  MIXPANEL: ${process.env.MIXPANEL}
  API_URL: ${process.env.API_URL}
  AMPLITUDE: ${process.env.AMPLITUDE}
  MAINTENANCE: ${process.env.MAINTENANCE}
  ASSET_URL: ${process.env.ASSET_URL}
`;

fs.writeFileSync(src, str);
