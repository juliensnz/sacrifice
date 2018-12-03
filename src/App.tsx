import './App.css';
import * as React from 'react';
import {connect} from 'react-redux';
import {Villager, Decision} from 'src/core/model';
import {GameState} from 'src/core/reducer';
import {
  toggleSacrificed,
  selectionStart,
  factConfirmation,
  dismissDecision,
  letterConfirmation,
  gameplayConfirmation
} from 'src/core/action';
import parameters from 'src/core/parameters';
import {getAliveVillagers, getFaith, getTrust} from 'src/core/utils';
import gameMessages from 'src/data/game-messages';
import {decisionConfirmation} from 'src/core/action/decision';
import Intro from 'src/component/intro';
import {startIntro} from 'src/core/action/intro';

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
  displayAnonymousLetter: boolean;
  displayGameplay: boolean;
  selectionStarted: boolean,
  gameover: string|null
  isIntro: boolean
  isLanding: boolean
  messager: Villager
}

type ViewDispatch = {
  toggleSacrificed: (id: string) => void
  announcementValidation: () => void
  factConfirmation: () => void
  letterConfirmation: () => void
  gameplayConfirmation: () => void
  dismissDecision: () => void
  startIntro: () => void
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
        <div className={`App ${this.props.selectionStarted ? 'selectionPhase' : ''} ${this.props.factAnnouncement ? 'announcementPhase' : ''} ${this.props.time < 4 && !this.props.isIntro && !this.props.isLanding ? 'newDay' : ''}`}>
          <div className="sacrificeInstruction">
            Who do you want to sacrifice? {parameters.cycleLength - this.props.time - 2 > 0 ? parameters.cycleLength - this.props.time - 3 : 0}s
          </div>
          <div className="cycleInstruction">
            Next new moon in {parameters.cycleLength - this.props.time - parameters.selectionLength}s
          </div>
          <div className="characters">
            {this.props.villagers.map((villager: Villager) => (
              <div key={villager.id} className={`character ${villager.selected ? 'selected' : ''} ${!villager.alive ? 'dead' : ''}`} onClick={() => this.props.toggleSacrificed(villager.id)}>
                <div className={`characterImageContainer rot${villager.rot} ${villager.flip ? 'flip' : ''}`}>
                  <video className="characterImage" autoPlay loop muted ref={this.videos[villager.id]}>
                    <source src={`asset/thumbnail/${villager.asset}.mp4`} type="video/mp4"/>
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
            <div className="popinContainer">
              <video className="characterImageBig" autoPlay loop muted>
                <source src="asset/shaman.mp4" type="video/mp4"/>
              </video>
              <div className="shamanBigShield"></div>
              <div className="shamanMessage">
                {this.props.sacrificeAnnouncement}
              </div>
              <div className="shamanOK" onClick={this.props.announcementValidation}>OK</div>
            </div>
          </div>
          <div className="iris1"/>
          <div className="iris2"/>
          <div className="iris3"/>
          <div className="iris4"/>
        </div>
        <div className={`gameoverAnnouncement ${null !== this.props.gameover ? 'visible' : ''}`}>
          <div className="popinContainer">
            <video className={this.props.gameover === 'no_more_faith' ? "characterImageBig hide" : "characterImageBig"} autoPlay loop muted ref={this.gameoverAnnouncementVideo}>
              <source src="asset/shaman.mp4" type="video/mp4"/>
            </video>
            <video className={this.props.gameover !== 'no_more_faith' ? "characterImageBig hide" : "characterImageBig"} autoPlay loop muted ref={this.gameoverAnnouncementVideo}>
              <source src={`asset/small/${this.props.messager.asset}.mp4`} type="video/mp4"/>
            </video>
            <div className="shamanBigShield"></div>
            <div className="shamanMessage">
              {null !== this.props.gameover ? gameMessages.gameover[this.props.gameover] : ''}
            </div>
          </div>
        </div>
        <div className={`factAnnouncement ${null !== this.props.factAnnouncement ? 'visible' : ''}`}>
          <div className="popinContainer">
            <video className="characterImageBig" autoPlay loop muted ref={this.factAnnouncementVideo}>
              <source src={`asset/small/${this.props.messager.asset}.mp4`} type="video/mp4"/>
            </video>
            <div className="shamanBigShield"></div>
            <div className="shamanMessage">
              {null !== this.props.factAnnouncement ? this.props.factAnnouncement.text : ''}
            </div>
            <div className="shamanOK" onClick={this.props.factConfirmation}>OK</div>
          </div>
        </div>
        <div className={`decisionAnnouncement ${null !== this.props.decisionAnnouncement ? 'visible' : ''}`}>
          <div className="popinContainer">
            <video className="characterImageBig" autoPlay loop muted ref={this.decisionAnnouncementVideo}>
              <source src={`asset/small/${this.props.messager.asset}.mp4`} type="video/mp4"/>
            </video>
            <div className="shamanBigShield"></div>
            <div className="shamanMessage">
              {null !== this.props.decisionAnnouncement ? this.props.decisionAnnouncement.text : ''}
            </div>
            <div className="shamanYES" onClick={() => this.props.decisionConfirmation('yes')}>Yes</div>
            <div className="shamanNO" onClick={() => this.props.decisionConfirmation('no')}>No</div>
          </div>
        </div>
        <div className={`decisionAnswer ${null !== this.props.decisionAnswer ? 'visible' : ''}`}>
          <div className="popinContainer">
            <video className="characterImageBig" autoPlay loop muted ref={this.decisionAnswerVideo}>
              <source src={`asset/small/${this.props.messager.asset}.mp4`} type="video/mp4"/>
            </video>
            <div className="shamanBigShield"></div>
            <div className="shamanMessage">
              {null !== this.props.decisionAnswer ? this.props.decisionAnswer : ''}
            </div>
            <div className="shamanOK" onClick={this.props.dismissDecision}>OK</div>
          </div>
        </div>
        <div className={`anonymousLetterAnnouncement ${this.props.displayAnonymousLetter ? 'visible' : ''}`}>
          <div className="letterPopinContainer">
            <div className="anonymousLetter">
              <div className="letterContent">
                <p>My dear Jarl,</p>
                <p>The shaman is malicious and cruel. He is not looking for the forgiveness of the Gods, but rather to increase his own power. Please, don't trust his advises blindly, this could lead to your end, and to the despair of your people.</p>
                <p>– An anonymous inhabitant that wants the well-being of his fellow citizen.</p>
              </div>
              <div className="shamanOK" onClick={this.props.letterConfirmation}>OK</div>
            </div>
          </div>
        </div>
        <div className={`gameplayAnnouncement ${this.props.displayGameplay ? 'visible' : ''}`}>
          <div className="letterPopinContainer">
            <div className="anonymousLetter">
              <div className="letterContent">
                <p>A people faithful to its Gods will tend to find a religious explanation to every event. A people which trust its ruler will understand and support its decisions.</p>
                <p>The villagers must trust (TRUST SIGN) in you Jarl. But they also have faith (FAITH SIGN) in the Gods.</p>
                <p>Which kind of Jarl will you be?</p>
              </div>
              <div className="shamanOK" onClick={this.props.gameplayConfirmation}>OK</div>
            </div>
          </div>
        </div>
        {this.props.isIntro ? <Intro /> : null}
        {this.props.isLanding ? (
        <div className="landing">
          <span className="startButton" onClick={this.props.startIntro}>Start</span>
        </div>
        ) : null}
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
  isIntro: state.isIntro,
  isLanding: state.isLanding,
  messager: state.cycle.messager,
  displayAnonymousLetter: state.anonymousLetterDisplayed,
  displayGameplay: state.gameplayDisplayed
}), (dispatch: any): ViewDispatch => ({
  toggleSacrificed: (id: string) => dispatch(toggleSacrificed(id)),
  announcementValidation: () => dispatch(selectionStart()),
  factConfirmation: () => dispatch(factConfirmation()),
  dismissDecision: () => dispatch(dismissDecision()),
  letterConfirmation: () => dispatch(letterConfirmation()),
  gameplayConfirmation: () => dispatch(gameplayConfirmation()),
  startIntro: () => dispatch(startIntro()),
  decisionConfirmation: (type: string) => dispatch(decisionConfirmation(type))
}))(App);
