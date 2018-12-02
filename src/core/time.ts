const time = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'PLAY_SOUND') {
    if (action.sound === 'sacrifice') {
      var audio = new Audio('asset/sacrifice.mp3');
      audio.play();
    }

    if (action.sound === 'no_sacrifice') {
      var audio = new Audio('asset/no_sacrifice.mp3');
      audio.play();
    }

    if (action.sound === 'ambient_loop') {
      var audio = new Audio('asset/ambient_loop.mp3');
      audio.play();
    }
  }
  console.log('action ===', action);
  return next(action);
};

export default time;
