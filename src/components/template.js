import React from 'react';
import 'bootstrap';
import '../../scss/app.scss';
import { Link } from "react-router-dom";

class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "active": props.page
        };
        this.navLinkClass = this.navLinkClass.bind(this);
    };

    navLinkClass(name) {
        if (name === this.state["active"]) return "nav-link active";
        else return "nav-link";
    }

    render() {
        return (
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="masthead mb-auto">
                    <div className="inner">
                        <h3 className="masthead-brand">BQ Fixturer</h3>
                        <nav className="nav nav-masthead justify-content-center">
                            <Link className={this.navLinkClass("Home")} to="/">Home</Link>
                            <Link className={this.navLinkClass("Purpose")} to="/purpose">Purpose</Link>
                        </nav>
                    </div>
                </header>

                <main role="main" className="inner cover">
                    {this.props.children}
                </main>

                <footer className="mastfoot mt-auto">
                    <div className="inner">
                        <p><a href="https://github.com/Kayrnt/bq_fixturer">Code</a> by <a href="https://twitter.com/Kayrnt">@Kayrnt</a>.</p>
                    </div>
                </footer>
            </div>
        )
    };
}

export default Template