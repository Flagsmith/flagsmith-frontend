module.exports = ({NPM_CLIENT,URL_CLIENT}) => {
    return `// npm
npm i ${NPM_CLIENT} --save

// yarn
yarn add bullet-train-client

// Or script tag
<script src="${URL_CLIENT}"></script>
`
}
