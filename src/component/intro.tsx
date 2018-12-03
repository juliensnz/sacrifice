import {connect} from 'react-redux';
import * as React from 'react';
import {GameState} from 'src/core/reducer';
import gameMessages from 'src/data/game-messages';
import {startGame} from 'src/core/action';
import parameters from 'src/core/parameters';

const historicContextMessages = gameMessages.intro['historic-context'];
const storyMessages = gameMessages.intro['story'];

class Intro extends React.Component<{visible: boolean, onStartGame: () => void}> {
  state = {step: 0, visible: false};
  private logoVideo: React.RefObject<HTMLVideoElement>;

  constructor(props: {visible: boolean, onStartGame: () => void}) {
    super(props);

    this.logoVideo = React.createRef<HTMLVideoElement>();
  }
  componentDidMount() {
    const messages = [...historicContextMessages, ...storyMessages];
    const letterTime = (parameters.introLength * 1000) / messages.reduce((length: number, paragraph: string) => length + paragraph.length, 0);
    const scheduleMessage = (index: number, duration: number) => {
      setTimeout(() => {
        this.setState({step: index});
      }, duration)
    };

    let currentTime = 0;
    messages.forEach((paragraph: string, index) => {
      scheduleMessage(index + 1, currentTime);
      currentTime += paragraph.length * letterTime;
    });

    scheduleMessage(historicContextMessages.length + storyMessages.length + 1, currentTime + 3000);

    this.setState({visible: true, step: 0});
  }

  render () {
    return (<div className={`intro ${this.state.visible ? 'visible' : ''}`}>
      <div className={`historic-context ${this.state.step <= historicContextMessages.length ? 'visible' : ''}`}>
        {historicContextMessages.map((paragraph: string, index) => {
          return (<div key={index} className={`paragraph ${this.state.step > index ? 'visible' : ''}`}>{paragraph}</div>)
        })}
      </div>
      <div className={`story ${this.state.step > historicContextMessages.length ? 'visible' : ''}`}>
        {storyMessages.map((paragraph: string, index) => {
          return (<div key={index} className={`paragraph ${this.state.step > (index + historicContextMessages.length) ? 'visible' : ''}`}>{paragraph}</div>)
        })}
      </div>
      <div className={`start ${this.state.step > (historicContextMessages.length + storyMessages.length) ? 'visible' : ''}`}>
        <video className="logo" autoPlay loop muted ref={this.logoVideo}>
          <source src={`asset/logo.mp4`} type="video/mp4"/>
        </video>
        <div className="startGame" onClick={this.props.onStartGame}>Let's rule</div>
      </div>
    </div>)
  }
}

export default connect((state: GameState) => ({
  visible: state.isIntro
}), (dispatch: any) => ({
  onStartGame: () => {
    dispatch(startGame());
  }
}))(Intro);
