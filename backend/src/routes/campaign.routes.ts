import { Router } from "express";
import {
  createCampaign,
  findCampaigns,
  getCampaign,
  updateCampaign,
  uploadRegulationPdf,
} from "../controllers/campaign.controller";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("", findCampaigns);
router.post("", createCampaign);
router.get("/:id", getCampaign);
router.patch("/:id", updateCampaign);
router.patch("/:id/regulation-pdf", upload.single("file"), uploadRegulationPdf);
// router.patch(
//   "/:id/instruction-pdf",
//   upload.single("file"),
//   uploadInstructionPdf,
// );

export const campaignRoutes = router;
