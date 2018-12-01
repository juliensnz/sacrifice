import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    const characters = [];
    for(let i = 0; i < 6*5; i++) {
      characters.push({
        name: 'Michel',
      });
    }

    return (
      <div className="App">
        <div className="events">
          events
        </div>
        <div className="characters">
          {characters.map((character) => (
            <div className="character">
              <div className="characterImageContainer">
              {/*<div className="characterText">a message</div>*/}
                <div className="characterImage" style={{'backgroundImage': 'url(berger-allemand.jpg)'}}>&nbsp;</div>
                <div className="characterShield">&nbsp;</div>
              </div>
              <div className="characterName">{character.name}</div>
            </div>
          ) )}
        </div>
      </div>
    );
  }
}

export default App;
