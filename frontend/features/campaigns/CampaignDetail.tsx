import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/types/campaign";
import Link from "next/link";
import { statusConfig } from "./constants";
import { CampaignForm } from "./CampaignForm";
import { PdfUpload } from "./PdfUpload";

type CampaignDetailParams = {
  campaign: Campaign;
  setCampaign: (updated: Campaign) => void;
};

export function CampaignDetail({
  campaign,
  setCampaign,
}: CampaignDetailParams) {
  const status = statusConfig[campaign.status] ?? {
    label: campaign.status,
    variant: "outline" as const,
  };
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">← Voltar</Link>
        </Button>
        <h1 className="text-2xl font-bold">{campaign.name}</h1>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dados gerais</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Slug:</span>{" "}
            {campaign.slug}
          </p>
          <p>
            <span className="font-medium text-foreground">Criado em:</span>{" "}
            {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}
          </p>
          <p>
            <span className="font-medium text-foreground">Atualizado em:</span>{" "}
            {new Date(campaign.updatedAt).toLocaleDateString("pt-BR")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Descrição</CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignForm campaign={campaign} onUpdate={setCampaign} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <PdfUpload campaign={campaign} onUpdate={setCampaign} />
        </CardContent>
      </Card>
    </main>
  );
}
