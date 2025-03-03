import { cn } from "@/lib/utils";
import { BAND_NAME, BAND_SHORT_NAME } from "@/constants/setting";

type LargeTitleProps = {
  className?: string;
};

export default function LargeTitle({ className }: LargeTitleProps) {
  return (
    <div className={cn("flex justify-center font-black", className)}>
      <span className="hidden text-10xl md:block lg:text-13xl xl:text-14xl 2xl:text-15xl">
        {BAND_NAME}
      </span>
      <span className="block text-13xl sm:text-14xl md:hidden">
        {BAND_SHORT_NAME}
      </span>
    </div>
  );
}
