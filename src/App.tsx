import './App.css';
import * as React from 'react';
import {connect} from 'react-redux';
import {Villager} from 'src/core/model';
import {GameState} from 'src/core/reducer';

type ViewState = {
  villagers: Villager[]
}

class App extends React.Component<ViewState> {
  public render() {


    return (
      <div className="App">
        <div className="events">
          events
        </div>
        <div className="characters">
          {this.props.villagers.map((villager: Villager) => (
            <div className="character">
              <div className="characterText">a message</div>
              <div className="characterImage">&nbsp;</div>
              <div className="characterName">{villager.name}</div>
            </div>
          ) )}
        </div>
      </div>
    );
  }
}

export default connect((state: GameState): ViewState => ({
  villagers: state.villagers
}))(App);
