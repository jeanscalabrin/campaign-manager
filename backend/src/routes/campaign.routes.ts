import { Router } from "express";
import {
  createCampaign,
  findCampaigns,
  getCampaign,
  updateCampaign,
} from "../controllers/campaign.controller";

const router = Router();

router.get("", findCampaigns);
router.get("/:id", getCampaign);
router.post("", createCampaign);
router.patch("/:id", updateCampaign);

export const campaignRoutes = router;
