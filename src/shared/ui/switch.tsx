import * as React from "react";

import { cn } from "@/core/utils/cn";

type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, checked = false, onCheckedChange, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      data-slot="switch"
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-login-accent data-[state=unchecked]:bg-login-toggle-track",
        checked ? "bg-login-accent" : "bg-login-toggle-track",
        className,
      )}
      data-state={checked ? "checked" : "unchecked"}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-login-toggle-thumb shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  );
});


