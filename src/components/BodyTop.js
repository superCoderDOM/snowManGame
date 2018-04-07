import React from 'react';

class BodyTop extends React.Component {
    render() {

        let classList = "body body--top";
        if (this.props.nWrong > 4) {
            classList += " hidden";
        }

        return (
            <div className={ classList }>
                <div className="body__scarf"></div>
                <div className="body__button body__button--top"></div>
                <div className="body__button body__button--middle"></div>
                <div className="body__button body__button--bottom"></div>
            </div>
        );
    }
}

export default BodyTop;