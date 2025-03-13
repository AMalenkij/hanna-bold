import { cn } from "@/lib/utils";

interface LogoIconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
}

const LogoIcon = ({ className }: LogoIconProps) => {
  return (
    <svg
      viewBox="0 0 277 434"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground", className)}
      role="img"
      aria-label="Logo Icon"
    >
      <path
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="9"
        d="m7.065 296.36 132.087-132.087 130.781 130.782-132.087 132.087z"
      />
      <path
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="9"
        d="M6.364 271.094 138.45 139.007l130.781 130.781-132.087 132.087z"
      />
      <path
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="9"
        d="m7.065 244.425 132.087-132.087 130.781 130.781-132.086 132.087z"
      />
      <path
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="9"
        d="M7.768 190.384 139.855 58.297 270.637 189.08 138.55 321.166z"
      />
      <path
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="9"
        d="M7.065 165.12 139.152 33.033l130.781 130.782-132.087 132.087z"
      />
      <path
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="9"
        d="M7.768 138.45 139.855 6.363l130.782 130.782L138.55 269.232z"
      />
    </svg>
  );
};

export default LogoIcon;
