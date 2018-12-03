import {GameState} from 'src/core/reducer';
import parameters from 'src/core/parameters';

export const startIntro = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'START_INTRO'});

  setTimeout(() => {
    dispatch({type: 'PLAY_SOUND', sound: 'fornir'});
  }, (parameters.introLength - 55) * 1000);
};
export const loadingUpdated = (progress: number) => ({
  type: 'LOADING_UPDATED',
  progress,
});
export const loadingFinished = () => ({
  type: 'LOADING_FINISHED',
});
