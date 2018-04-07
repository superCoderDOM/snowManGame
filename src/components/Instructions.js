import React from 'react';
import { Helmet } from "react-helmet";

class Instructions extends React.Component {
    constructor() {
        super();
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        this.props.pageHandler('instructions');        
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Snowman | How-To</title>
                </Helmet>                
                <div className="row title">                              
                    <h1> Instructions </h1>
                    <div className="col-center">
                        <ul className="instructions">
                            <li>Select a letter of the alphabet by pressing the right key on your keyboard...</li>
                            <ul>
                                <li>If the letter is contained in the word, the position where the letter occurs in the word will appear.</li>
                                <li>If the letter is not contained in the word, the snowman will loose a part.</li>
                            </ul>
                            <li>The game continues until:</li>
                            <ul>
                                <li>the word is guessed (all letters are revealed) – <span className="snowWhite">YOU WIN!</span></li>
                                <li><span className="snowWhite">OR</span> all the parts of the snowman are gone – <span className="snowWhite">YOU LOSE!</span></li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instructions;