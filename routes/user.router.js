const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/user', (req, res) => {
    const body = req.body;
    const sqlText = 'INSERT INTO "user" (first_name, last_name, email, description) VALUES ($1, $2, $3, $4) RETURNING id';
    pool.query(sqlText, [body.firstName, body.lastName, body.email, body.desctription])
        .then(() => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('Something went wrong posting user', error);
            res.sendStatus(500);
        })
})