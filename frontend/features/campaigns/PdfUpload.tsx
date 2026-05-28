"use client";
import { useRef, useState } from "react";
import { Campaign } from "@/types/campaign";
import { uploadRegulationPdf, uploadInstructionPdf } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { File } from "lucide-react";

type Props = {
  campaign: Campaign;
  onUpdate: (updated: Campaign) => void;
};

type UploadState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: UploadState = {
  loading: false,
  success: false,
  error: null,
};

export function PdfUpload({ campaign, onUpdate }: Props) {
  const regulationRef = useRef<HTMLInputElement>(null);
  const instructionRef = useRef<HTMLInputElement>(null);
  const [regulationState, setRegulationState] =
    useState<UploadState>(initialState);
  const [instructionState, setInstructionState] =
    useState<UploadState>(initialState);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "regulation" | "instruction",
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const setState =
      type === "regulation" ? setRegulationState : setInstructionState;
    const ref = type === "regulation" ? regulationRef : instructionRef;

    if (file.type !== "application/pdf") {
      setState({
        loading: false,
        success: false,
        error: "Apenas arquivos PDF são aceitos",
      });
      return;
    }

    setState({ loading: true, success: false, error: null });

    try {
      const updated =
        type === "regulation"
          ? await uploadRegulationPdf(campaign.id, file)
          : await uploadInstructionPdf(campaign.id, file);
      onUpdate(updated);
      setState({ loading: false, success: true, error: null });
    } catch (err: any) {
      setState({ loading: false, success: false, error: err.message });
    } finally {
      if (ref.current) ref.current.value = "";
    }
  }

  function renderPdfField(
    label: string,
    fileUrl: string | null,
    state: UploadState,
    ref: React.RefObject<HTMLInputElement>,
    type: "regulation" | "instruction",
  ) {
    return (
      <div className="flex flex-col gap-3">
        <Label>{label}</Label>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-6">
            {fileUrl ? (
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}${fileUrl}`}
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
              ref={ref}
              type="file"
              accept="application/pdf"
              onChange={(e) => handleUpload(e, type)}
              className="hidden"
            />
            <Button
              variant="outline"
              disabled={state.loading}
              onClick={() => ref.current?.click()}
            >
              {state.loading
                ? "Enviando..."
                : fileUrl
                  ? "Substituir PDF"
                  : "Enviar PDF"}
            </Button>
          </CardContent>
        </Card>
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        {state.success && (
          <p className="text-sm text-green-600">PDF enviado com sucesso!</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {renderPdfField(
        "PDF de regulamento",
        campaign.regulationFileUrl,
        regulationState,
        regulationRef,
        "regulation",
      )}
      {renderPdfField(
        "PDF de instruções",
        campaign.instructionFileUrl,
        instructionState,
        instructionRef,
        "instruction",
      )}
    </div>
  );
}
