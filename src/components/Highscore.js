import React from 'react';
import { Helmet } from "react-helmet";

import GameResults from './GameResults';
import MessageBox from './MsgBox';
import ResetButton from './LargeButton';

class Highscore extends React.Component{
    constructor(){
        super();

        this.state = {
            currentStreak: 0,
            gamesWon: 0,
            maxStreak: 0,
            pastGames: [],
            showBox: false,
        };

        // bindings
        this.closeMessageBox = this.closeMessageBox.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.resetGameHistory = this.resetGameHistory.bind(this);
        this.showMessageBox = this.showMessageBox.bind(this);
    }

    closeMessageBox(){
        this.setState({
            showBox: false,
        });        
    }

    componentWillMount(){
        // update page state in App component
        this.props.pageHandler('gamescores');

        // retrieve previous game statistics from local storage if present
        // const pastGames = this.props.pastGames;

        // retrieve previous game state from local storage if present
        if(localStorage.getItem('savedState')){
            const pastGames = JSON.parse(localStorage.getItem('savedState')).pastGames;

            // if something stored in local memory
            if(pastGames && pastGames.length > 0){
                // finds longest winning streak
                let maxStreak = pastGames[0].gameStreak;
                for (let i = 1; i < pastGames.length; i++){
                    if (pastGames[i].gameStreak > maxStreak){
                        maxStreak = pastGames[i].gameStreak;
                    }
                }
                let currentGameStreak = pastGames[pastGames.length - 1].gameStreak;
    
                // find how many games won
                let gamesWon = 0;
                for(let i = 0; i < pastGames.length; i++){
                    if(pastGames[i].userWon){
                        gamesWon++;
                    }
                }
    
                // return state to saved values if values are present
                this.setState({
                    currentStreak: currentGameStreak,
                    gamesWon: gamesWon,
                    maxStreak: maxStreak,
                    pastGames: pastGames,
                });
            }
        }
    }

    resetGameHistory(event){
        // Keep current game setting but remove past game history
        // import current game data from local storage
        let localState = JSON.parse(localStorage.getItem('savedState'));
        // remove past game history and reset game counter
        if(localState.gameOver){
            localState.gameNum = 0;
        }else{
            localState.gameNum = 1;
        }
        localState.pastGames = [];
        // save modified game data to local storage
        localStorage.setItem('savedState', JSON.stringify(localState));

        // reset local past Game
        this.setState({
            currentStreak: 0,
            gamesWon: 0,
            maxStreak: 0,
            pastGames: [],
            showBox: false,
        });
    }

    showMessageBox(){
        this.setState({
            showBox: true,
        });
    }

    render(){

        // disable reset button when game history is empty
        let btnHide = 'disabled-btn';
        if(this.state.pastGames.length > 0){
            btnHide = '';
        }

        // message to display when user tries to delete game history
        // message includes event function to activate on button clicks
        const messageJSX = (
            <div>
                <h3> You are about to <span className="snowWhite">DELETE</span><br/> your game history. </h3>
                <p> Are you sure you want to proceed? </p>
                <h3><span className="btn-box" onClick={ this.resetGameHistory }>YES</span><span className="btn-box" onClick={ this.closeMessageBox }>NO</span></h3>
            </div>
        );

        return(
            <div>
                <Helmet>
                    <title>Snowman | Scores</title>
                </Helmet>
                <div className="row title">                              
                    <h1> Highscore </h1>
                    <div className="col-center center">
                        <h2> Game Statistics </h2>
                        <h3> Games Won: <span className="snowWhite">{ this.state.gamesWon }</span></h3>
                        <h3> Games Played: <span className="snowWhite">{ this.state.pastGames.length }</span> </h3>
                        <h3> Longest Winning Streak: <span className="snowWhite">{ this.state.maxStreak }</span> </h3>
                        <h3> Current Winning Streak: <span className="snowWhite">{ this.state.currentStreak }</span> </h3>
                    </div>
                    <GameResults pastGames={ this.state.pastGames }/>
                </div>
                <ResetButton clickHandler={ this.showMessageBox } value={ "Reset Game History" } className={ btnHide }/>
                <MessageBox messageJSX={ messageJSX } showBox={ this.state.showBox } />
            </div>
        );
    }
}

export default Highscore;