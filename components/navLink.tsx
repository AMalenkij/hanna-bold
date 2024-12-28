import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  className?: string
}

export default function NavLink({
  href,
  label,
  isActive,
  className,
}: NavLinkProps) {
  const linkClasses = cn(
    "transition-colors hover:text-foreground/80 text-lg",
    isActive ? "text-foreground pointer-events-none" : "text-foreground/60",
    className,
  )

  if (isActive) {
    return (
      <Button variant="link" size="sm" className={linkClasses}>
        {label}
      </Button>
    )
  }

  return (
    <Button variant="link" size="sm" className={linkClasses}>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
