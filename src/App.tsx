import './App.css';
import * as React from 'react';
import {connect} from 'react-redux';
import {Villager} from 'src/core/model';
import {GameState} from 'src/core/reducer';
import {toggleSacrificed, selectionStart} from 'src/core/action';
import parameters from 'src/core/parameters';

type ViewState = {
  villagers: Villager[]
  time: number
  sacrificeAnnouncement: string | null
  factAnnouncement: string | null
}

type ViewDispatch = {
  toggleSacrificed: (id: string) => void
  announcementValidation: () => void
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
      <div className="App">
        <div className="events">
          time: {parameters.cycleLength - this.props.time}<br/>
          faith: {getFaith(this.props.villagers)}<br/>
          trust: {getTrust(this.props.villagers)}
        </div>
        <div className="characters">
          {this.props.villagers.map((villager: Villager) => (
            <div className={`character ${villager.selected ? 'selected' : ''} ${!villager.alive ? 'dead' : ''}`} onClick={() => this.props.toggleSacrificed(villager.id)}>
              {/*<div className="characterText">a message</div>*/}
              <div className="characterImageContainer">
                <video className="characterImage" autoPlay loop>
                  <source src="asset/shaman.mp4" type="video/mp4"/>
                </video>
              </div>
              <div className="characterName">{villager.name}</div>
            </div>
          ) )}
        </div>
        <div className={`shamanAnnouncement ${null !== this.props.sacrificeAnnouncement ? 'visible' : ''}`}>
          <video className="characterImageBig" autoPlay loop>
            <source src="asset/shaman.mp4" type="video/mp4"/>
          </video>
          <div className="shamanMessage">
          {this.props.sacrificeAnnouncement}
          <span onClick={this.props.announcementValidation}>OK michel</span>
          </div>
        </div>
        <div className={`cycleAnnouncement ${null !== this.props.factAnnouncement ? 'visible' : ''}`}>
          {this.props.sacrificeAnnouncement}
          <span onClick={this.props.announcementValidation}>OK michel</span>
        </div>
      </div>
    );
  }
}

export default connect((state: GameState): ViewState => ({
  villagers: state.villagers,
  time: state.cycle.time,
  sacrificeAnnouncement: state.shaman.sacrificeAnnouncement,
  factAnnouncement: state.shaman.factAnnouncement,
}), (dispatch: any): ViewDispatch => ({
  toggleSacrificed: (id: string) => dispatch(toggleSacrificed(id)),
  announcementValidation: () => dispatch(selectionStart())
}))(App);
