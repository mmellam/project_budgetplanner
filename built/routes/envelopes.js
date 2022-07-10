"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envRouter = void 0;
var express_1 = __importDefault(require("express"));
exports.envRouter = express_1.default.Router();
// const {
//   getAll,
//   getEnvById,
//   updateEnv,
//   deleteEnvById,
//   createEnv,
//   addBudget,
//   subtractBudget,
//   transfer,
// } = require("../db/index");
// envRouter.get("/", getAll);
// envRouter
//   .route("/:envelopeId")
//   .get(getEnvById)
//   .put(updateEnv)
//   .delete(deleteEnvById);
// envRouter.post("/new", createEnv);
// envRouter.post("/:envelopeId/add", addBudget);
// envRouter.post("/:envelopeId/subtract", subtractBudget);
// envRouter.post("/transfer", transfer);
//export default envRouter;
//module.exports = envRouter;
