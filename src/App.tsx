import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    const characters = [];
    for(let i = 0; i < 6*5; i++) {
      characters.push({});
    }

    return (
      <div className="App">
        <div className="events">
          events
        </div>
        <div className="characters">
          {characters.map((character) => (<div className="character">CH</div>) )}
        </div>
      </div>
    );
  }
}

export default App;
