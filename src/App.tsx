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
  factAnnouncement: {
    text: string;
    type: string;
  } | null;
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
  private videos: {[key: string]: React.RefObject<HTMLVideoElement>} = {};

  constructor(props: ViewState & ViewDispatch) {
    super(props);

    this.videos = props.villagers.reduce((refs: {[key: string]: React.RefObject<HTMLVideoElement>}, villager: Villager) => {
      return {...refs, [villager.id]: React.createRef<HTMLVideoElement>()}
    }, {});
  }

  componentDidMount() {
    for (const video of Object.values(this.videos)) {
      if (null !== video.current) {
        video.current.playbackRate = 0.7;
      }

      setInterval(() => {
        if (null !== video.current) {
          video.current.paused ? video.current.play() : video.current.pause();
        }
      }, Math.random() * 2000 + 1000);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div className="debug">
          cycle count: {this.props.cycleCount}<br/>
          time: {parameters.cycleLength - this.props.time}<br/>
          faith: {Math.round(getFaith(this.props.villagers))}%<br/>
          trust: {Math.round(getTrust(this.props.villagers))}%
        </div>
        <div className={`App ${this.props.selectionStarted ? 'selectionPhase' : ''} ${this.props.time < 4 ? 'newDay' : ''}`}>
          <div className="characters">
            {this.props.villagers.map((villager: Villager) => (
              <div key={villager.id} className={`character ${villager.selected ? 'selected' : ''} ${!villager.alive ? 'dead' : ''}`} onClick={() => this.props.toggleSacrificed(villager.id)}>
                <div className={`characterImageContainer rot${villager.rot} ${villager.flip ? 'flip' : ''}`}>
                  <video className="characterImage" autoPlay loop muted ref={this.videos[villager.id]}>
                    <source src={`asset/${villager.asset}.mp4`} type="video/mp4"/>
                  </video>
                  <div className="characterShield"></div>
                  <div className="characterPancarte"></div>
                  <div className="characterName">{villager.trust} - {villager.name} - {villager.faith}</div>
                  <div className="characterText">{null !== villager.message ?
                    (<div className="characterTextInner">{villager.message.message}</div>) :
                    ''
                  }</div>
                </div>
              </div>
            ) )}
          </div>
          <div className={`sacrificeAnnouncement ${null !== this.props.sacrificeAnnouncement ? 'visible' : ''}`}>
            <video className="characterImageBig" autoPlay loop>
              <source src="asset/shaman.mp4" type="video/mp4"/>
            </video>
            <div className="shamanBigShield"></div>
            <div className="shamanMessage">
              {this.props.sacrificeAnnouncement}
            </div>
            <div className="shamanOK" onClick={this.props.announcementValidation}>OK</div>
          </div>
        </div>
        <div className={`factAnnouncement ${null !== this.props.factAnnouncement ? 'visible' : ''}`}>
          <video className="characterImageBig" autoPlay loop>
            <source src="asset/shaman.mp4" type="video/mp4"/>
          </video>
          <div className="shamanBigShield"></div>
          <div className="shamanMessage">
            {null !== this.props.factAnnouncement ? this.props.factAnnouncement.text : ''}
          </div>
          <div className="shamanOK" onClick={this.props.factConfirmation}>OK</div>
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
