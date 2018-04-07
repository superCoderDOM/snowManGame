import React from 'react';

class Head extends React.Component {
    render() {

        let classList = "head";
        if (this.props.nWrong > 3) {
            classList += " hidden";
        }

        return (
            <div className={ classList }>
                <div className="head__eye head__eye--left"></div>
                <div className="head__eye head__eye--right"></div>    
                <div className="head__nose"></div>
            </div>
        );
    }
}

export default Head;