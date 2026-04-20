import * as React from "react";

import { cn } from "@/core/utils/cn";

type SeparatorProps = React.HTMLAttributes<HTMLHRElement> & {
  orientation?: "horizontal" | "vertical";
};

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(function Separator(props, ref) {
  const { className, orientation = "horizontal", ...rest } = props;

  return (
    <hr
      ref={ref}
      data-slot="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        "shrink-0 bg-login-card-border",
        className,
      )}
      {...rest}
    />
  );
});

