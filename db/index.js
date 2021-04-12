const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "movies"
});


const account = [
    {
        1: {
        title: 'food',
        budget: 1000
        },
        2: {
        title: 'housing',
        budget: 1000
        }, 
        3: {
        title: 'education',
        budget: 1000
        },
        4: {
        title: 'leisure',
        budget: 1000
        }
    }
];

const getAll = (req, res) => {
    res.json(account);
};

const getEnvById = (req, res) => {
    res.status(200).send(`Envelope with ID ${req.envelopeId} has the title ${account[0][req.envelopeId].title} and a budget of ${account[0][req.envelopeId].budget}`);
};

module.exports = {
    getAll,
    getEnvById
};