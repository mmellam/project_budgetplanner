import express from "express";
const transfersRouter = express.Router();
import { getTransfers, getTransferById } from "../db/index";

transfersRouter.get("/", getTransfers);

transfersRouter.get("/:transferId", getTransferById);

export default transfersRouter;
