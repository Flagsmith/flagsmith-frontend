const React = require('react')
const ReactMarkdown = require('react-markdown')
import md from './using-feature-flags-for-client-demos-and-simulating-complex-scenarios.md';
module.exports = ()=> <ReactMarkdown className={"markdown"} source={md}/>