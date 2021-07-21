const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const envRouter = require('./routes/envelopes');
const transfersRouter = require('./routes/transfers');

const PORT = process.env.PORT || 3000;

app.use('/api/envelopes', envRouter);
app.use('/api/transfers', transfersRouter);

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to Budgetplanner 2.0!<h1>');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
