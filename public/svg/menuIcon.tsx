import { cn } from "@/lib/utils"

export default function MenuIcon({ className }: { className?: string }) {
	return (
		<svg
			className={cn(className)}
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg">
			<title>Menu Icon</title>
			<path d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2" />
		</svg>
	)
}

