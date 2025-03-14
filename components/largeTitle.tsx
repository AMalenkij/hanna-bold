import { cn } from "@/lib/utils";
import {
  BAND_NAME,
  BAND_SHORT_NAME,
  BAND_DESCRIPTION,
} from "@/constants/setting";

type LargeTitleProps = {
  className?: string;
};

export default function LargeTitle({ className }: LargeTitleProps) {
  return (
    <div className={cn("flex flex-col items-center pb-6 2xl:pb-8", className)}>
      {/* Desctop */}
      <div className="group relative hidden md:block">
        <div className="relative inline-block text-center">
          <p className="font-black text-10xl leading-none lg:text-13xl xl:text-14xl 2xl:text-15xl">
            {BAND_NAME}
          </p>
          <span className="2xl:-right-1.5 lg:-right-1 -tracking-[.05em] absolute right-0 bottom-6 translate-y-full whitespace-nowrap font-light text-3xl italic lg:bottom-8 lg:text-4xl lg:tracking-[.09em] xl:right-0.5 xl:bottom-10 xl:text-5xl xl:tracking-[.02em] 2xl:bottom-14 2xl:text-7xl 2xl:tracking-[.03em]">
            {BAND_DESCRIPTION}
          </span>
        </div>
      </div>

      {/* Mobile */}
      <div className="group relative block md:hidden">
        <div className="relative inline-block text-center">
          <p className="font-black text-13xl leading-none sm:text-14xl">
            {BAND_SHORT_NAME}
          </p>
          <span className="absolute right-4 bottom-8 translate-y-full whitespace-nowrap font-light text-3xl italic tracking-wider sm:right-5 sm:text-4xl">
            {BAND_DESCRIPTION}
          </span>
        </div>
      </div>
    </div>
  );
}
