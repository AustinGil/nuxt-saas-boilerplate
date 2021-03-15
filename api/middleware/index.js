/**
 * @param {Function} fn async handler
 * @returns {Function} Express Handler with safety
 */
export function wrapAsync(fn) {
  const handler = (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then(data => {
        if (res.headersSent) {
          return;
        }

        if (typeof data === 'object') {
          res.json(data);
        } else {
          res.send(data);
        }
      })
      .catch(next);
  };
  return handler;
}
