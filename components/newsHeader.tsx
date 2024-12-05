import type { FC } from "react";
import ArrowIcon from "@/public/svg/arrowIcon";

interface NewsHeaderProps {
  sectionName: string;
  title: string;
}

const NewsHeader: FC<NewsHeaderProps> = ({ sectionName, title }) => {
  return (
    <section
      aria-labelledby="news-header-title"
      className="flex items-center justify-between w-full mx-auto px-4 py-6 text-white"
    >
      <div className="space-y-1">
        <p className="text-sm">/ {sectionName}</p>
        <h1 className="text-6xl font-bold tracking-tight">
          {title}
        </h1>
      </div>
      <ArrowIcon className="h-24 w-24 rotate-90" />
    </section>
  );
};

export default NewsHeader;
