import Link from "next/link";
import { ClientCldImage } from "@/components/clientCldImage";

type NewsCardProps = {
  date: {
    date: string;
    month: string;
    year: string;
    time: string;
  };
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
};

export default function NewsCard({
  date,
  title,
  content,
  imageUrl,
  slug,
}: NewsCardProps) {
  return (
    <article className="mx-auto">
      <Link href={`posts/${slug}`}>
        <div className="space-y-1">
          {/* Image */}
          <ClientCldImage
            width={980}
            height={490}
            src={imageUrl}
            alt="Description of my image"
            sizes="(max-width: 767px) 100vw, 50vw"
            className="saturate-50 transition-all duration-1000 hover:saturate-100"
          />
          {/* Date */}
          <div className="pb-3 text-muted-foreground text-xs uppercase sm:text-sm">{`/ ${date.date} ${date.month} ${date.year} ${date.time}`}</div>
          {/* Title */}
          <h2 className="font-bold text-2xl leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
          {/* Content */}
          <p className="text-muted-foreground leading-relaxed sm:text-xl">
            {content}
          </p>
        </div>
      </Link>
    </article>
  );
}
