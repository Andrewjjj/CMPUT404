const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const adminRoutes = require('./routes/admin')
const authorRoutes = require('./routes/author')
const commentRoutes = require('./routes/comment')
const followerRoutes = require('./routes/follower')
const friendRoutes = require('./routes/friend')
const friendRequestRoutes = require('./routes/friendRequest')
const inboxRoutes = require('./routes/inbox')
const likeRoutes = require('./routes/like')
const postRoutes = require('./routes/post');
const registerRoutes = require('./routes/register');


app.use(adminRoutes);
app.use(authorRoutes);
app.use(postRoutes);
app.use(followerRoutes);
app.use(commentRoutes);
app.use(friendRoutes);
app.use(friendRequestRoutes);
app.use(inboxRoutes);
app.use(likeRoutes);
app.use(registerRoutes);

const authTestRoutes = require('./routes/_other');
app.use(authTestRoutes);


app.use('/', (err, req, res, next) => {
    console.log(err)
    res.status(404).send(`400 Error. Message: ${err.message}`);
});

app.use('/', (req, res, next) => {
    res.status(404).send('404 Page Not Found');
});


// const db = require('./database/database')
// db.createAuthor("Aaron", "1234", "https://github.com/AaronTrip", "https://i.imgur.com/k7XVwpB.jpeg")
// db.createAuthor("Andrew", "1234", "https://github.com/Andrewjjj", "https://i.imgur.com/k7XVwpB.jpeg")
// db.createAuthor("Jane", "1234", "https://github.com/janhavi0210", "https://i.imgur.com/k7XVwpB.jpeg")
// db.createAuthor("Wonbin", "1234", "https://github.com/wonbinjeong", "https://i.imgur.com/k7XVwpB.jpeg")
// db.createAuthor("Simon", "1234", "https://github.com/snhumphr", "https://i.imgur.com/k7XVwpB.jpeg")

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});