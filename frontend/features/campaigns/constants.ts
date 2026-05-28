import { CampaignStatus } from "@/types/campaign";

export const statusConfig: Record<
  CampaignStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  DRAFT: { label: "Rascunho", variant: "secondary" },
  ACTIVE: { label: "Ativa", variant: "default" },
  PAUSED: { label: "Pausada", variant: "outline" },
  FINISHED: { label: "Encerrada", variant: "destructive" },
};
