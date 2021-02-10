const express = require('express');
const router = express.Router();
const axios = require('axios');
const firebase = require('../middleware/firebase-auth');
const cors = require('cors')
const corsOptions = require('../middleware/cors');

router.get('/:query', firebase.checkIfAuthenticated, cors(corsOptions), (req, res) => {
    console.log('In Datamuse GET. Req.params:', req.params.query);
    const query = req.params.query;
    let endpoint = `https://api.datamuse.com/words?${query}&max=100`;
    axios.get(endpoint)
        .then((response) => {
            res.send(response.data);
        }).catch((error) => {
            console.log('error', error);
            res.sendStatus(500)
        })
})

module.exports = router;