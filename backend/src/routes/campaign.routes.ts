import { Router } from "express";
import { findCampaigns } from "../controllers/campaign.controller";

const router = Router();

router.get("", findCampaigns);

export const campaignRoutes = router;
