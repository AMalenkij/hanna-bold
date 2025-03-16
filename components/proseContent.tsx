import type { FC } from "react";
import { cn } from "@/lib/utils";

interface ProseContentProps {
  description: string;
  className?: string;
}

export const ProseContent: FC<ProseContentProps> = ({
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "prose prose-h1:font-semibold prose-h1:text-foreground prose-h1:text-lg prose-strong:text-foreground text-foreground italic prose-h1:not-italic",
        className,
      )}
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};
