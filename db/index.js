const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "budgetplanner"
});


const getAll = async (req, res) => {
    try {
        const result = await pool.query("select * from envelope order by id");
        console.log("GET all successful");
        res.send(result.rows);
    } catch (e) {
        console.log(e);
    } 
};

const getEnvById = async (req, res) => {
    try {
        //await pool.query("insert into films(name, rel_year) values ($1, $2)", ["Another test 2", 2015]);
        const result = await pool.query("select * from envelope where id = $1", [req.params.envelopeId]);
        // to implement: if empty, not found
        console.log("GET env by id successful");
        res.send(result.rows);
    } catch (e) {
        console.log(e);
    } 
};

const updateEnv = async (req, res) => {
    try {
        const budget = req.query.budget;
        const name = req.query.name;
        let updated = [];
        
        if (budget && name) {
            updated = await pool.query("update envelope set name = $1, budget = $2 where id = $3 returning *", [name, budget, req.params.envelopeId]);
        } else if (!name) {
            updated = await pool.query("update envelope set budget = $1 where id = $2 returning *", [budget, req.params.envelopeId]);
        } else {
            updated = await pool.query("update envelope set name = $1 where id = $2 returning *", [name, req.params.envelopeId]);
        }   
        // to implement: if empty, not found
        console.log(`Envelope with id = ${req.params.envelopeId} was updated successfully`);
        res.status(200).send(updated.rows);
    } catch (e) {
        console.log(e);
    }
}

const deleteEnvById = async (req, res) => {
    try {
        await pool.query("delete from envelope where id = $1 returning *", [req.params.envelopeId]);

        console.log(`Envelope with id = ${req.params.envelopeId} was deleted successfully`);
        res.status(200).send('[]');
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getAll,
    getEnvById,
    updateEnv,
    deleteEnvById
};