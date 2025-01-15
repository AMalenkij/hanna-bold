import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  className?: string;
}

export default function NavLink({
  href,
  label,
  isActive,
  className,
}: NavLinkProps) {
  if (isActive) {
    return (
      <Button variant="link" size="sm" className={className} disabled>
        {label}
      </Button>
    );
  }

  return (
    <Button asChild variant="link" size="sm" className={className}>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
