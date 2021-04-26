/**
 * Created by kylejohnson on 02/08/2016.
 */
require('colors');
const fs = require('fs');
const extra = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../app.yaml');
let str = extra.readFileSync(src, 'utf8');
str += `
env_variables:
  SLACK_TOKEN: ${process.env.SLACK_TOKEN}
  EVENTS_SLACK_CHANNEL: ${process.env.EVENTS_SLACK_CHANNEL}
  FLAGSMITH: ${process.env.FLAGSMITH}
  FLAGSMITH_ANALYTICS: ${process.env.FLAGSMITH_ANALYTICS}
  GA: ${process.env.GA}
  CRISP_CHAT: ${process.env.CRISP_CHAT}
  LINKEDIN: ${process.env.LINKEDIN}
  PREVENT_SIGNUP: ${process.env.PREVENT_SIGNUP}
  MIXPANEL: ${process.env.MIXPANEL}
  API_URL: ${process.env.API_URL}
  AMPLITUDE: ${process.env.AMPLITUDE}
  MAINTENANCE: ${process.env.MAINTENANCE}
  ASSET_URL: ${process.env.ASSET_URL}
  BASENAME: ${process.env.BASENAME},
  IMAGE_TAG: ${process.env.IMAGE_TAG},
  CI_COMMIT_REF_NAME: ${process.env.CI_COMMIT_REF_NAME},
  CI_COMMIT_SHA: ${process.env.CI_COMMIT_SHA},
`;

fs.writeFileSync(src, str);
