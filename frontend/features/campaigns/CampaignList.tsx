"use client";

import Link from "next/link";
import { Campaign, CampaignStatus } from "@/types/campaign";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const statusConfig: Record<
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

type CampaignListParams = {
  campaigns: Campaign[];
};

export default function CampaignList({ campaigns = [] }: CampaignListParams) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Campanhas</h1>

      {campaigns.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma campanha encontrada.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {campaigns.map((campaign) => {
            const status = statusConfig[campaign.status] ?? {
              label: campaign.status,
              variant: "outline" as const,
            };
            return (
              <Card key={campaign.id}>
                <CardContent className="flex items-start justify-between gap-4 pt-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-semibold truncate">
                        {campaign.name}
                      </h2>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      /{campaign.slug}
                    </p>
                    <p className="text-sm line-clamp-2">
                      {campaign.regulationDescription}
                    </p>
                  </div>
                  <Button asChild size="sm" className="shrink-0">
                    <Link href={`/campaigns/${campaign.id}`}>Gerenciar</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
