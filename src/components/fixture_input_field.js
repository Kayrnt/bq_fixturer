import React from "react";
import 'bootstrap';
import '../../scss/app.scss';
import toBQFixtures from '../logic/fixturer_logic'

class FixtureInputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeForValue(this.state.value)
    }


    handleChangeForValue(value) {
        const bqFixtureString = toBQFixtures(value);
        if (this.state.value !== value) {
            this.setState({value: value});
        }
        this.props.handleInputChange(bqFixtureString);
    }

    handleChange(event) {
        let value = event.target.value;
        this.handleChangeForValue(value)
    }

    onClickSimple = (event) => {
        this.handleChangeForValue('{"a": "b"}');
    };

    onClickRepeated = (event) => {
        this.handleChangeForValue('[{"a": 1}, {"a": 2}, {"a": 3}]');
    };

    onClickNested = (event) => {
        this.handleChangeForValue('{"a": {"b" : {"c" : 1 } } }');
    };

    render() {
        return (
            <div>
                <h2>Transform your BQ JSON to a fixture</h2>
                <div className="example-block">
                    <button type="button" id="simple"
                            className="btn btn-link example-text"
                            onClick={this.onClickSimple}>Simple example</button>
                    <button type="button" id="repeated"
                            className="btn btn-link example-text"
                            onClick={this.onClickRepeated}>Repeated example</button>
                    <button type="button" id="nested"
                            className="btn btn-link example-text"
                            onClick={this.onClickNested}>Nested example</button>
                </div>
                <div className="form-group">
            <textarea className="form-control output-block"
                      value={this.state.value}
                      onChange={this.handleChange}/>
                </div>
            </div>
        )
    }
}

export default FixtureInputField