import { Router } from "express";
import {
  createCampaign,
  findCampaigns,
  getCampaign,
  updateCampaign,
} from "../controllers/campaign.controller";

const router = Router();

router.get("", findCampaigns);
router.post("", createCampaign);
router.get("/:id", getCampaign);
router.patch("/:id", updateCampaign);

export const campaignRoutes = router;
