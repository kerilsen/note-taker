const router = require('express').Router();
const { getNotes, createNote, deleteNote } = require('../controllers/apiController');

router.route('/notes')
    .get(getNotes)
    .post(createNote)

router.route('/notes/:id')
    .delete(deleteNote)

module.exports = router;