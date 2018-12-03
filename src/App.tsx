import './App.css';
import * as React from 'react';
import {connect} from 'react-redux';
import {Villager, Decision, imageNumbers} from 'src/core/model';
import {GameState} from 'src/core/reducer';
import {toggleSacrificed, selectionStart, factConfirmation, dismissDecision} from 'src/core/action';
import parameters from 'src/core/parameters';
import {getAliveVillagers, getFaith, getRandomArray, getTrust} from 'src/core/utils';
import gameMessages from 'src/data/game-messages';
import {decisionConfirmation} from 'src/core/action/decision';
import Intro from 'src/component/intro';

type ViewState = {
  villagers: Villager[]
  aliveVillagers: Villager[]
  time: number
  cycleCount: number
  sacrificeAnnouncement: string | null
  decisionAnswer: string | null
  decisionAnnouncement: Decision | null
  factAnnouncement: {
    text: string;
    type: string;
  } | null;
  selectionStarted: boolean,
  gameover: string|null
  isIntro: boolean
}

type ViewDispatch = {
  toggleSacrificed: (id: string) => void
  announcementValidation: () => void
  factConfirmation: () => void
  dismissDecision: () => void
  decisionConfirmation: (type: string) => void
}

class App extends React.Component<ViewState & ViewDispatch> {
  private videos: {[key: string]: React.RefObject<HTMLVideoElement>} = {};
  private gameoverAnnouncementVideo: React.RefObject<HTMLVideoElement>;
  private factAnnouncementVideo: React.RefObject<HTMLVideoElement>;
  private decisionAnnouncementVideo: React.RefObject<HTMLVideoElement>;
  private decisionAnswerVideo: React.RefObject<HTMLVideoElement>;

  constructor(props: ViewState & ViewDispatch) {
    super(props);

    this.videos = props.villagers.reduce((refs: {[key: string]: React.RefObject<HTMLVideoElement>}, villager: Villager) => {
      return {...refs, [villager.id]: React.createRef<HTMLVideoElement>()}
    }, {});

    this.gameoverAnnouncementVideo = React.createRef<HTMLVideoElement>();
    this.factAnnouncementVideo = React.createRef<HTMLVideoElement>();
    this.decisionAnnouncementVideo = React.createRef<HTMLVideoElement>();
    this.decisionAnswerVideo = React.createRef<HTMLVideoElement>();
  }

  componentDidMount() {
    for (const video of Object.values(this.videos)) {
      if (null !== video.current) {
        video.current.playbackRate = 0.7;
      }

      setInterval(() => {
        if (null !== video.current) {
          video.current.paused ? video.current.play().catch(error => {}) : video.current.pause();
        }
      }, Math.random() * 2000 + 3000);
    }
  }

  componentDidUpdate() {
    if (null !== this.gameoverAnnouncementVideo.current) {
      if (null !== this.props.gameover) {
        this.gameoverAnnouncementVideo.current.play().catch(error => {});
      } else {
        this.gameoverAnnouncementVideo.current.pause();
      }
    }

    if (null !== this.factAnnouncementVideo.current) {
      if (null !== this.props.factAnnouncement) {
        this.factAnnouncementVideo.current.play().catch(error => {});
      } else {
        this.factAnnouncementVideo.current.pause();
      }
    }

    if (null !== this.decisionAnnouncementVideo.current) {
      if (null !== this.props.decisionAnnouncement) {
        this.decisionAnnouncementVideo.current.play().catch(error => {});
      } else {
        this.decisionAnnouncementVideo.current.pause();
      }
    }

    if (null !== this.decisionAnswerVideo.current) {
      if (null !== this.props.decisionAnswer) {
        this.decisionAnswerVideo.current.play().catch(error => {});
      } else {
        this.decisionAnswerVideo.current.pause();
      }
    }
  }

