const express = require('express')
const router = express.Router();
const fs = require('fs');
const userDataURL = "./resources/users.json"



// GET all user
router.get('/', (req, res) => {
    const userData = JSON.parse(fs.readFileSync(userDataURL));
    res.json(userData)
})

// GET one user with provided id
router.get('/:id', (req, res) => {
    let { id } = req.params;
    const userData = JSON.parse(fs.readFileSync(userDataURL));
    let user = userData.find(user => user.id === Number(id))
    res.json(user)

})

// POST - create a new user
router.post('/', (req, res) => {
    let { name, username, email, password, address, phone, website, company} = req.body;
    let newUser = {
        id: Math.floor(Math.random()*1000),
        name, username, email, password, address, phone, website, company
    }
    const userData = JSON.parse(fs.readFileSync(userDataURL));
    userData.push(newUser);
    fs.writeFileSync(userDataURL, JSON.stringify(userData))
    res.json(userData)

})

// PUT - update a user with provided id
router.put('/:id', (req, res) => {
    let { id } = req.params;
    let userId = Number(id)
    let { name, username, email, password, address, phone, website, company} = req.body;
    let updatedUser = {
        id: userId, name, username, email, password, address, phone, website, company
    }
    const userData = JSON.parse(fs.readFileSync(userDataURL));
    let newUserData = userData.map((user) => user.id === userId ? updatedUser : user)
    fs.writeFileSync(userDataURL, JSON.stringify(newUserData))
    res.json(newUserData)
})

// DELETE - delete a user with provided id
router.delete('/:id', (req, res) => {
    let { id } = req.params;
    let userId = Number(id)
    const userData = JSON.parse(fs.readFileSync(userDataURL));
    let newUserData = userData.filter((user) => user.id !== userId)
    fs.writeFileSync(userDataURL, JSON.stringify(newUserData))
    res.json(newUserData)

})
module.exports = router;