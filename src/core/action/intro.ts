import {GameState} from 'src/core/reducer';

export const startIntro = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'START_INTRO'});
  dispatch({type: 'PLAY_SOUND', sound: 'fornir'});

  setTimeout(() => {}, 1000 * 12);
};
export const loadingUpdated = (progress: number) => ({
  type: 'LOADING_UPDATED',
  progress,
});
export const loadingFinished = () => ({
  type: 'LOADING_FINISHED',
});
