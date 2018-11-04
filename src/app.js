import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import '../scss/app.scss';
import { BrowserRouter } from 'react-router-dom';
import BQJSONToFixtureApp from './components/bq_json_to_fixture_app'

ReactDOM.render((
    <BrowserRouter>
        <BQJSONToFixtureApp/>
    </BrowserRouter>
), document.querySelector("#app"));

module.hot.accept();