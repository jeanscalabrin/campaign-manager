"use client";

import { useState } from "react";
import { Campaign, CampaignStatus } from "@/types/campaign";
import { createCampaign, updateCampaign } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusConfig } from "./constants";
import { useRouter } from "next/navigation";

type Props = {
  campaign?: Campaign;
  onUpdate?: (updated: Campaign) => void;
};

export function CampaignForm({ campaign, onUpdate }: Props) {
  const [name, setName] = useState(campaign?.name ?? "");
  const [slug, setSlug] = useState(campaign?.slug ?? "");
  const [description, setDescription] = useState(
    campaign?.regulationDescription ?? "",
  );
  const [status, setStatus] = useState<CampaignStatus>(
    campaign?.status ?? "DRAFT",
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      const updated = campaign
        ? await updateCampaign(campaign.id, {
            name,
            slug,
            regulationDescription: description,
            status,
          })
        : await createCampaign({
            name,
            slug,
            regulationDescription: description,
            status,
          });

      if (campaign && onUpdate) {
        onUpdate(updated);
      } else {
        router.push(`/campaigns/${updated.id}`);
      }
      setSuccess(true);
    } catch (err: any) {
      console.log(error);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as CampaignStatus)}
          className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring"
        >
          {Object.entries(statusConfig).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Descrição do regulamento</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={3000}
          rows={5}
        />
        <p className="text-xs text-muted-foreground text-right">
          {description.length}/3000
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-green-600">Salvo com sucesso!</p>}

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </div>
  );
}
