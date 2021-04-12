const express = require('express');
const app = express();
const envRouter = require('./routes/envelopes');
const db = require('./db/index');

const PORT = 3000;

app.use('/envelopes', envRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
