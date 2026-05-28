import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.campaign.create({
    data: {
      name: "Black Friday 2026",
      slug: "black-friday-2026",
      status: "DRAFT",
      regulationDescription: "Campanha da Black Friday",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
