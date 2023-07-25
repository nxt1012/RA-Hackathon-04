const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const bodyParser = require("body-parser");
const users = require("./users")
const posts = require("./posts")

// Form HTML (action, method)
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch api
app.use(bodyParser.json());

// import subroutes
app.use("/api/v1/users", users);
app.use("/api/v1/posts", posts);

// get all posts of a user with provided id
app.get("/api/v1/users/:id/posts", (req, res)=> {
    let { id } = req.params;
    let userId = Number(id);
    const postData = JSON.parse(fs.readFileSync("./resources/posts.json"));
    let posts = postData.filter(post => post.userId === userId);
    console.log(posts)
    res.json(posts)
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});