import React from 'react';

class ArmLeft extends React.Component {
    render() {

        let classList = "arm__left";
        if (this.props.nWrong > 0) {
            classList += " hidden";
        }

        return (
            <div className={ classList }></div>            
        );
    }
}

export default ArmLeft;