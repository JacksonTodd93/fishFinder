const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies) {
    if (req.cookies.shortlyid) {
      models.Sessions.get({ hash: req.cookies.shortlyid })
        .then((sessionTableRow) => {
          if (sessionTableRow === undefined) {
            var sessionObj = {};
            models.Sessions.create()
              .then((result) => {
                models.Sessions.get({ id: result.insertId })
                  .then((sessionTableRow) => {
                    sessionObj.hash = sessionTableRow.hash;
                    req.session = sessionObj;
                    res.cookie('shortlyid', sessionTableRow.hash);
                    next();
                  });
              });
          } else {
            var userId = sessionTableRow.userId;
            models.Users.get({ id: userId })
              .then((userTableRow) => {
                req.session = {};
                if (userTableRow) {
                  req.session.userId = sessionTableRow.userId;
                  var userObj = { username: userTableRow.username };
                  req.session.user = userObj;
                }
                req.session.hash = sessionTableRow.hash;
                next();
              });
          }
        });
    } else {
      var sessionObj = {};
      models.Sessions.create()
        .then((result) => {
          models.Sessions.get({ id: result.insertId })
            .then((sessionTableRow) => {
              sessionObj.hash = sessionTableRow.hash;
              req.session = sessionObj;
              res.cookie('shortlyid', sessionTableRow.hash);
              next();
            });
        });
    }
  }
};

module.exports.verifySession = function (req, res, next) {
  models.Sessions.get({ hash: req.session.hash })
    .then((sessionTableRow) => {
      if (sessionTableRow.userId === null) {
        res.send({
          auth: false
        });
        return;
      } else {
        next();
      }
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

