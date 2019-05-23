import React, {Component} from 'react';
import {Link} from 'react-router';

export default class OpenSourcePage extends Component {
    static displayName = 'OpenSourcePage'

    render() {
        return (
            <div className='container app-container text-center'>
                <h1>Oops, we can't seem to find this page!</h1>
                <hr/>
                <Link to='/'>Back To Home View</Link>
            </div>
        );
    }
}