  private getTrustAndFaithClass(level: number) {
    if (level < 25) {
      return 'chaotic';
    } else if (level < 50) {
      return 'bad';
    } else if (level < 75) {
      return 'good';
    } else {
      return 'loyal';
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div className={parameters.debug ? 'debug visible' : 'debug'}>
          cycle count: {this.props.cycleCount}<br/>
          time: {parameters.cycleLength - this.props.time}<br/>
          faith: {Math.round(getFaith(this.props.aliveVillagers))}%<br/>
          trust: {Math.round(getTrust(this.props.aliveVillagers))}%
        </div>
        <div className={`App ${this.props.selectionStarted ? 'selectionPhase' : ''} ${this.props.factAnnouncement ? 'announcementPhase' : ''} ${this.props.time < 4 ? 'newDay' : ''}`}>
          <div className="characters">
            {this.props.villagers.map((villager: Villager) => (
              <div key={villager.id} className={`character ${villager.selected ? 'selected' : ''} ${!villager.alive ? 'dead' : ''}`} onClick={() => this.props.toggleSacrificed(villager.id)}>
                <div className={`characterImageContainer rot${villager.rot} ${villager.flip ? 'flip' : ''}`}>
                  <video className="characterImage" autoPlay loop muted ref={this.videos[villager.id]}>
                    <source src={`asset/small/${villager.asset}.mp4`} type="video/mp4"/>
                  </video>
                  <div className="characterShield"></div>
                  <div className={`characterFaith ${this.getTrustAndFaithClass(villager.faith)}`}></div>
                  <div className={`characterTrust ${this.getTrustAndFaithClass(villager.trust)}`}></div>
                  <div className="characterPlumeLeft"></div>
                  <div className="characterPlumeRight"></div>
                  {!villager.alive ? (
                    <video className="deadVideo" autoPlay loop muted>
                      <source src={`asset/death.mp4`} type="video/mp4"/>
                    </video>
                  ) : null}
                  <div className="characterPancarte"></div>
                  <div className="characterName">{villager.name}</div>
                  <div className="characterText">{null !== villager.message ?
                    (<div className="characterTextInner">{villager.message.message}</div>) :
                    ''
                  }</div>
                </div>
              </div>
            ) )}
          </div>
          <div className={`sacrificeAnnouncement ${null !== this.props.sacrificeAnnouncement ? 'visible' : ''}`}>
            <video className="characterImageBig" autoPlay loop muted>
              <source src="asset/shaman.mp4" type="video/mp4"/>
            </video>
            <div className="shamanBigShield"></div>
            <div className="shamanMessage">
              {this.props.sacrificeAnnouncement}
            </div>
            <div className="shamanOK" onClick={this.props.announcementValidation}>OK</div>
          </div>
          <div className="iris1"/>
          <div className="iris2"/>
          <div className="iris3"/>
          <div className="iris4"/>
        </div>
        <div className={`gameoverAnnouncement ${null !== this.props.gameover ? 'visible' : ''}`}>
          <video className={this.props.gameover === 'no_more_faith' ? "characterImageBig hide" : "characterImageBig"} autoPlay loop muted ref={this.gameoverAnnouncementVideo}>
            <source src="asset/shaman.mp4" type="video/mp4"/>
          </video>
          <video className={this.props.gameover !== 'no_more_faith' ? "characterImageBig hide" : "characterImageBig"} autoPlay loop muted ref={this.gameoverAnnouncementVideo}>
            <source src={`asset/small/viking_${getRandomArray(imageNumbers)}.mp4`} type="video/mp4"/>
          </video>
          <div className="shamanBigShield"></div>
          <div className="shamanMessage">
            {null !== this.props.gameover ? gameMessages.gameover[this.props.gameover] : ''}
          </div>
        </div>
        <div className={`factAnnouncement ${null !== this.props.factAnnouncement ? 'visible' : ''}`}>
          <video className="characterImageBig" autoPlay loop muted ref={this.factAnnouncementVideo}>
            <source src={`asset/small/viking_${getRandomArray(imageNumbers)}.mp4`} type="video/mp4"/>
          </video>
          <div className="shamanBigShield"></div>
          <div className="shamanMessage">
            {null !== this.props.factAnnouncement ? this.props.factAnnouncement.text : ''}
          </div>
          <div className="shamanOK" onClick={this.props.factConfirmation}>OK</div>
        </div>
        <div className={`decisionAnnouncement ${null !== this.props.decisionAnnouncement ? 'visible' : ''}`}>
          <video className="characterImageBig" autoPlay loop muted ref={this.decisionAnnouncementVideo}>
            <source src={`asset/small/viking_${getRandomArray(imageNumbers)}.mp4`} type="video/mp4"/>
          </video>
          <div className="shamanBigShield"></div>
          <div className="shamanMessage">
            {null !== this.props.decisionAnnouncement ? this.props.decisionAnnouncement.text : ''}
          </div>
          <div className="shamanYES" onClick={() => this.props.decisionConfirmation('yes')}>Yes</div>
          <div className="shamanNO" onClick={() => this.props.decisionConfirmation('no')}>No</div>
        </div>
        <div className={`decisionAnswer ${null !== this.props.decisionAnswer ? 'visible' : ''}`}>
          <video className="characterImageBig" autoPlay loop muted ref={this.decisionAnswerVideo}>
            <source src={`asset/small/viking_${getRandomArray(imageNumbers)}.mp4`} type="video/mp4"/>
          </video>
          <div className="shamanBigShield"></div>
          <div className="shamanMessage">
            {null !== this.props.decisionAnswer ? this.props.decisionAnswer : ''}
          </div>
          <div className="shamanOK" onClick={this.props.dismissDecision}>OK</div>
        </div>
        {this.props.isIntro ? <Intro /> : null}
      </React.Fragment>
    );
  }
}

export default connect((state: GameState): ViewState => ({
  villagers: state.villagers,
  aliveVillagers: getAliveVillagers(state.villagers),
  time: state.cycle.time,
  cycleCount: state.cycle.number,
  sacrificeAnnouncement: state.shaman.sacrificeAnnouncement,
  factAnnouncement: state.shaman.factAnnouncement,
  decisionAnnouncement: state.decision,
  decisionAnswer: state.decisionAnswer,
  selectionStarted: state.selectionStarted,
  gameover: state.gameover,
  isIntro: state.isIntro
}), (dispatch: any): ViewDispatch => ({
  toggleSacrificed: (id: string) => dispatch(toggleSacrificed(id)),
  announcementValidation: () => dispatch(selectionStart()),
  factConfirmation: () => dispatch(factConfirmation()),
  dismissDecision: () => dispatch(dismissDecision()),
  decisionConfirmation: (type: string) => dispatch(decisionConfirmation(type))
}))(App);
