import { Router } from "express";
import {
  findCampaigns,
  getCampaign,
  updateCampaign,
} from "../controllers/campaign.controller";

const router = Router();

router.get("", findCampaigns);
router.get("/:id", getCampaign);
router.patch("/:id", updateCampaign);

export const campaignRoutes = router;
