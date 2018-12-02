const time = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'PLAY_SOUND') {
    const audio = new Audio(`asset/${action.sound}.mp3`);
    audio.play().catch(error => {});
  }
  console.log('action ===', action);
  return next(action);
};

export default time;
