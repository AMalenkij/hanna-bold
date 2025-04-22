import type { FC } from "react";
import { Triangle } from "lucide-react";

type SubHeaderProps = {
  sectionName?: string;
  title: string;
  variant?: "withСounter" | "withСounterNotIcon";
  counter?: string | number | Promise<string | number>;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SubHeader: FC<SubHeaderProps> = ({
  sectionName,
  title,
  counter,
  variant,
  icon: Icon,
}) => {
  if (variant === "withСounter" || variant === "withСounterNotIcon") {
    return (
      <section
        aria-labelledby={title}
        className="container flex w-full justify-between py-6 text-foreground"
      >
        <div className="w-full space-y-1 ">
          {variant === "withСounterNotIcon" ? (
            <p className="text-sm">/ {sectionName}</p>
          ) : null}
          <div className="flex w-full justify-between">
            <div className="flex">
              <h1 className="font-normal text-6xl uppercase tracking-tight sm:text-7xl md:text-8xl">
                {title}
              </h1>

              <div className="flex flex-col items-center gap-y-1 md:gap-y-3.5">
                <p className="p-0.5 font-light text-lg sm:p-1 md:p-2">
                  [ {counter} ]
                </p>
                {variant === "withСounter" ? (
                  <Triangle
                    strokeWidth={2}
                    className="invisible rotate-180 sm:visible"
                  />
                ) : null}
              </div>
            </div>
            {Icon && (
              <Icon
                className="invisible h-28 w-28 sm:visible sm:h-24 sm:w-24"
                strokeWidth={1}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
  return (
    // POSTS
    <section aria-labelledby={title} className="container py-6 text-foreground">
      <div className="space-y-1">
        <p className="ml-2 text-sm md:ml-3.5 lg:ml-3.5 ">/ {sectionName}</p>
        <div className="flex items-center justify-between">
          <h1 className="font-normal text-7xl uppercase tracking-tight sm:text-8xl md:text-9xl">
            {title}
          </h1>
          {Icon && (
            <Icon
              className="h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
              strokeWidth={1}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SubHeader;
