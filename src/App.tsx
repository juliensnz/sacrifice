import './App.css';
import * as React from 'react';
import {connect} from 'react-redux';
import {Villager} from 'src/core/model';
import {GameState} from 'src/core/reducer';
import {toggleSacrificed, selectionStart, factConfirmation} from 'src/core/action';
import parameters from 'src/core/parameters';

type ViewState = {
  villagers: Villager[]
  time: number
  cycleCount: number
  sacrificeAnnouncement: string | null
  factAnnouncement: string[]
  selectionStarted: boolean
}

type ViewDispatch = {
  toggleSacrificed: (id: string) => void
  announcementValidation: () => void
  factConfirmation: () => void
}

const getFaith = (villagers: Villager[]) => {
  return villagers.reduce((faith: number, villager: Villager) => {
    return faith += villager.faith;
  }, 0) / villagers.length;
}

const getTrust = (villagers: Villager[]) => {
  return villagers.reduce((trust: number, villager: Villager) => {
    return trust += villager.trust;
  }, 0) / villagers.length;
}

class App extends React.Component<ViewState & ViewDispatch> {
  public render() {
    return (
      <React.Fragment>
        <div className={`App ${this.props.selectionStarted ? 'selectionPhase' : ''} ${this.props.time < 4 ? 'newDay' : ''}`}>
          <div className="events">
            cycle count: {this.props.cycleCount}<br/>
            time: {parameters.cycleLength - this.props.time}<br/>
            faith: {getFaith(this.props.villagers)}<br/>
            trust: {getTrust(this.props.villagers)}
          </div>
          <div className="characters">
            {this.props.villagers.map((villager: Villager) => (
              <div key={villager.id} className={`character ${villager.selected ? 'selected' : ''} ${!villager.alive ? 'dead' : ''}`} onClick={() => this.props.toggleSacrificed(villager.id)}>
                <div className={`characterImageContainer rot${villager.rot} ${villager.flip ? 'flip' : ''}`}>
                  <video className="characterImage" autoPlay loop>
                    <source src={`asset/${villager.asset}.mp4`} type="video/mp4"/>
                  </video>
                  <div className="characterShield"></div>
                  <div className="characterPancarte"></div>
                  <div className="characterName">{villager.name}</div>
                </div>
              </div>
            ) )}
          </div>
          <div className={`sacrificeAnnouncement ${null !== this.props.sacrificeAnnouncement ? 'visible' : ''}`}>
            <video className="characterImageBig" autoPlay loop>
              <source src="asset/shaman.mp4" type="video/mp4"/>
            </video>
            <div className="shamanMessage">
              {this.props.sacrificeAnnouncement}
              <span onClick={this.props.announcementValidation}>OK michel</span>
            </div>
          </div>
        </div>
        <div className={`factAnnouncement ${0 !== this.props.factAnnouncement.length ? 'visible' : ''}`}>
          <div className="shamanMessage">
            {this.props.factAnnouncement.join('\n')}
            <span onClick={this.props.factConfirmation}>OK michel</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect((state: GameState): ViewState => ({
  villagers: state.villagers,
  time: state.cycle.time,
  cycleCount: state.cycle.number,
  sacrificeAnnouncement: state.shaman.sacrificeAnnouncement,
  factAnnouncement: state.shaman.factAnnouncement,
  selectionStarted: state.selectionStarted,
}), (dispatch: any): ViewDispatch => ({
  toggleSacrificed: (id: string) => dispatch(toggleSacrificed(id)),
  announcementValidation: () => dispatch(selectionStart()),
  factConfirmation: () => dispatch(factConfirmation())
}))(App);
