const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "budgetplanner"
});

// Send 404 response if envelope not found
// Input validation
// calculation validation: no negative envelopes

const nameInputValidate = (input) => {
    const regex = /^\w+$/g;
    if (!regex.test(input)) {
        return false;
    } else {
        return true;
    }
}

const getAll = async (req, res) => {
    try {
        const result = await pool.query("select * from envelope order by id");
        res.send(result.rows);
        console.log("GET all successful");
    } catch (e) {
        console.log(e);
        res.status(500).send;
    } 
};



//console.log('Invalid name input');
//return res.status(400).send('Error: Please enter a valid name.')
/*
console.log(regex.test(req.params[prop]))

*/

//done
const getEnvById = async (req, res) => {
    try {
        // validate input number
        if (isNaN(req.params.envelopeId)) {
            return res.status(400).send('Error: Please enter a valid number for the envelope id.')
        }
        // query db and handle error if not found 
        const result = await pool.query("select * from envelope where id = $1", [req.params.envelopeId]);
        if (result.rows.length === 0) {
            console.log('Envelope not found');
            return res.status(404).send(`Error: envelope with the provided id of ${req.params.envelopeId} does not exist`);
        }
        // send response
        res.send(result.rows);
        console.log("GET env by id successful");
    } catch (e) {
        console.log(e);
        res.status(500).send;
    } 
};
// done
const updateEnv = async (req, res) => {
    try {
        const id = req.params.envelopeId;
        const budget = req.query.budget;
        const name = req.query.name;
        
        //description missing
        let updated = [];
        
        if (budget && name) {
            // validate input numbers and name and query db
            if (isNaN(id) || isNaN(budget) || nameInputValidate(name) === false) {
            return res.status(400).send('Error: Please enter valid inputs for id, name, and budget.')
            }
            updated = await pool.query("update envelope set name = $1, budget = $2 where id = $3 returning *", [name, budget, id]);
        } else if (!name) {
            // validate input numbers and name and query db
            if (isNaN(id) || isNaN(budget)) {
                return res.status(400).send('Error: Please enter valid inputs for id and budget.')
            }
            updated = await pool.query("update envelope set budget = $1 where id = $2 returning *", [budget, id]);
        } else {
            // validate input numbers and name and query db
            if (isNaN(id) || nameInputValidate(name) === false) {
                return res.status(400).send('Error: Please enter valid inputs for id and name.')
            }
            updated = await pool.query("update envelope set name = $1 where id = $2 returning *", [name, id]);
        }   
        // handle error if not found 
        if (updated.rows.length === 0) {
            console.log('Envelope not found');
            return res.status(404).send(`Error: envelope with the provided id of ${req.params.envelopeId} does not exist`);
        }
        // send response
        res.status(200).send(updated.rows);
        console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`);
    } catch (e) {
        console.log(e);
        return res.status(500).send; 
    }
}
// done
const deleteEnvById = async (req, res) => {
    try {
        // validate input number
        if (isNaN(req.params.envelopeId)) {
            return res.status(400).send('Error: Please enter a valid number for the envelope id.')
        }
        // query db and handle error if not found 
        const deleted = await pool.query("delete from envelope where id = $1 returning *", [req.params.envelopeId]);
        if (deleted.rows.length === 0) {
            console.log('Envelope not found');
            return res.status(404).send(`Error: envelope with the provided id of ${req.params.envelopeId} does not exist`);
        }
        // send response
        res.status(200).send(deleted.rows);
        console.log(`Envelope with id = ${req.params.envelopeId} was deleted successfully`);
    } catch (e) {
        console.log(e);
        return res.status(500).send;
    }
}
// done
const createEnv = async (req, res) => {
    try {
        const name = req.query.name;
        const budget = req.query.budget;
        // validate input number and name
        if (nameInputValidate(name) === false || isNaN(budget)) {
            return res.status(400).send('Error: Please enter a valid name and budget.')
        }
        // query db
        const created = await pool.query("insert into envelope(name, budget) values ($1, $2) returning *", [name, budget]);
        // send response
        res.status(201).send(created.rows);
        console.log(`Envelope with id = ${created.rows[0].id} was created successfully`);
    } catch (e) {
        console.log(e);
        return res.status(500).send;
    }
}
// done
const addBudget = async (req, res) => {
    try {
        const id = req.params.envelopeId;
        const toAdd = req.query.amount;
        // validate input numbers
        if (isNaN(id) || isNaN(toAdd)) {
            return res.status(400).send('Error: Could not add to budget. Please enter valid numbers for the envelope id and/or amount to add.')
        }
        // query db and handle error if not found 
        const updated = await pool.query("update envelope set budget = (budget + $1) where id = $2 returning *", [toAdd, req.params.envelopeId]);
        if (updated.rows.length === 0) {
            console.log('Envelope not found');
            return res.status(404).send(`Error: envelope with the provided id of ${req.params.envelopeId} does not exist`);
        }
        // send response
        res.status(200).send(updated.rows);
        console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`);
    } catch (e) {
        console.log(e);
        return res.status(500).send;
    }   
}
// done
const subtractBudget = async (req, res) => {
    try {
        const id = req.params.envelopeId;
        const toSubtract = req.query.amount;
        // validate input numbers
        if (isNaN(id) || isNaN(toSubtract)) {
            return res.status(400).send('Error: Could not subtract from budget. Please enter valid numbers for the envelope id and/or amount to subtract.')
        }
        // query db and handle error if not found 
        const updated = await pool.query("update envelope set budget = (budget - $1) where id = $2 returning *", [toSubtract, req.params.envelopeId]);
        if (updated.rows.length === 0) {
            console.log('Envelope not found');
            return res.status(404).send(`Error: envelope with the provided id of ${req.params.envelopeId} does not exist`);
        }
        // send response
        console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`)
        res.status(200).send(updated.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).send;
    }   
}

const transfer = async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const amount = req.query.amount;
    //make this into a transaction, 2 queries
    try {
        if (isNan(from) || isNan(to) || isNaN(amount)) {
            res.status(400).send(`Error: Could not transfer. Please enter valid numbers for from, to, and amount.`)
        }

        // query db and handle error if not found 
        const updatedFrom = await pool.query("update envelope set budget = (budget - $1) where id = $2 returning *", [amount, from]);
        const updatedTo = await pool.query("update envelope set budget = (budget + $1) where id = $2 returning *", [amount, to]);
        if (updatedTo.rows.length === 0 || updatedFrom.rows.length === 0) {
            console.log('Envelope not found');
            return res.status(404).send(`Error: Could not transfer because envelope does not exist`);
        }
        // send response
        res.status(200).json(updatedTo.rows);
        console.log('Transfer successful');

    } catch (e) {
        console.log(e);
        return res.status(500).send;
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