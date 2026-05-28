import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignForm } from "@/features/campaigns/CampaignForm";
import Link from "next/link";

export default function CampaignNewPage() {
  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">← Voltar</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dados gerais</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
          <CampaignForm />
        </CardContent>
      </Card>
    </main>
  );
}
