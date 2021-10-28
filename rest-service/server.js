const express = require('express');
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors())

const authorRoutes = require('./routes/author')
app.use("/service/author", authorRoutes);

app.use('/', (req, res, next) => {
    res.status(404).send('404 Page Not Found');
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});