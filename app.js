const express = require('express');
const app = express();
const envRouter = require('./routes/envelopes');

const PORT = process.env.PORT || 3000;

app.use('/api/envelopes', envRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
