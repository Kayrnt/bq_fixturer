import React from "react";
import 'bootstrap';
import '../../scss/app.scss';
import HomePage from "./home_page";
import PurposePage from "./purpose_page";
import {Switch, Route} from 'react-router-dom'

class BQJSONToFixtureApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: window.location.href.split("#")[1]
        };
    };

    handlePageChange = (pageName) => {
        this.setState({page: pageName});
    };

    render() {
        return (
            <Switch>
                <Route path='/purpose' component={PurposePage}/>
                <Route path="*" component={HomePage}/>
            </Switch>
        )
    };
}

export default BQJSONToFixtureApp