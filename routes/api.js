const express = require('express');
const router = express.Router();
const fs = require('fs');

const dbData = require('../db/db.json');

router
    .route('/notes')
    .get('/notes', (req, res) => {
        res.status(200).json(dbData);
    })
    .post('/notes', (req, res) => {
        const { title, text } = req.body;
        console.log(title, text);
        if (!title && !text) {
            return res.status(400).json({ msg: 'You need to enter your note' });
        }

        const newNote = {
            id: uuidv4(),
            text,
            title
        }

        dbData.push(newNote);

        writeFile('./db/db.json', JSON.stringify(dbData))
            .then(() => res.status(200).json(newNote))
            .catch((error) => {
                console.log(error)
                res.status(500).json({ msg: "try again" })
            })
        try {
            writeFile('./db/db.json', JSON.stringify(dbData))
            res.status(200).json(newNote);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "try again later" })
        }
    })

router.route('notes/:id') {
    
}
    

module.exports = router;