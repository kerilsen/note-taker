const express = require('express');
const app = express();
const PORT = 3001;

app.use(logger);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notesRouter = require('./routes/notes');
const apiRouter = require('./routes/api.js');

app.use('/notes', notesRouter);
app.use('/api', apiRouter);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);