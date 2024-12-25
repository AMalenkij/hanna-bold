import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SubHeader from "@/components/subHeader";
import ConcertImg from "@/public/img/concert_hero.jpg";
import { prisma } from "@/utils/prisma";
import splitTimestamp from "@/utils/splitTimestamp";
import Image from "next/image";
import ConcertCard from "./concertCard";

export default async function Home() {
  const today = new Date();
  const totalConcerts = await prisma.concert.count();
  const futureConcerts = await prisma.concert.findMany({
    where: {
      date: {
        gte: today, // сравнение с объектом Date
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const pastConcerts = await prisma.concert.findMany({
    where: {
      date: {
        lt: today, // сравнение с объектом Date
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return (
    <div className="mx-auto">
      <Image
        className="-z-20 relative w-full bg-cover"
        alt="Concert Photo"
        src={ConcertImg}
      />
      {/* Red layer over background */}
      <div className="-z-10 absolute inset-0 bg-red-700 mix-blend-multiply" />
      <SubHeader
        sectionName="some concerts"
        title="Concerts"
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
            <h3 className="text-xl md:text-2xl">FUTURES</h3>
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
              <p>В данный момент нет запланированных концертов.</p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Past">
          <AccordionTrigger>
            <h3 className="text-xl md:text-2xl">PAST</h3>
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
