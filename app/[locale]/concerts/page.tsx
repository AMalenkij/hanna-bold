import { getConcertsAction } from "@/actions/getConcertsAction";
import SubHeader from "@/components/subHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ConcertImg from "@/public/img/concert_hero.jpg";
import splitTimestamp from "@/utils/splitTimestamp";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { AddConcertButton } from "./addConcertButton";
import ConcertCard from "./concertCard";
import { ConcertFormDialog } from "./concertFormDialog";
import { DeleteConcertButton } from "./deleteConcertButton";
import { EditConcertButton } from "./editConcertButton";
import ProtectPage from "@/components/protectPage";
import RedLayer from "@/components/redLayer";

export default async function Concerts() {
  const {
    futureConcerts,
    pastConcerts,
    futureConcertsCount,
    pastConcertsCount,
    totalConcerts,
  } = await getConcertsAction();

  const t = await getTranslations("Concerts");

  return (
    <div className="mx-auto">
      <div className="relative h-[55vh]">
        <div className="-z-20 absolute aspect-[16/9] h-[55vh] w-full overflow-hidden rounded-lg bg-cover">
          <Image
            className="-z-20 relative h-full w-full bg-cover object-cover"
            alt="Concert Photo"
            src={ConcertImg}
          />
        </div>
        <RedLayer />
      </div>
      <ProtectPage>
        <ConcertFormDialog />
      </ProtectPage>
      <SubHeader
        title={t("subHeader")}
        counter={totalConcerts}
        variant="withСounter"
      />
      <ProtectPage>
        <AddConcertButton />
      </ProtectPage>
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
                  link={concert.link}
                >
                  <ProtectPage>
                    <DeleteConcertButton concert={concert} />
                    <EditConcertButton concert={concert} />
                  </ProtectPage>
                </ConcertCard>
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
                link={concert.link}
              >
                <ProtectPage>
                  <DeleteConcertButton concert={concert} />
                  <EditConcertButton concert={concert} />
                </ProtectPage>
              </ConcertCard>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
