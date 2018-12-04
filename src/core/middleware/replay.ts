const time = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'START_GAME') {
    if (undefined !== localStorage) {
      localStorage.setItem('already_played_game', '');
    }
  }
  return next(action);
};

export default time;
