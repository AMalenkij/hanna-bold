import { cn } from "@/lib/utils";

export default function TriangleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      width="27"
      height="23"
      viewBox="0 0 27 23"
      // fill="currentColor"
      // stroke="2"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
    >
      <title>Triangle Icon</title>
      <path d="M26.043 1L13.5 22.024L0.957 1Z" />
    </svg>
  );
}
