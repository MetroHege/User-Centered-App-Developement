/*simple middlewware logging requests
 */

const logger = (req, res, next) => {
  console.log("Time: ", Date.now(), req.method, req.url);
  next();
};

export default logger;
