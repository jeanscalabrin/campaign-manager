"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Campaign } from "@/types/campaign";
import { fetchCampaign } from "@/lib/api";
// import { CampaignForm } from "@/components/campaigns/CampaignForm";
// import { PdfUpload } from "@/components/campaigns/PdfUpload";
import { CampaignDetail } from "@/features/campaigns/CampaignDetail";

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaign(id)
      .then(setCampaign)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando campanha...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">{error ?? "Campanha não encontrada"}</p>
      </div>
    );
  }

  return <CampaignDetail campaign={campaign} setCampaign={setCampaign} />;
}
