import ArrowIcon from "@/public/svg/arrowIcon";
import TriangleIcon from "@/public/svg/triangleIcon";
import type { FC } from "react";

interface SubHeaderProps {
  sectionName?: string;
  title: string;
  variant?: string;
  counter?: number;
}

const SubHeader: FC<SubHeaderProps> = ({
  sectionName,
  title,
  counter,
  variant,
}) => {
  if (variant === "withСounter") {
    return (
      <section
        aria-labelledby={title}
        className="container flex w-full items-center justify-between py-6 text-foreground"
      >
        <div className="space-y-1">
          <div className="flex gap-3">
            <h1 className="font-semibold text-5xl uppercase tracking-tight sm:text-9xl">
              {title}
            </h1>
            <div className="flex flex-col items-center justify-between sm:py-4">
              <p className="text-center font-semibold text-lg">[ {counter} ]</p>
              <TriangleIcon />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby={title} className="container py-6 text-foreground">
      <div className="space-y-1">
        <p className="text-sm">/ {sectionName}</p>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-7xl tracking-tight md:text-9xl">
            {title}
          </h1>
          <ArrowIcon className="h-16 w-16 rotate-90 md:h-32 md:w-32" />
        </div>
      </div>
    </section>
  );
};

export default SubHeader;
