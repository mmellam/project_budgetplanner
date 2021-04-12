const express = require('express');
const envRouter = express.Router();
const { getAll,
        getEnvById,
        updateEnv,
        deleteEnvById
                    } = require('../db/index');


envRouter.get('/', getAll);

envRouter.route('/:envelopeId')
    .get(getEnvById)
    .put(updateEnv)
    .delete(deleteEnvById);

envRouter.post('/new', (req, res) => {
    const id = req.query.id;
    const title = req.query.title;
    const budget = Number(req.query.budget);
    if (!account[0][id]) {
        account[0][id] = {
            title: title,
            budget: budget
        }
        res.status(201).send(`New envelope created: Id ${id}, title ${account[0][id].title}, budget ${account[0][id].budget}`);
    } else {
        res.send(`This envelope with ID ${id} already exists. Content: title ${account[0][id].title}, budget ${account[0][id].budget}.
        To update its budget, please send a put request.
        To create a new envelope, increase the id number.`)
    }
})

envRouter.post('/:envelopeId/add', (req, res) => {
    const toAdd = Number(req.query.amount);
    if (isNaN(toAdd)) {
        res.status(400).send(`Please enter a valid number as amount`)
    } else {
        account[0][req.envelopeId].budget += toAdd;
        res.status(200).send(`Envelope with ID of ${req.envelopeId} and title ${account[0][req.envelopeId].title}: after adding ${toAdd}, the new budget is ${account[0][req.envelopeId].budget}`);
    }
})
envRouter.post('/:envelopeId/subtract', (req, res) => {
    const toSubtract = Number(req.query.amount);

    if (isNaN(toSubtract)) {
        res.status(400).send(`Please enter a valid number as amount`)
    } else {
        account[0][req.envelopeId].budget -= toSubtract;
        res.status(200).send(`Envelope with ID of ${req.envelopeId} and title ${account[0][req.envelopeId].title}: after subtracting ${toSubtract}, the new budget is ${account[0][req.envelopeId].budget}`);
    }
})

envRouter.post('/transfer', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const amount = Number(req.query.amount);

    if (!account[0][from] || !account[0][to] || isNaN(amount)) {
        res.status(400).send(`Please enter valid IDs and/or valid amount`)
    } else {
        account[0][from].budget -= amount;
        account[0][to].budget += amount;

        res.send(`Updated budget in env ${from}: ${account[0][from].budget}\n
        Updated budget in env ${to}: ${account[0][to].budget}`)
    }
})

module.exports = envRouter;