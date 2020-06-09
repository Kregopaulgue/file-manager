const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { initiateMongoServer } = require('./config/db.js');

const UsersRouter = require('./routes/users.js');
const ProjectsRouter = require('./routes/projects.js');
const TagsRouter = require('./routes/tags.js');
const FilesRouter = require('./routes/files.js');

initiateMongoServer();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users/', UsersRouter);
app.use('/projects/', ProjectsRouter);
app.use('/tags/', TagsRouter);
app.use('/files/', FilesRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Sever started on port ${port}`);
});