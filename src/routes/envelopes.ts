import express from "express";

const envRouter = express.Router();

import {
  getAll,
  getEnvById,
  updateEnv,
  deleteEnvById,
  createEnv,
  addBudget,
  subtractBudget,
  transfer,
} from "../db/index";

envRouter.get("/", getAll);

envRouter
  .route("/:envelopeId")
  .get(getEnvById)
  .put(updateEnv)
  .delete(deleteEnvById);

envRouter.post("/new", createEnv);

envRouter.post("/:envelopeId/add", addBudget);

envRouter.post("/:envelopeId/subtract", subtractBudget);

envRouter.post("/transfer", transfer);

export default envRouter;
