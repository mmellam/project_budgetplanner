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
        const id = req.params.envelopeId;
        const budget = req.query.budget;
        const name = req.query.name;
        //description missing
        let updated = [];
        
        if (budget && name) {
            updated = await pool.query("update envelope set name = $1, budget = $2 where id = $3 returning *", [name, budget, id]);
        } else if (!name) {
            updated = await pool.query("update envelope set budget = $1 where id = $2 returning *", [budget, id]);
        } else {
            updated = await pool.query("update envelope set name = $1 where id = $2 returning *", [name, id]);
        }   
        // to implement: if empty, not found
        console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`);
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

const createEnv = async (req, res) => {
    try {
        const name = req.query.name;
        const budget = Number(req.query.budget);
        const description = req.query.description;

        const created = await pool.query("insert into envelope(name, budget, description) values ($1, $2, $3) returning *", [name, budget, description]);
        console.log(`Envelope with id = ${created.rows[0].id} was created successfully`);
        res.status(200).send(created.rows);
    } catch (e) {
        console.log(e);
    }
}

const addBudget = async (req, res) => {
    try {
        const toAdd = Number(req.query.amount);
        if (isNaN(toAdd)) {
            res.status(400).send(`Error: Could not add to budget. Please enter a valid amount.`)
        } else {
            const updated = await pool.query("update envelope set budget = (budget + $1) where id = $2 returning *", [toAdd, req.params.envelopeId]);
            console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`)
            res.status(200).send(updated.rows);
        }
    } catch (e) {
        console.log(e);
    }   
}

const subtractBudget = async (req, res) => {
    try {
        const toSubtract = Number(req.query.amount);
        if (isNaN(toSubtract)) {
            res.status(400).send(`Error: Could not subtract from budget. Please enter a valid amount.`)
        } else {
            //error handling for id doesnt exist
            const updated = await pool.query("update envelope set budget = (budget - $1) where id = $2 returning *", [toSubtract, req.params.envelopeId]);
            console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`)
            res.status(200).send(updated.rows);
        }
    } catch (e) {
        console.log(e);
    }   
}

const transfer = async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const amount = Number(req.query.amount);
    //err handling if env doesnt exist
    try {
        if (isNaN(amount)) {
            res.status(400).send(`Error: Could not transfer. Please enter a valid amount.`)
        } else {
            const updatedFrom = await pool.query("update envelope set budget = (budget - $1) where id = $2 returning *", [amount, from]);
            const updatedTo = await pool.query("update envelope set budget = (budget + $1) where id = $2 returning *", [amount, to]);
            console.log('Transfer successful');
    
            res.status(200).json(updatedTo.rows);
        }
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getAll,
    getEnvById,
    updateEnv,
    deleteEnvById,
    createEnv,
    addBudget,
    subtractBudget,
    transfer
};