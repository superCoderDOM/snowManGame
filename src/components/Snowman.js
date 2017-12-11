import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import Audio from './Audio';
import ArmLeft from './ArmLeft';
import ArmRight from './ArmRight';
import Hat from './Hat';
import Head from './Head';
import BodyTop from './BodyTop';
import BodyBottom from './BodyBottom';
import MessageBox from './MsgBox';
import GameStartButton from './LargeButton';

const   alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        wordLists = [
            {topic: 'Starter', 
            words: ['hey', 'person', 'you', 'think', 'youre', 'better', 'than', 'me']},
            {topic: 'Canada',
            words: ['quebec', 'ontario', 'alberta', 'yukon', 'nunavut', 'saskatchewan', 'manitoba', 'newfoundland', 'labrador',
                    'sherbrooke', 'weedon', 'toronto', 'stjohns', 'gander', 'milton', 'montreal', 'victoria', 'halifax', 'duncan',
                    'charlottetwon', 'fredericton', 'vancouver', 'calgary', 'edmonton', 'ottawa', 'whitehorse', 'yellowknife',
                    'york', 'regina', 'winnipeg', 'saskatoon', 'lethbridge', 'gatineau', 'burgeo', 'banff', 'kelowna', 'penticton',
                    'nanaimo', 'golden', 'whistler', 'kamloops', 'jasper', 'niagara', 'moncton', 'truro', 'clarenville', 'kingston']},
            {topic: 'US States',
            words: ['washington', 'oregon', 'california', 'arizona', 'newmexico', 'texas', 'alabama', 'mississippi', 'florida',
                    'georgia', 'florida', 'nevada', 'virginia', 'pennsylvania', 'newyork', 'maine', 'vermont', 'newhampshire', 'tennessee',
                    'ohio', 'rhodesisland', 'idaho', 'montana', 'kansas', 'kentucky', 'colorado', 'dakota', 'carolina', 'utah',
                    'wisconsin', 'michigan', 'massachusetts', 'nebraska', 'minnesota', 'hawaii', 'illinois', 'misouri', 'louisiana',
                    'arkansas', 'oklahoma', 'iowa', 'wyoming', 'maryland', 'newjersey', 'delaware', 'connecticut', 'alaska', 'indiana']},
            {topic: 'Harry Potter',
            words: ['harry', 'potter', 'hermoine', 'granger', 'ronald', 'weasley', 'draco', 'malfoy', 'lucius', 'severus', 'sirius',
                    'snapes', 'neville', 'longbottom', 'dumbledore', 'nimbus', 'firebolt', 'quidditch', 'griffindor', 'slytherin',
                    'animagus', 'werewolf', 'pixie', 'azkaban', 'basilisk', 'beater', 'snitch', 'butterbeer', 'boggart', 'bludger',
                    'parselmouth', 'wizard', 'witch', 'broomstick', 'hogwarts', 'magic', 'muggle', 'hufflepuff', 'ravenclaw', 'chaser',
                    'hogsmeade', 'howler', 'mandrake', 'dementor', 'dragon', 'goblin', 'elf', 'keeper', 'seeker', 'phoenix', 'owl',
                    'polyjuice', 'potion', 'quaffle', 'remembrall', 'voldemort', 'transfiguration', 'unicorn', 'wand', 'centaur', 'charm']},
            {topic: 'Winter',
            words: ['snow', 'snowman', 'snowball', 'sleigh', 'sleighride', 'blizzard', 'jinglebells', 'white', 'cold', 'dark', 'silver', 
                    'holidays', 'iceskate', 'hockey', 'skate', 'skating', 'ski', 'skiing', 'sled', 'sledding', 'tuque', 'scarf', 'snowfort',
                    'snowflake', 'ice', 'freeze', 'freezing', 'festive', 'chilly', 'peppermint', 'icicle', 'snowdrift', 'ringuette', 'shinny',
                    'snowangel', 'snowstorm', 'yule', 'yuletide', 'carols', 'christmas', 'hanukkah', 'kwanzaa', 'newyears', 'snowshoes', 'igloo']},
        ];
let endMessageJSX, pastGuessesJSX;

class Snowman extends Component {
    constructor(){
        super();

        this.state = {
            currentTopic: '',
            currentWord: '',
            duplicateGuess: false,
            gameNum: 0,
            gameOver: true,
            gameStreak: 0,
            gameWon: false,
            nWrong: 0,
            pastGames: [],            
            pastGuesses: [],
            userGuess: '',
        }

        // bindings
        this.checkGameOver = this.checkGameOver.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.endGame = this.endGame.bind(this);
        this.evaluateGuess = this.evaluateGuess.bind(this);
        this.printGameState = this.printGameState.bind(this);
        this.setUpGame = this.setUpGame.bind(this);
    }

