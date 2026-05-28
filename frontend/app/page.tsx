"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCampaigns } from "@/lib/api";
import { Campaign, CampaignStatus } from "@/types/campaign";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CampaignList from "@/features/campaigns/CampaignList";

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

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns()
      .then(setCampaigns)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando campanhas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return <CampaignList campaigns={campaigns} />;
}
