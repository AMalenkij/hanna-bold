import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

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
        orderBy: { date: "desc" },
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

export const getConcertsActionCached = unstable_cache(getConcertsAction);
