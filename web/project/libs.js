import Bootstrap from '../../node_modules/bootstrap/dist/js/bootstrap';
import "ionicons/dist/css/ionicons.min.css";

window.moment = require('moment/min/moment.min');

//Optimise lodash
import each from 'lodash/each';
import map from 'lodash/map';
import filter from 'lodash/filter';
import find from 'lodash/find';
import partial from 'lodash/partial';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import range from 'lodash/range';
import keyBy from 'lodash/keyBy';
window._ = {each, filter, find, partial, findIndex, range, map,cloneDeep,keyBy};

window.React = require('react');
window.ReactDOM = require('react-dom');
window.Any = React.PropTypes.any;
window.OptionalArray = React.PropTypes.array;
window.OptionalBool = React.PropTypes.bool;
window.OptionalFunc = React.PropTypes.func;
window.OptionalNumber = React.PropTypes.number;
window.OptionalObject = React.PropTypes.object;
window.OptionalString = React.PropTypes.string;
window.OptionalNode = React.PropTypes.node;
window.OptionalElement = React.PropTypes.element;
window.oneOf = React.PropTypes.oneOf;
window.oneOfType = React.PropTypes.oneOfType;
window.RequiredArray = React.PropTypes.array.isRequired;
window.RequiredBool = React.PropTypes.bool.isRequired;
window.RequiredFunc = React.PropTypes.func.isRequired;
window.RequiredNumber = React.PropTypes.number.isRequired;
window.RequiredObject = React.PropTypes.object.isRequired;
window.RequiredString = React.PropTypes.string.isRequired;
window.RequiredNode = React.PropTypes.node.isRequired;
window.RequiredElement = React.PropTypes.node.isRequired;

window.Link = require('react-router').Link;