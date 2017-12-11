import React from 'react';

class Hat extends React.Component{
    render(){

        let classList = "hat";
        if(this.props.nWrong > 2){
            classList += " hidden";
        }

        return(
            <div className={ classList }>
                <div className="hat__brim"></div>
            </div>
        );
    }
}

export default Hat;