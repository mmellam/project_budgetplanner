const express = require('express');
const envRouter = express.Router();
const { getAll,
        getEnvById,
        updateEnv,
        deleteEnvById,
        createEnv,
        addBudget,
        subtractBudget,
        transfer } = require('../db/index');


envRouter.get('/', getAll);

envRouter.route('/:envelopeId')
    .get(getEnvById)
    .put(updateEnv)
    .delete(deleteEnvById);

envRouter.post('/new', createEnv);

envRouter.post('/:envelopeId/add', addBudget);

envRouter.post('/:envelopeId/subtract', subtractBudget);

envRouter.post('/transfer', transfer);


module.exports = envRouter;