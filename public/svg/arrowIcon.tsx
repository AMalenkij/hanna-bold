import { cn } from "@/lib/utils"

export default function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg 
    className={cn(className)}
    xmlns="http://www.w3.org/2000/svg" 
    fill="currentColor" 
    viewBox="0 0 22 19">
      <title>Arrow Icon</title>
      <path d="m10.392 16.88 7.232-7.264-7.264-7.232 1.696-1.76 8.992 8.992-8.96 8.992zM.568 8.304h18.4v2.656H.568z" />
    </svg>
  )
}