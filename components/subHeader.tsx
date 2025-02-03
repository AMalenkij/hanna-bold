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
        className="mx-auto flex h-72 w-full items-center justify-between px-4 py-6 text-foreground"
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
    <section
      aria-labelledby={title}
      className="mx-auto flex h-72 w-full items-center justify-between px-4 py-6 text-foreground"
    >
      <div className="space-y-1">
        <p className="text-sm">/ {sectionName}</p>
        <h1 className="font-bold text-9xl tracking-tight">{title}</h1>
      </div>
      <ArrowIcon className="h-32 w-32 rotate-90" />
    </section>
  );
};

export default SubHeader;
