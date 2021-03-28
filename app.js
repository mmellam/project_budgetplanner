const express = require('express');
const app = express();
//const cors = require('cors');

const PORT = 3000;

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
]

//app.use(cors());
app.post('/test', (req, res) => {
    res.send('ok')
})

const envRouter = express.Router();
app.use('/envelopes', envRouter);

envRouter.get('/', (req, res) => {
    res.json(account)
})
envRouter.get('/:envelopeId', (req, res) => {
    const envelopeId = req.params.envelopeId;
    if (account[0][envelopeId]) {   
        res.status(200).send(`Envelope with ID ${envelopeId} has the title ${account[0][envelopeId].title} and a budget of ${account[0][envelopeId].budget}`);
        
    } else {
        res.status(404).send(`No envelope with ID of ${envelopeId}`);
    }
})

envRouter.post('/', (req, res) => {
    const envelopeId = req.query.envelopeId;
    const title = req.query.title;
    const budget = req.query.budget;
    if (!account[0][envelopeId]) {
        account[0][envelopeId] = {
            title: title,
            budget: budget
        }
        res.status(201).send(`New envelope created: Id ${envelopeId}, title ${account[0][envelopeId].title}, budget ${account[0][envelopeId].budget}`);
    } else {
        res.send(`This envelope with ID ${envelopeId} already exists. Content: title ${account[0][envelopeId].title}, budget ${account[0][envelopeId].budget}.
        To update its budget, please send a put request.
        To create a new envelope, increase the id number.`)
    }
})

envRouter.put('/:envelopeId', (req, res) => {
    const envelopeId = req.params.envelopeId;
    const budget = req.query.budget;
    const title = req.query.title;
    
    if (account[0][envelopeId]) { 
        if (budget && title) {
            account[0][envelopeId].budget = budget;
            account[0][envelopeId].title = title;
            res.status(200).send(`Envelope with ID ${envelopeId} was updated with title ${account[0][envelopeId].title} and updated with a budget of ${account[0][envelopeId].budget}`);
        } else if (!title) {
            account[0][envelopeId].budget = budget;
            res.status(200).send(`Envelope with ID ${envelopeId} and title ${account[0][envelopeId].title} was updated with a budget of ${account[0][envelopeId].budget}`);
        } else {
            account[0][envelopeId].title = title;
            res.status(200).send(`Envelope with ID ${envelopeId} was updated with title ${account[0][envelopeId].title} and has a budget of ${account[0][envelopeId].budget}`);
        }     
    } else {
        res.status(404).send(`No envelope with ID of ${envelopeId}`);
    }
})

envRouter.post('/:envelopeId/add', (req, res) => {
    const envelopeId = req.params.envelopeId;
    const toAdd = Number(req.query.amount);
    if (!account[0][envelopeId]) {
        res.status(404).send(`No envelope with ID of ${envelopeId}`);
    } else if (isNaN(toAdd)) {
        res.status(400).send(`Please enter a valid number as amount`)
    } else {
        account[0][envelopeId].budget += toAdd;
        res.status(200).send(`Envelope with ID of ${envelopeId} and title ${account[0][envelopeId].title}: after adding ${toAdd}, the new budget is ${account[0][envelopeId].budget}`);
    }
})
envRouter.post('/:envelopeId/subtract', (req, res) => {
    const envelopeId = req.params.envelopeId;
    const toSubtract = Number(req.query.amount);

    if (!account[0][envelopeId]) {
        res.status(404).send(`No envelope with ID of ${envelopeId}`);
    } else if (isNaN(toSubtract)) {
        res.status(400).send(`Please enter a valid number as amount`)
    } else {
        account[0][envelopeId].budget -= toSubtract;
        res.status(200).send(`Envelope with ID of ${envelopeId} and title ${account[0][envelopeId].title}: after subtracting ${toSubtract}, the new budget is ${account[0][envelopeId].budget}`);
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

envRouter.delete('/:envelopeId', (req, res) => {
    const envelopeId = req.params.envelopeId;

    if (!account[0][envelopeId]) {
        res.status(400).send(`An envelope with ID ${envelopeId} was not found`);
    } else {
        delete account[0][envelopeId];
        res.send(`Envelope with ID ${envelopeId} was successfully deleted`);
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
