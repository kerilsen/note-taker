const express = require('express');
const router = express.Router();
const fs = require('fs');

const dbData = require('../db/db.json');
const {v4: uuid} = require('uuid');

router
    .route('/notes')
    .get((req, res) => {
        readFromFile('../db/db.json').then((dbData) => res.json(JSON.parse(dbData)));
        // res.status(200).json(dbData);
    })
    .post((req, res) => {
        const { title, text } = req.body;
        console.log(title, text);
        if (!title && !text) {
            return res.status(400).json({ msg: 'You need to enter your note' });
        }

        const newNote = {
            id: uuid(),
            text,
            title
        }

        dbData.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {})
            .then(() => res.status(200).json(newNote))
            .catch((error) => {
                console.log(error)
                res.status(500).json({ msg: "try again" })
            })
        try {
            fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {})
            res.status(200).json(newNote);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "try again later" })
        }
    })

// router.route('notes/:id') {

// }


module.exports = router;