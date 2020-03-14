/**
 * Created by kylejohnson on 02/08/2016.
 */
require('colors');
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../env.yaml');

const str = `
SLACK_TOKEN: ${process.env.SLACK_TOKEN}
EVENTS_SLACK_CHANNEL: ${process.env.EVENTS_SLACK_CHANNEL}
`;

fs.writeFileSync(src, str);
