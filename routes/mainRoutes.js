const router = require('express').Router();
const path = require('path');

const notesRoute = require('./notesRoute');
const apiRoute = require('./apiRoute');

router.use('/notes', notesRoute);
router.use('/api', apiRoute);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    // Log request to the terminal
    console.info(`${req.method} request for a wildcard - redirected to index`);
});

module.exports = router;