const fs = require('fs');

const res = `
  SLACK_TOKEN="${process.env.SLACK_TOKEN || ''}"
`;

fs.writeFileSync('./.env', res);
