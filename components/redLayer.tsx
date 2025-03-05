import { cn } from "@/lib/utils";

export default function RedLayer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "-z-10 absolute inset-0 bg-red-700 mix-blend-multiply",
        className,
      )}
    />
  );
}
