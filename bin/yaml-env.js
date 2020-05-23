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
  BULLET_TRAIN: ${process.env.BULLET_TRAIN}
  GA: ${process.env.GA}
  CRISP_CHAT: ${process.env.CRISP_CHAT}
  MIXPANEL: ${process.env.MIXPANEL}
  API_URL: ${process.env.API_URL}
`;

fs.writeFileSync(src, str);
