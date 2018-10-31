module.exports = ({NPM_RN_CLIENT}) => {
    return `// npm
npm i ${NPM_RN_CLIENT} --save

// yarn
yarn add bullet-train-client
`
}
