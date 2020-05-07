const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

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