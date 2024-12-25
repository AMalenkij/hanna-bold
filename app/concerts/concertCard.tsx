interface ConcertCardProps {
	timestamptz: {
	  date: string;
	  month: string;
	  year: string;
	  time: string;
	};
	title: string;
	city: string;
	venueName: string;
  address: string;
 }

export default function ConcertCard({
  timestamptz: {
    date, month, year, time,
  },
  title,
  city,
  venueName,
  address
}: ConcertCardProps) {
  return (
    <>
      <div className="mx-auto mb-7 flex">
        <div className="mr-3 grid items-start gap-y-1 text-center lg:mr-0 lg:grid-cols-3 lg:gap-x-10 lg:pl-10">
          <div className="basis-1/4 text-5xl">{date}</div>
          <div className="grid-cols-2 gap-y-1">
            <div className="text-xl">{month}</div>
            <div className="">{year}</div>
          </div>
          <div className="lg:-ml-6 basis-1/4 pt-1">{time}</div>
        </div>
        <div className="grid lf:gap-x-20 gap-y-1 lg:flex lg:basis-full">
          <h2 className="text-2xl lg:basis-4/5 lg:px-10 lg:text-center lg:font-bold lg:text-xl">{title}</h2>
          <div className="basis-4/5">
            <div className="font-bold">{city}</div>
            <div>{venueName}</div>
            <div>{address}</div>
          </div>
        </div>
      </div>
      <div className="invisible mx-auto mt-2 mb-4 h-1 w-24 rounded-xl border-gradient bg-accent group-hover:visible" />
    </>
  )
}