export type CampaignStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "FINISHED";

export type Campaign = {
  id: string;
  name: string;
  slug: string;
  status: CampaignStatus;
  regulationDescription: string;
  regulationFileUrl: string | null;
  instructionFileUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
