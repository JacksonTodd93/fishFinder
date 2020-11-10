const express = require('express');
const app = express();
const Auth = require('./middleware/auth.js');
const bodyParser = require('body-parser');
const db = require('../database');
const models = require('./models');


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client'));

app.get('/', Auth.verifySession,
  (req, res) => {
    res.send({
      auth: true,
    });
  });

// app.get('/api/fish', (req, res) => {
//   const fishString = `SELECT id, name, location, hours, months FROM fish`;
//   db.query(AsyncfishString, (err, fishList) => {
//     if (err) {
//       console.log(err);
//       res.statusCode(500);
//       return;
//     }
//     res.send(fishList);
//   })
// });

app.get('/api/allusers', (req, res) => {
  const userString = `SELECT name FROM users`;
  db.dbConnection.query(userString, (err, userArray) => {
    if (err) {
      console.log(err);
      res.statusCode(500);
      return;
    }
    res.send(userArray);
  })
})

app.get('/api/users', (req, res) => {
  const name = req.query.name;
  const response = {};
  const userString = `SELECT * FROM users WHERE name = '${name}'`;
  db.dbConnection.query(userString, (err, userRow) => {
    if (err) {
      console.log(err);
      res.statusCode(500);
      return;
    }
    response.user = userRow[0];
    res.send(response);
  });
})

app.post('/api/users/', (req, res) => {
  const name = req.body.name;
  const insertString = `INSERT INTO users (name) VALUES ('${name}')`;
  db.dbConnection.query(insertString, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  res.send();
});

app.put('/api/users/:id', (req, res) => {
  const fishId = req.params.id;
  const name = req.body.name;
  const updateString = `UPDATE users SET fish${fishId} = NOT fish${fishId} where name = '${name}'`;
  db.dbConnection.query(updateString, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  res.send();
});

app.post('/signup', (req, res, next) => {
  models.Users.get({ username: req.body.username })
    .then((results) => {
      if (results) {
        // user already exists
        res.sendStatus(409);
      } else {
          models.Users.create(req.body)
            .then((result) => {
              var userId = result.insertId;
              models.Sessions.update({ hash: req.session.hash }, { userId: userId })
                .then((updateResult) => {
                  res.send({
                    auth: true,
                    hash: req.session.hash,
                  });
                });
            });
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.post('/login', (req, res, next) => {
  models.Users.get({ username: req.body.username })
    .then((results) => {
      if (results) {
        if (models.Users.compare(req.body.password, results.password, results.salt)) {
          var userId = results.id;
          models.Sessions.update({ hash: req.session.hash }, { userId: userId })
            .then((updateResult) => {
              res.send({
                auth: true,
                hash: req.session.hash,
              });
              return;
            });
        } else {
          // bad password
          res.sendStatus(401);
        }
      } else {
        // username not found
        res.sendStatus(401);
      }
    });
});

app.get('/logout', (req, res, next) => {
  models.Sessions.delete({ hash: req.session.hash }).then(() => {
    res.cookie('shortlyid', null);
    res.send({
      auth: false,
    });
  });
});

app.listen(port, () =>
  console.log(`Gone fishin' at http://localhost:${port}`
  ));
