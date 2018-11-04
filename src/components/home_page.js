import React from "react";
import 'bootstrap';
import '../../scss/app.scss';
import Template from './template';
import FixtureInputField from "./fixture_input_field"
import FixtureOutputField from "./fixture_output_field"

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bqFixtureString: ""
        };
    };

    handleInputChange = (bqFixtureResult) => {
        this.setState({bqFixtureString: bqFixtureResult});
    };

    render() {
        return (
            <Template page={"Home"}>
                <div className="lead">
                    <div>
                        <FixtureInputField handleInputChange={this.handleInputChange}/>
                        <FixtureOutputField bqFixtureString={this.state.bqFixtureString}/>
                    </div>
                </div>
            </Template>
        )
    }
}

export default HomePage