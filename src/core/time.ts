const time = (store: any) => (next: any) => (action: any) => {
  return next(action);
};

export default time;
