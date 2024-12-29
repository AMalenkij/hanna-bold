import SubHeader from "@/components/subHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ConcertImg from "@/public/img/concert_hero.jpg";
import { prisma } from "@/utils/prisma";
import splitTimestamp from "@/utils/splitTimestamp";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ConcertCard from "./concertCard";

export default async function Concerts() {
  const today = new Date();
  const futureConcertsCount = await prisma.concert.count({
    where: {
      date: {
        gte: today,
      },
    },
  });

  const futureConcerts = await prisma.concert.findMany({
    where: {
      date: {
        gte: today,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const pastConcertsCount = await prisma.concert.count({
    where: {
      date: {
        lt: today,
      },
    },
  });

  const pastConcerts = await prisma.concert.findMany({
    where: {
      date: {
        lt: today,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  const totalConcerts = futureConcertsCount + pastConcertsCount;
  const t = await getTranslations("Concerts");

  return (
    <div className="mx-auto">
      <Image
        className="-z-20 relative w-full bg-cover"
        alt="Concert Photo"
        src={ConcertImg}
      />
      <div className="-z-10 absolute inset-0 bg-red-700 mix-blend-multiply" />
      <SubHeader
        title={t("subHeader")}
        counter={totalConcerts}
        variant="withСounter"
      />
      <Accordion
        type="single"
        className="w-full px-6"
        defaultValue="Futures"
        collapsible
      >
        <AccordionItem value="Futures">
          <AccordionTrigger>
            <div className="flex gap-x-1">
              <h3 className="text-xl md:text-2xl ">{t("futures")}</h3>
              <h2 className="font-light text-sm md:text-sm">{`[${futureConcertsCount}]`}</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {futureConcerts && futureConcerts.length > 0 ? (
              futureConcerts.map((concert) => (
                <ConcertCard
                  key={`Future-${concert.id}`}
                  timestamptz={splitTimestamp(concert.date)}
                  title={concert.title}
                  city={concert.city}
                  venueName={concert.venueName}
                  address={concert.address}
                />
              ))
            ) : (
              <p className="ml-3 text-lg">{t("noConcerts")}</p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Past">
          <AccordionTrigger>
            <div className="flex gap-x-1">
              <h3 className="text-xl md:text-2xl ">{t("past")}</h3>
              <h2 className="font-light text-sm md:text-sm">{`[${pastConcertsCount}]`}</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {pastConcerts?.map((concert) => (
              <ConcertCard
                key={`Past-${concert.id}`}
                timestamptz={splitTimestamp(concert.date)}
                title={concert.title}
                city={concert.city}
                venueName={concert.venueName}
                address={concert.address}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
