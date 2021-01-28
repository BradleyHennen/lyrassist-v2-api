const express = require('express');
const pool = require('../middleware/pool');
const router = express.Router();
const firebase = require('../middleware/firebase-auth');

router.post('/', firebase.checkIfAuthenticated, (req, res) => {
    const body = req.body;
    console.log('body', body);

    const sqlText = 'INSERT INTO "user" (first_name, last_name, email, description) VALUES ($1, $2, $3, $4) RETURNING id';
    pool.query(sqlText, [body.firstName, body.lastName, body.email, body.description])
        .then(() => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('Something went wrong posting user', error);
            res.sendStatus(500);
        })
})

module.exports = router;