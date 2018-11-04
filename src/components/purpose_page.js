import React from "react";
import 'bootstrap';
import '../../scss/app.scss';
import Template from './template';

class PurposePage extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Template page={"Purpose"}>
                <h1 className="cover-heading">Integration testing</h1>
                <p className="lead spacer">If you're running BigQuery requests inside some of your applications, you likely
                    want to test them. However if you plan to use production environment, it will come with some cost
                    and/or potential side effects since the content is likely mutable.<br/><br/>
                    Another way is to setup a test project or test dataset containing a subset of your production data.
                    In that case, you'll have to keep those subsets relevant regarding your production data.<br/><br/>
                    Yet in both cases, the test data will be hard to be maintained.
                    That's why a pretty convenient way to work with is to inject fixtures at the beginning of your query.
                    Applying your query on fixtures provided using "Common Table Expressions", let test it for free without any mutable data.
                    <br/><br/>
                    This tool is dedicated to make it simpler to create those fixtures using JSON data.
                    A quick way to create a subset of data in BQ is to request your data and copy the JSON output
                    to put it inside the input textarea and finally copy the CTE generated snippet to be used in your query.
                </p>
            </Template>
        )
    }
}

export default PurposePage