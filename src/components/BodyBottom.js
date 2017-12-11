import React from 'react';

class BodyBottom extends React.Component{
    render(){

        let classList = "body body--bottom";
        if(this.props.nWrong > 5){
            classList += " hidden";
        }

        return(
            <div>
                <div className={ classList }>
                    <div className="body--shadow"></div>
                </div>
            </div>
        );
    }
}

export default BodyBottom;