export default (() => {
  let obj = {};
  obj.stats = {
    PENDING: 'pending',
    DONE: 'done',
    RUNNING: 'running',
    PAUSED: 'paused'
  };
  obj.actns = {
    DEFAULT: 'default',
    EDIT: 'edit'
  };

  return obj;
})();
