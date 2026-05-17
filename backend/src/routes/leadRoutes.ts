import express from "express";

import {
  createLead,
  deleteLead,
  getLead,
  getLeads,
  updateLead,
} from "../controllers/leadController";

import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getLeads);

router.get("/:id", getLead);

router.post(
  "/",
  roleMiddleware("admin", "sales"),
  createLead
);

router.put(
  "/:id",
  roleMiddleware("admin", "sales"),
  updateLead
);

router.delete(
  "/:id",
  roleMiddleware("admin", "sales"),
  deleteLead
);

export default router;