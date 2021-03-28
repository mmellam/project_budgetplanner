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
})
envRouter.post('/:envelopeId/subtract', (req, res) => {
    const envelopeId = req.params.envelopeId;
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
