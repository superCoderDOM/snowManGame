import React from 'react';

class GameResults extends React.Component{
    render(){

        let pastGamesJSX = this.props.pastGames.map((game, index)=>{
            let gameResult = 'Player Lost';
            if(game.userWon){
                gameResult = 'Player Won';
            }
            return(
                <tr key={ index }>
                    <td> Game { game.gamesPlayed } </td>
                    <td> { game.gameWord } </td> 
                    <td> { game.numberOfGuesses } </td>
                    <td> { game.guessHistory.join(", ") } </td>
                    <td> { gameResult } </td>
                </tr>
            );
        });

        return (
            <div className="row center">
                <h2>Individual Game Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Game Number</th>
                            <th>Word Played</th>
                            <th>Guesses Made</th>
                            <th>Guess List</th>
                            <th>Game Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        { pastGamesJSX }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameResults;