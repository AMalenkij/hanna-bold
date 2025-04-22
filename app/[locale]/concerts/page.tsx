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
import ConcertCard from "./concertCard";
import ProtectPage from "@/components/protectPage";
import RedLayer from "@/components/redLayer";
import { PencilLine, Plus, X, AudioLines } from "lucide-react";
import { DialogConcert } from "./dialogConcert";
import { DeleteDialogContent } from "@/components/deleteDialogContent";
import { ActionButton } from "@/components/actionButton";

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
    <>
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
      <div className="container">
        <SubHeader
          title={t("subHeader")}
          counter={totalConcerts}
          variant="withСounter"
          icon={AudioLines}
        />
        <ProtectPage>
          <ActionButton
            actionType="create"
            buttonLabel="create"
            icon={<Plus />}
          >
            <DialogConcert mode="create" />
          </ActionButton>
        </ProtectPage>
        <Accordion
          type="single"
          className="w-full"
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
                      <ActionButton
                        actionType="delete"
                        buttonLabel="delete"
                        icon={<X />}
                      >
                        <DeleteDialogContent
                          id={concert.id}
                          title={concert.title}
                          model="concerts"
                        />
                      </ActionButton>
                      <ActionButton
                        actionType="edit"
                        buttonLabel="edit"
                        icon={<PencilLine />}
                      >
                        <DialogConcert mode="edit" currentConcert={concert} />
                      </ActionButton>
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
                    <ActionButton
                      actionType="delete"
                      buttonLabel="delete"
                      icon={<X />}
                    >
                      <DeleteDialogContent
                        id={concert.id}
                        title={concert.title}
                        model="concerts"
                      />
                    </ActionButton>
                    <ActionButton
                      actionType="edit"
                      buttonLabel="edit"
                      icon={<PencilLine />}
                    >
                      <DialogConcert mode="edit" currentConcert={concert} />
                    </ActionButton>
                  </ProtectPage>
                </ConcertCard>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
