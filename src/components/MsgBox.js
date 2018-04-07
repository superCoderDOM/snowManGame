import React from 'react';

class MsgBox extends React.Component {
    render() {

        let classList = "center msg-box";
        if (this.props.showBox) {
            classList += " msg-box__animate";
        } else {
            classList += " hidden";
        }
        if (this.props.className) {
            classList += " " + this.props.className;
        }

        return (
            <div className={ classList } onClick={ this.props.boxHandler } onKeyPress={ this.props.boxHandler }>
                { this.props.messageJSX }
                { this.props.children }
            </div>
        );
    }
}

export default MsgBox;