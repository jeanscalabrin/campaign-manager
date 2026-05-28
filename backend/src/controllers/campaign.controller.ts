import type { Request, Response } from "express";
import type { Campaign } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";
import z from "zod";
import { Prisma } from "../../generated/prisma/client";

const createCampaignSchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  regulationDescription: z.string().min(3).max(3000),
  status: z.enum(["DRAFT", "ACTIVE", "PAUSED"]),
});

const updateCampaignSchema = createCampaignSchema.partial();

export async function createCampaign(req: Request, res: Response) {
  const body = createCampaignSchema.parse(req.body);
  const { name, slug, status, regulationDescription } = body;

  try {
    const campaign = await prisma.campaign.create({
      data: {
        name,
        slug,
        status,
        regulationDescription,
      },
    });

    return res.status(201).json(campaign);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "Slug already exists",
      });
    }
  }
}

export async function findCampaigns(req: Request, res: Response) {
  const campaigns: Campaign[] = await prisma.campaign.findMany({
    orderBy: { updatedAt: "desc" },
  });
  res.json(campaigns);
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
  const data: Prisma.CampaignUpdateInput = updateCampaignSchema.parse(req.body);
  console.log(data);

  if (!id) {
    return res.status(400).json({
      message: "id is required",
    });
  }

  try {
    const campaign = await prisma.campaign.update({
      where: { id: id as string },
      data,
    });

    return res.json(campaign);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "Slug already exists",
      });
    }
  }
}

export async function uploadRegulationPdf(req: Request, res: Response) {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: "File not found" });
  }

  const regulationFileUrl = `/uploads/${req.file.filename}`;

  const campaign = await prisma.campaign.update({
    where: { id: id as string },
    data: { regulationFileUrl },
  });

  return res.json(campaign);
}

export async function uploadInstructionPdf(req: Request, res: Response) {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: "File not found" });
  }

  const instructionFileUrl = `/uploads/${req.file.filename}`;

  const campaign = await prisma.campaign.update({
    where: { id: id as string },
    data: { instructionFileUrl },
  });

  return res.json(campaign);
}
