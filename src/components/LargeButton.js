import React from 'react';

class LargeButton extends React.Component {
    render() {
        return (
            <div className={"btn-large " + this.props.className } value={ this.props.value } onClick={ this.props.clickHandler }>{ this.props.value }</div>
        );
    }
}

export default LargeButton;