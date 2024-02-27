const router = require('express').Router();
const path = require('path');

// const fs = require('fs');
// Helper method for generating unique ids
// const uuid = require('uuid');

// router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));

// GET request for notes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))

    // Log request to the terminal
    console.info(`${req.method} request received to get notes`);
})

// POST request to add a note
router.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        // Obtain existing notes
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new review
                parsedNotes.push(newNote);

                // Write updated reviews back to the file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 3),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };
        
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in creating note');
    }
});

module.exports = router;