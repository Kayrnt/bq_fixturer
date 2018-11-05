import React from "react";
import 'bootstrap';
import '../../scss/app.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FixtureOutputField extends React.Component {
    constructor(props) {
        super(props)
    }

    fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    };

    copyTextToClipboard = (text) => {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    };

    copyTextOnclick = (e) => {
        e.preventDefault();
        const txt = this.output.value;
        this.copyTextToClipboard(txt);
        toast.info("Copied to clipboard!", {
            position: toast.POSITION.BOTTOM_CENTER,
            toastId: "copy"
        });
    };

    render() {
        return (
            <div>
                <div>
                    <h2 className={"spacer"}>Result</h2>
                </div>
                <textarea
                    id="output"
                    className="form-control output-block"
                    disabled
                    ref={(textArea) => this.output = textArea}
                    value={this.props.bqFixtureString}/>
                <button type="button"
                        className="btn btn-light"
                        onClick={this.copyTextOnclick}>
                    Copy to clipboard
                </button>
                <ToastContainer autoClose={3000} />
            </div>
        )
    }
}

export default FixtureOutputField