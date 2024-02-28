const dbData = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { writeFile } = require('fs/promises');

const getNotes = (req, res) => {
    res.status(200).json(dbData);
    // Log request to the terminal
    console.info(`${req.method} request to get notes`);
};

const createNote = async (req, res) => {

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    // Log request to the terminal
    console.info(`${req.method} request to create a note with: [title] ${title} [text] ${text}`);

    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            id: uuidv4(),
            title,
            text
        };

        // Push newNote to the json file
        dbData.push(newNote);
        try {
            await writeFile('./db/db.json', JSON.stringify(dbData));
            res.status(200).json(newNote);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Unable to write to database" });
        }
        return;
    }
    res.status(400).json({ message: 'You need to enter your note first' });
    return;
};

// Function to delete a note when the affiliated 'trash' button is clicked
const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    // Make a new array of all notes except the one with the ID provided in the URL
    const result = dbData.filter((note) => note.id !== noteId);
    console.log(result);
    try {
        await writeFile('./db/db.json', JSON.stringify(result));
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Unable to delete note` });
    }
};

module.exports = {
    getNotes, createNote, deleteNote
};