    // checks if the game is over
    checkGameOver(){

        const currentWord = this.state.currentWord.split("");
        let pastGuesses = this.state.pastGuesses,
            nWrong = this.state.nWrong,
            nRight = 0;

        // for each letter in the target word
        for(let i = 0; i < currentWord.length; i++) {
            // check if it present in the current list of guesses 
            if(pastGuesses.indexOf(currentWord[i]) >= 0) {
                // and count the letters that have been found
                nRight++;
            }
        }
        // game ends if the number of found letters is the same as the number of letters in the word
        if (nRight === currentWord.length) {
            this.setState({
                gameWon: true,
                gameStreak: this.state.gameStreak + 1,
            });
            this.endGame();
        }
        // game ends if the word is not yet complete BUT the number of wrong guesses has reached 6
        else if (nWrong === 6) {
            this.setState({
                gameStreak: 0,
            })
            this.endGame();
        }
    }

    componentWillMount(){
        // update page state in App component
        this.props.pageHandler('snowman');
        // retrieve previous game state from local storage if present
        const savedState = JSON.parse(localStorage.getItem("savedState"));
        if(savedState){
            // return state to saved values if values are present
            this.setState(savedState);
          // if this is not the first game, add 'keypress' event listener
            if (!savedState.gameOver && savedState.gameNum > 0){
                document.addEventListener("keypress", this.evaluateGuess);
            }
            else if(savedState.gameOver){
                document.addEventListener("keypress", this.setUpGame);                
            }
        }
    }

    componentWillUnmount(){
        // remove 'keypress' event listener
        document.removeEventListener("keypress", this.evaluateGuess);

        // save current and past game state to local memory
        const currentState = this.state;
        localStorage.setItem("savedState", JSON.stringify(currentState));
    }
       
    // after game ends, save game results
    endGame(gameResults){

        const newGameStatistics = {
            gameID: this.state.gameID,
            gamesPlayed: this.state.gameNum,
            userWon: this.state.gameWon,
            gameStreak: this.state.gameStreak,
            gameWord: this.state.currentWord.charAt(0).toUpperCase() + this.state.currentWord.slice(1),
            numberOfGuesses: this.state.pastGuesses.length,
            guessHistory: this.state.pastGuesses
        }
        let pastGames = this.state.pastGames;
        
        // remove game 'keypress' event listener
        document.removeEventListener("keypress", this.evaluateGuess);

        // add message box 'keypress' event listener
        document.addEventListener("keypress", this.setUpGame);
        
        // store game statistcs
        pastGames.push(newGameStatistics);
        
        // update game statistics in App component
        this.props.pastGamesHandler(pastGames);

        // update new game statistics in state
        this.setState({
            gameOver: true,
            pastGames: pastGames,
        });

        // save gaming history to local memory
        const currentState = this.state;
        localStorage.setItem("savedState", JSON.stringify(currentState));
    }

    // assess validity of guess and whether guess is present in word 
    evaluateGuess(event) {
        const pastGuesses = this.state.pastGuesses;
        const guess = event.key.toLowerCase();
        const currentWord = this.state.currentWord.split("");
        let nWrong = this.state.nWrong;

		// assess if guess is a letter
		if (guess && alphabet.indexOf(guess) >= 0) {
			// assess if the letter has been tried already
			if (pastGuesses.indexOf(guess) < 0) {
                // add new guess to list of previous guesses made
                pastGuesses.push(guess);
                // look if guess is present in word, increments wrong guesses if it is not
                if (currentWord.indexOf(guess) < 0) {
                    nWrong++;
                }        
                pastGuessesJSX = <h2 className="snowWhite">{ pastGuesses.join(", ") }</h2>;
				this.setState({
                    duplicateGuess: false,
                    nWrong: nWrong,
                    pastGuesses: pastGuesses,
                    userGuess: guess,
                });
                this.checkGameOver();
            // highlight duplicate guess
            }else{
                let pastGuessListJSX = [];
                for(let i = 0; i < pastGuesses.length; i++){
                    if(pastGuesses[i] === guess){
                        pastGuessListJSX.push(<span key={ pastGuessListJSX.length } className="highlight">{ pastGuesses[i] }</span>);
                    }else{
                        pastGuessListJSX.push(<span key={ pastGuessListJSX.length } className="snowWhite">{ pastGuesses[i] }</span>);
                    }
                    if(i < pastGuesses.length - 1){
                        pastGuessListJSX.push(<span key={pastGuessListJSX.length} className="snowWhite">, </span>);
                    }
                }
                pastGuessesJSX = <h2>{ pastGuessListJSX }</h2>;
                // trigger state update
                this.setState({
                    duplicateGuess: true,
                });
            }
        }
    }

