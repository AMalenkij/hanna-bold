import { Button } from "./ui/button"
import { Link } from "@/i18n/routing";

interface HeroCardProps {
	heading: string
	date: {
		date: string
		month: string
		year: string
		time: string
	}
	announcement: string
	buttonLabel: string
	imgSrc: string
	linkScr: string
}

export default function HeroCard({ heading, date, announcement, buttonLabel, imgSrc, linkScr }: HeroCardProps) {
  return (
    <div className="relative h-[75vh]">
  				<div className="-z-20 absolute aspect-[16/9] h-[75vh] w-full overflow-hidden rounded-lg bg-cover">
					<img
						src={`https://hanna-s3.s3.amazonaws.com/static/${imgSrc}`}
						alt={heading}
						className="h-full w-full object-cover "
					/>
				</div>
				{/* Red layer over background */}
				<div className="-z-10 absolute inset-0 bg-red-700 mix-blend-multiply" />
				{/* Content */}
    <h1 className="pt-10 font-semibold text-[150px] text-stone-50">
          {heading}
        </h1>
        <div className="absolute bottom-0 z-10 px-4">
          <p className="mb-4 text-lg text-stone-200">
            {`/ ${date.date} ${date.month} ${date.year} ${date.time}`}
          </p>
          <p className="mb-6 text-stone-400 text-xl">{announcement}</p>

          <Button asChild variant="link">
            <Link href={linkScr}>
            {buttonLabel}
            </Link>
          </Button>

      </div>
    </div>
  );
