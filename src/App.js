import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Audio from './components/Audio';
import Instructions from './components/Instructions';
import Highscore from './components/Highscore';
import Snowman from './components/Snowman';

import './App.css';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      page: 'snowman',
      pastGames: [],
    };

    // bindings
    this.setPage = this.setPage.bind(this);
    this.setPastGames = this.setPastGames.bind(this);
  }

  setPage(currentPage){
    this.setState({
      page: currentPage,
    });
  }

  setPastGames(pastGames){
    this.setState({
      pastGames: pastGames,
    });
  }

  render() {

    let snowmanDisabled = '',
        instructionsDisabled = '',
        gamescoresDisabled = '';

    if(this.state.page === 'snowman') snowmanDisabled = 'disabled-link';
    else if(this.state.page === 'instructions') instructionsDisabled = 'disabled-link';
    else if(this.state.page === 'gamescores') gamescoresDisabled = 'disabled-link';

    return (
      <Router>
          <div className="App">
            <nav className="navBar">
                <h1><Link to="/" className={ snowmanDisabled }>SNOWMAN</Link></h1>
                <h1><Link to="/instructions" className={ instructionsDisabled }>Instructions</Link></h1>
                <h1><Link to="/gamescores" className={ gamescoresDisabled }>Gamescores</Link></h1>
            </nav>
          {/* <Audio /> */}
            <Switch>
                <Route exact path="/" render={routeProps=>< Snowman pageHandler={ this.setPage } pastGamesHandler={ this.setPastGames }/>}/>
                <Route path="/instructions" render={ routeProps=><Instructions pageHandler={ this.setPage }/>}/>
                <Route path="/gamescores" render={ routeProps=><Highscore pageHandler={ this.setPage } pastGames={ this.state.pastGames }/>}/>
            </Switch>
          </div>
      </Router>
    );
  }
}

export default App;
