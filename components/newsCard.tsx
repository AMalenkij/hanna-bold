import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
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
}

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
        <div className="space-y-6">
          {/* Image */}
          <div className="aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={title}
              width={1900}
              height={500}
              unoptimized
            />
          </div>
          {/* Date */}
          <div className="text-muted-foreground text-xs sm:text-sm">{`/ ${date.date} ${date.month} ${date.year} ${date.time}`}</div>
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
