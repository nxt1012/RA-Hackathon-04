const express = require('express')
const router = express.Router();
const fs = require('fs');
const postDataURL = "./resources/posts.json"



// GET all posts
router.get('/', (req, res) => {
    const postData = JSON.parse(fs.readFileSync(postDataURL));
    res.json(postData)
})

// GET one post with provided id
router.get('/:id', (req, res) => {
    let { id } = req.params;
    const postData = JSON.parse(fs.readFileSync(postDataURL));
    let post = postData.find(post => post.id === Number(id))
    res.json(post)

})

// POST - create a new post
router.post('/', (req, res) => {
    let { userId, title, body } = req.body;
    let newPost = {
        id: Math.floor(Math.random()*1000),
        userId, title, body
    }
    console.log(newPost);

    const postData = JSON.parse(fs.readFileSync(postDataURL));
    postData.push(newPost);
    fs.writeFileSync(postDataURL, JSON.stringify(postData))
    res.json(postData)

})

// PUT - update a post with provided id
router.put('/:id', (req, res) => {
    let { id } = req.params;
    let postId = Number(id)

    let { userId, title, body } = req.body;
    let updatedPost = {
        id: postId, userId, title, body
    }
    const postData = JSON.parse(fs.readFileSync(postDataURL));
    let newPostData = postData.map((post) => post.id === postId ? updatedPost : post)
    fs.writeFileSync(postDataURL, JSON.stringify(newPostData))
    res.json(newPostData)
})

// DELETE - delete a post with provided id
router.delete('/:id', (req, res) => {
    let { id } = req.params;
    let postId = Number(id)
    const postData = JSON.parse(fs.readFileSync(postDataURL));
    let newPostData = postData.filter((post) => post.id !== postId)
    fs.writeFileSync(postDataURL, JSON.stringify(newPostData))
    res.json(newPostData)

})
module.exports = router;