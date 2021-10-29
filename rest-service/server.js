const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const authorRoutes = require('./routes/author')
const postRoutes = require('./routes/post');
app.use("/service/author", authorRoutes);
app.use("/service/post", postRoutes);

app.use('/', (req, res, next) => {
    res.status(404).send('404 Page Not Found');
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});