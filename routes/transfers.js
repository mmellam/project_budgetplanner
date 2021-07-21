const express = require('express');
const transfersRouter = express.Router();
const { getTransfers,
        getTransferById } = require('../db/index');

transfersRouter.get('/', getTransfers);

transfersRouter.get('/:transferId', getTransferById);

// transfersRouter.delete('/:transferId', deleteTransferById);


module.exports = transfersRouter;
