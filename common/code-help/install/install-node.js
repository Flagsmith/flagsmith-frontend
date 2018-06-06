module.exports = ({NPM_CLIENT,URL_CLIENT}) => {
    return `#VIA npm
npm i ${NPM_CLIENT} --save
	
#Or script tag
<script src="${URL_CLIENT}"></script>
`
}
