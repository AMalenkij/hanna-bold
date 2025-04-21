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
        className="flex w-full items-center justify-between py-6 text-foreground"
      >
        <div className="w-full space-y-1">
          {variant === "withСounterNotIcon" ? (
            <p className="text-sm">/ {sectionName}</p>
          ) : null}
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-3">
              <h1 className="font-normal text-5xl uppercase tracking-tight sm:text-9xl">
                {title}
              </h1>

              <div className="flex flex-col items-center justify-between sm:py-3">
                <p className="text-center font-medium text-lg">[ {counter} ]</p>
                {variant === "withСounter" ? (
                  <Triangle strokeWidth={2} className="rotate-180" />
                ) : null}
              </div>
            </div>
            {Icon && <Icon className="h-28 w-28" strokeWidth={1} />}
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
          <h1 className="font-normal text-5xl tracking-tight md:text-9xl">
            {title}
          </h1>
          {Icon && <Icon className="h-28 w-28" strokeWidth={1} />}
        </div>
      </div>
    </section>
  );
};

export default SubHeader;
