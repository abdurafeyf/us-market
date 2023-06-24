const express = require('express');
const router = express.Router();
const sunburstData = require('../services/sunburstData');

/* GET quote data. */
router.get('/', async function(req, res, next) {
    try {
        res.json(await sunburstData.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting quote data `, err.message);
        next(err);
    }
});

module.exports = router;