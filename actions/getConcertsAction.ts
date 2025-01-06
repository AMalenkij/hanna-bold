import { prisma } from "@/utils/prisma";

export const getConcertsAction = async () => {
  const today = new Date();

  const [futureConcerts, pastConcerts, futureConcertsCount, pastConcertsCount] =
    await Promise.all([
      prisma.concert.findMany({
        where: { date: { gte: today } },
        orderBy: { date: "asc" },
      }),
      prisma.concert.findMany({
        where: { date: { lt: today } },
        orderBy: { date: "desc" }, // Changed to desc for past concerts
      }),
      prisma.concert.count({
        where: { date: { gte: today } },
      }),
      prisma.concert.count({
        where: { date: { lt: today } },
      }),
    ]);

  return {
    futureConcerts,
    pastConcerts,
    futureConcertsCount,
    pastConcertsCount,
    totalConcerts: futureConcertsCount + pastConcertsCount,
  };
};
