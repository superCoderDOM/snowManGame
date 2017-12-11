import React from 'react';

class ArmRight extends React.Component{
    render(){

        let classList = "arm__right";
        if(this.props.nWrong > 1){
            classList += " hidden";
        }

        return(
            <div className={ classList }></div>            
        );
    }
}

export default ArmRight;