var tokenSecret = require('../../server').get('tokenSecret');

module.exports = function(req, res, next) {
  if (!req.headers['authorization'])
    return res.sendStatus(401);

  tokens = req.headers['authorization'].split(' ');
  if ((tokens.length != 2) || (tokens[0] != 'TokenSecret') || (tokens[1] != tokenSecret))
    return res.sendStatus(401);

  next();
};
