import { Campaign } from "@/types/campaign";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCampaigns(): Promise<Campaign[]> {
  const res = await fetch(`${API_URL}/campaigns`);
  if (!res.ok) throw new Error("Erro ao carregar campanhas");
  return res.json();
}

export async function fetchCampaign(id: string): Promise<Campaign> {
  const res = await fetch(`${API_URL}/campaigns/${id}`);
  if (!res.ok) throw new Error("Erro ao carregar campanha");
  return res.json();
}

export async function createCampaign(
  data: Pick<Campaign, "name" | "slug" | "regulationDescription" | "status">,
): Promise<Campaign> {
  const res = await fetch(`${API_URL}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar/atualizar campanha");
  return res.json();
}

export async function updateCampaign(
  id: string,
  data: Partial<
    Pick<Campaign, "name" | "slug" | "regulationDescription" | "status">
  >,
): Promise<Campaign> {
  const res = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar/atualizar campanha");
  return res.json();
}

export async function uploadRegulationPdf(
  id: string,
  file: File,
): Promise<Campaign> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/campaigns/${id}/regulation-pdf`, {
    method: "PATCH",
    body: formData,
  });
  if (!res.ok) throw new Error("Erro ao fazer upload do PDF");
  return res.json();
}
