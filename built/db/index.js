// const { Pool } = require('pg');
// const pool = new Pool({
//     user: process.env.PG_USER,
//     password: process.env.PG_PW,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DB
// });
// // Envelopes router
// const getAll = async (req, res) => {
//     try {
//         const result = await pool.query("select * from envelope order by id");
//         res.status(200).send(result.rows);
//         console.log("GET all successful");
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// };
// const getEnvById = async (req, res) => {
//     try {
//         // validate input number
//         if (isNaN(req.params.envelopeId)) {
//             return res.status(400).send('Error: Please enter a valid number for the envelope id.')
//         }
//         // query db and handle error if not found
//         const result = await pool.query("select * from envelope where id = $1", [req.params.envelopeId]);
//         if (result.rows.length === 0) {
//             console.log('Envelope not found');
//             return res.status(404).send(`Error: envelope with the provided id of ${req.params.envelopeId} does not exist`);
//         }
//         // send response
//         res.send(result.rows);
//         console.log("GET env by id successful");
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// };
// const updateEnv = async (req, res) => {
//     try {
//         const id = req.params.envelopeId;
//         const budget = req.query.budget;
//         const name = req.query.name;
//         let updated = [];
//         if (budget && name) {
//             // validate input numbers and name and query db
//             if (isNaN(id) || isNaN(budget) || budget < 0|| nameInputValidate(name) === false) {
//             return res.status(400).send('Error: Please enter valid inputs for id, name, and budget.')
//             }
//             updated = await pool.query("update envelope set name = $1, budget = $2 where id = $3 returning *", [name, budget, id]);
//         } else if (!name) {
//             // validate input numbers and name and query db
//             if (isNaN(id) || isNaN(budget)) {
//                 return res.status(400).send('Error: Please enter valid inputs for id and budget.')
//             }
//             updated = await pool.query("update envelope set budget = $1 where id = $2 returning *", [budget, id]);
//         } else {
//             // validate input numbers and name and query db
//             if (isNaN(id) || nameInputValidate(name) === false) {
//                 return res.status(400).send('Error: Please enter valid inputs for id and name.')
//             }
//             updated = await pool.query("update envelope set name = $1 where id = $2 returning *", [name, id]);
//         }
//         // handle error if not found
//         if (updated.rows.length === 0) {
//             console.log('Envelope not found');
//             return res.status(404).send(`Error: envelope with the provided id of ${req.params.envelopeId} does not exist`);
//         }
//         // send response
//         res.status(200).send(updated.rows);
//         console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// };
// const deleteEnvById = async (req, res) => {
//     try {
//         // validate input number
//         if (isNaN(req.params.envelopeId)) {
//             return res.status(400).send('Error: Please enter a valid number for the envelope id.')
//         }
//         // query db and handle error if not found
//         const deleted = await pool.query("delete from envelope where id = $1 returning *", [req.params.envelopeId]);
//         if (deleted.rows.length === 0) {
//             console.log('Envelope not found');
//             return res.status(404).send(`Error: envelope with the provided id of ${req.params.envelopeId} does not exist`);
//         }
//         // send response
//         res.status(200).send(deleted.rows);
//         console.log(`Envelope with id = ${req.params.envelopeId} was deleted successfully`);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// };
// const createEnv = async (req, res) => {
//     try {
//         const name = req.query.name;
//         const budget = req.query.budget;
//         // validate input number and name
//         if (nameInputValidate(name) === false || isNaN(budget) || budget < 0) {
//             return res.status(400).send('Error: Please enter a valid name and budget.')
//         }
//         // query db
//         const created = await pool.query("insert into envelope(name, budget) values ($1, $2) returning *", [name, budget]);
//         // send response
//         res.status(201).send(created.rows);
//         console.log(`Envelope with id = ${created.rows[0].id} was created successfully`);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// };
// const addBudget = async (req, res) => {
//     try {
//         const id = req.params.envelopeId;
//         const toAdd = req.query.amount;
//         // validate input numbers
//         if (isNaN(id) || isNaN(toAdd) || toAdd < 0) {
//             return res.status(400).send('Error: Could not add to budget. Please enter valid numbers for the envelope id and amount to add.')
//         }
//         // query db and handle error if not found
//         const updated = await pool.query("update envelope set budget = (budget + $1) where id = $2 returning *", [toAdd, id]);
//         if (updated.rows.length === 0) {
//             console.log('Envelope not found');
//             return res.status(404).send(`Error: envelope with the provided id of ${id} does not exist`);
//         }
//         // send response
//         res.status(200).send(updated.rows);
//         console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// };
// const subtractBudget = async (req, res) => {
//     try {
//         const id = req.params.envelopeId;
//         const toSubtract = req.query.amount;
//         // validate input numbers
//         if (isNaN(id) || isNaN(toSubtract) || toSubtract < 0) {
//             return res.status(400).send('Error: Could not subtract from budget. Please enter valid numbers for the envelope id and amount to subtract.')
//         }
//         // query db and handle error if not found
//         const updated = await pool.query("update envelope set budget = (budget - $1) where id = $2 returning *", [toSubtract, id]);
//         if (updated.rows.length === 0) {
//             console.log('Envelope not found');
//             return res.status(404).send(`Error: envelope with the provided id of ${id} does not exist`);
//         }
//         // send response
//         console.log(`Envelope with id = ${updated.rows[0].id} was updated successfully`)
//         res.status(200).send(updated.rows);
//     } catch (e) {
//         console.log(e);
//         // error message for budget constraint violation in db
//         if (e.constraint === 'envelope_budget_check') {
//             return res.status(400).send(`Error: Cannot subtract the given amount. Budget cannot become negative.`);
//         }
//         res.status(500).send();
//     }
// };
// const transfer = async (req, res) => {
//     const from = req.query.from;
//     const to = req.query.to;
//     const amount = req.query.amount;
//     try {
//         // validate input numbers
//         if (isNaN(amount) || isNaN(from) || isNaN(to) || amount < 0) {
//             return res.status(400).send(`Error: Could not transfer. Please enter valid numbers for from, to, and amount.`)
//         }
//         // query db with a transaction and handle error if not found
//         await pool.query("begin");
//         const updatedFrom = await pool.query("update envelope set budget = (budget - $1) where id = $2 returning *", [amount, from]);
//         const updatedTo = await pool.query("update envelope set budget = (budget + $1) where id = $2 returning *", [amount, to]);
//         if (updatedTo.rows.length === 0 || updatedFrom.rows.length === 0) {
//             await pool.query("rollback");
//             console.log('Envelope not found');
//             return res.status(404).send(`Error: Could not transfer because envelope does not exist.`);
//         }
//         //writeTransfer(from, to, amount);
//         await pool.query("insert into transfer(amount, sender_id, recipient_id) values($1, $2, $3)", [amount, from, to]);
//         await pool.query("commit");
//         // send response
//         res.status(200).json(updatedTo.rows);
//         console.log('Transfer successful');
//     } catch (e) {
//         await pool.query("rollback");
//         console.log(e);
//         // error message for budget constraint violation in db
//         if (e.constraint === 'envelope_budget_check') {
//             return res.status(400).send(`Error: Cannot transfer the given amount. Budget cannot become negative.`);
//         }
//         res.status(500).send();
//     }
// };
// // Transfers router
// const getTransfers = async (req, res) => {
//     try {
//         const result = await pool.query("select * from transfer order by id");
//         if (result.rows.length === 0) {
//             console.log('No transfer records found');
//             return res.status(404).send(`Error: no transfer records found`);
//         }
//         res.status(200).send(result.rows);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// };
// const getTransferById = async (req, res) => {
//     try {
//         // validate input id
//         if (isNaN(req.params.transferId)) {
//             return res.status(400).send(`Error: Please enter a valid number for the transfer record id.`)
//         }
//         const result = await pool.query("select * from transfer where id = $1", [req.params.transferId]);
//         if (result.rows.length === 0) {
//             console.log('No transfer record found');
//             return res.status(404).send(`Error: transfer record with the provided id of ${req.params.transferId} does not exist`);
//         }
//         res.status(200).send(result.rows);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// };
// // Helper function for name validation
// const nameInputValidate = (input) => {
//     const regex = /^\w+$/g;
//     if (!regex.test(input)) {
//         return false;
//     } else {
//         return true;
//     }
// }
// module.exports = {
//     getAll,
//     getEnvById,
//     updateEnv,
//     deleteEnvById,
//     createEnv,
//     addBudget,
//     subtractBudget,
//     transfer,
//     getTransfers,
//     getTransferById
// };
