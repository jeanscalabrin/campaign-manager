"use client";

import Link from "next/link";
import { Campaign } from "@/types/campaign";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { statusConfig } from "./constants";
import { DownloadIcon, EyeIcon, File } from "lucide-react";

type CampaignListParams = {
  campaigns: Campaign[];
};

export default function CampaignList({ campaigns = [] }: CampaignListParams) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Campanhas</h1>
        <Button asChild size="sm">
          <Link href="/campaigns/new">Nova campanha</Link>
        </Button>
      </div>

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
                  <div className="flex items-center gap-2 shrink-0">
                    {campaign.regulationFileUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL}${campaign.regulationFileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <File className="size-4" />
                          Regulação PDF
                        </a>
                      </Button>
                    )}

                    {campaign.instructionFileUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL}${campaign.instructionFileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <File className="size-4" />
                          Instrução PDF
                        </a>
                      </Button>
                    )}
                    <Button asChild size="sm">
                      <Link href={`/campaigns/${campaign.id}`}>Gerenciar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
