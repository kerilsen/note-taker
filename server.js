const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger);

app.use(express.static("public"));
app.use(express.json());

const mainRouter = require('./routes/mainRoutes');
app.use('/', mainRouter);

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
};

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);