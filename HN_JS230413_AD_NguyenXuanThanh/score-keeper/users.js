const express = require('express')
const router = express.Router();
const fs = require('fs');
const userDataURL = "./data/users.json"

router.get('/', (req, res) => {
    const userData = JSON.parse(fs.readFileSync(userDataURL));
    console.log(userData);
    res.json(userData)
})

router.put('/', (req, res) => {
    fs.writeFileSync(userDataURL, JSON.stringify(req.body))
    const userData = JSON.parse(fs.readFileSync(userDataURL));
    res.json(userData);
})

module.exports = router;