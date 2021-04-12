//add front end, restrict negaive amounts, refactor if possible, add functionality

const express = require('express');
const envRouter = require('./routes/envelopes');
const app = express();
//const cors = require('cors');
const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "movies"
});

const PORT = 3000;


//app.use(cors());
/*
app.post('/test', (req, res) => {
    res.send('ok')
})
*/

app.use('/envelopes', envRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
