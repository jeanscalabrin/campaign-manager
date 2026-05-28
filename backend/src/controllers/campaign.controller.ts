import type { Request, Response } from "express";
import type { Campaign } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";

export async function findCampaigns(
  req: Request,
  res: Response,
): Promise<void> {
  const campaigns: Campaign[] = await prisma.campaign.findMany();
  res.json(campaigns);
}

export async function createCampaign(req: Request, res: Response) {
  const { name, slug, status, regulationDescription } = req.body;

  const campaign = await prisma.campaign.create({
    data: {
      name,
      slug,
      status,
      regulationDescription,
    },
  });

  return res.status(201).json(campaign);
}

export async function getCampaign(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "id is required",
    });
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: id as string },
  });

  if (!campaign)
    return res.status(404).json({
      message: "Campaign not found!",
    });

  res.json(campaign);
}

export async function updateCampaign(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "id is required",
    });
  }

  const campaign = await prisma.campaign.update({
    where: { id: id as string },
    data: req.body,
  });

  return res.json(campaign);
}
