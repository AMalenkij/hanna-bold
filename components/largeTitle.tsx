import { cn } from "@/lib/utils";
import { BAND_NAME, BAND_SHORT_NAME } from "@/constants/setting";

type LargeTitleProps = {
  className?: string;
};

export default function LargeTitle({ className }: LargeTitleProps) {
  return (
    <div className={cn("flex justify-center font-black", className)}>
      <span className="hidden text-7xl sm:text-15xl md:block">{BAND_NAME}</span>
      <span className="block text-14xl md:hidden">{BAND_SHORT_NAME}</span>
    </div>
  );
}
