import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "linkSecond"
    | "link"
    | null
    | undefined;
}

export default function NavLink({
  href,
  label,
  isActive,
  variant,
  className,
}: NavLinkProps) {
  if (isActive) {
    return (
      <Button variant={variant} disabled className={className}>
        {label}
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} className={className}>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