    // print the previous guesses
    printGameState(){
        const currentWord = this.state.currentWord.split("");
        const pastGuesses = this.state.pastGuesses;
        let hintString = "";
        // for each letter in the target word
        for(let i = 0; i < currentWord.length; i++){
            let found = false;
            // loop through the pastGuesses
            for(let j = 0; j < pastGuesses.length; j++){
                // and check each element of past guesses to see if it matches the letter
                if(currentWord[i] === pastGuesses[j]){
                    found = true;
                }
            }
            // display first letter of word as upper case
            if(found && i === 0){
                hintString += currentWord[i].toUpperCase();
                hintString += " ";                
            }
            else if(found){
                hintString += currentWord[i];
                hintString += " ";
            }
            else{
                hintString += "_ ";
            }
        }
        return hintString;
    }

    // creates a random string of characters to use as unique game ID
    // based on a code snippet from from http://jsfiddle.net/wSQBx/2/
    randomString(length, type){
        let characterSet = '';
    
        // Includes the requested sets of characters
        if (type.indexOf('a') > -1) characterSet += 'abcdefghijklmnopqrstuvwxyz';
        if (type.indexOf('A') > -1) characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (type.indexOf('#') > -1) characterSet += '0123456789';
        if (type.indexOf('!') > -1) characterSet += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    
        // creates a random key
        let result = '';
        for (let i = length; i > 0; i--){
            result += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
        return result;
    }
        
    // modified - (re)sets parameters before starting a new game
    setUpGame(){
        // choose a new topic/word pair
        const topicIndex = Math.floor(Math.random() * wordLists.length);
        const wordIndex = Math.floor(Math.random() * wordLists[topicIndex].words.length)

        // reset responsive past guesses list
        pastGuessesJSX = [];

        // reset state
        this.setState({
            currentTopic: wordLists[topicIndex].topic,
            currentWord: wordLists[topicIndex].words[wordIndex],
            duplicateGuess: false,
            gameID: this.randomString(16, '#aA'),
            gameNum: this.state.gameNum + 1,
            gameOver: false,            
            gameWon: false,
            nWrong: 0,
            pastGuesses: [],
            userGuess: '',
        });

        // remove message box 'keypress' event listener
        document.removeEventListener("keypress", this.setUpGame);
        
        // add game 'keypress' event listener to capture new guesses
        document.addEventListener("keypress", this.evaluateGuess);
    }

    render(){

        // show letters found, underscore otherwise
        const hintString = this.printGameState();

        // disable 'start new game' button during play
        let btnHide = '';
        if(!this.state.gameOver){
            btnHide = 'disabled-btn';
        }

        // toggle display of game ending message
        let showBox = false;
        if(this.state.gameOver && this.state.pastGames.length > 0){
            const messageJSX = {
                youWon: <div><h2>You WIN!</h2> Well done! </div>,
                youLost: <div><h2> GAME OVER! </h2> The word was: <span className="snowWhite">{ this.state.currentWord.charAt(0).toUpperCase() + this.state.currentWord.slice(1) }</span><br/> Better luck next time! </div>,
            };
            if(this.state.gameWon){
                endMessageJSX = messageJSX.youWon;
            }else{
                endMessageJSX = messageJSX.youLost;
            }
            showBox = true;
        }

        return(
            <div className="container">
                <Helmet>
                    <title>Snowman | Play</title>
                </Helmet>
                <div className="snow">
                    <div className="row title">               
                        <h1> Play Snowman </h1>
                    </div>
                    <div className="row">
                        <div className="snowmanContainer">
                            <ArmLeft nWrong={ this.state.nWrong } />
                            <ArmRight nWrong={ this.state.nWrong } />
                            <Hat nWrong={ this.state.nWrong } />
                            <Head nWrong={ this.state.nWrong } />
                            <BodyTop nWrong={ this.state.nWrong } />
                            <BodyBottom nWrong={ this.state.nWrong } />
                        </div>
                        <div className="gameContainer">
                            <h2> Topic: <span className="snowWhite">{ this.state.currentTopic }</span> </h2>
                            <h2> { hintString } </h2>
                            <h2> Current guess: <span className="snowWhite">{ this.state.userGuess }</span> </h2>
                            <h2> Previous guesses: </h2>
                            { pastGuessesJSX }
                        </div>
                    </div>
                    <Audio />
                    <div className="row">
                        <GameStartButton clickHandler={ this.setUpGame } value={ "Start New Game" } className={ btnHide }/>
                    </div>
                    <MessageBox className={ "pointer" } messageJSX={ endMessageJSX } showBox={ showBox } boxHandler={ this.setUpGame }>
                        <div><br/> Press a key to start a new game </div>
                    </MessageBox>
                </div>
            </div>
        );
    }
}

export default Snowman;