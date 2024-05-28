import { Router } from "express";
import {
  getAllLogs,
  deleteStatusLogById,
} from "../controllers/statusHistory.controller.js";

const statusHistoryRouter = Router();

statusHistoryRouter.get("/", getAllLogs);
statusHistoryRouter.delete("/:sid", deleteStatusLogById);

export default statusHistoryRouter;
