const express = require('express')
const router = express.Router();
const fs = require('fs');
const roundDataURL = "./data/rounds.json"

router.get('/', (req, res) => {
    const roundData = JSON.parse(fs.readFileSync(roundDataURL));
    res.json(roundData)
})
router.post('/', (req, res) => {
    const roundData = JSON.parse(fs.readFileSync(roundDataURL));
    roundData.push(req.body)
    fs.writeFileSync(roundDataURL, JSON.stringify(roundData));
    res.json(roundData)
})
module.exports = router;