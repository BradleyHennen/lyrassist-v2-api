const express = require('express');
const pool = require('../middleware/pool');
const router = express.Router();
const firebase = require('../middleware/firebase-auth');
const { body, validationResult } = require('express-validator');

router.post('/',
    body('fireId').notEmpty(),
    body('lastName').notEmpty(),
    body('firstName').notEmpty(),
    body('email').isEmail(),
    firebase.checkIfAuthenticated, (req, res) => {
        const body = req.body;
        console.log('body', body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const sqlText = 'INSERT INTO "user" (fire_id, first_name, last_name, email, description) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        pool.query(sqlText, [body.fireId, body.firstName, body.lastName, body.email, body.description])
            .then(() => {
                res.sendStatus(201)
            })
            .catch((error) => {
                console.log('Something went wrong posting user', error);
                if(error.code === '23505') {
                    res.status(400).json({error: 'Duplicate Id'})
                } else {
                    res.sendStatus(500);
                }
            })
    })

module.exports = router;