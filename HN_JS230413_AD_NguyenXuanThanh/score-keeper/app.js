const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = require("./users")
const rounds = require("./rounds")

app.use(express.static('public'))
app.use("/users", users);
app.use("/rounds", rounds);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/score-keeper.html`);
})

app.get('/round/1', (req, res) => {
    res.sendFile(`${__dirname}/public/round-score.html`);
})

app.listen(port, () => {
    console.log(`app listening on ${port}`);
})