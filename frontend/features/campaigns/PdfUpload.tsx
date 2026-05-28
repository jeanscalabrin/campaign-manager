"use client";

import { useRef, useState } from "react";
import { Campaign } from "@/types/campaign";
import { uploadRegulationPdf } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { EyeIcon, File } from "lucide-react";

type Props = {
  campaign: Campaign;
  onUpdate: (updated: Campaign) => void;
};

export function PdfUpload({ campaign, onUpdate }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Apenas arquivos PDF são aceitos");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const updated = await uploadRegulationPdf(campaign.id, file);
      onUpdate(updated);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Label>PDF de regulamento</Label>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-6">
          {campaign.regulationFileUrl ? (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}${campaign.regulationFileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <File className="size-4" />
                Abrir PDF
              </a>
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum arquivo enviado
            </p>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
          />

          <Button
            variant="outline"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
          >
            {loading
              ? "Enviando..."
              : campaign.regulationFileUrl
                ? "Substituir PDF"
                : "Enviar PDF"}
          </Button>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">PDF enviado com sucesso!</p>
      )}
    </div>
  );
}
