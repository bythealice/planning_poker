import * as React from "react";

import { cn } from "@/core/utils/cn";

type SliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  value: number;
  onValueChange: (value: number) => void;
};

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { className, value, onValueChange, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type="range"
      value={value}
      onChange={(event) => onValueChange(Number(event.target.value))}
      data-slot="slider"
      className={cn("h-2 w-full cursor-pointer accent-login-accent disabled:cursor-not-allowed disabled:opacity-40", className)}
      {...props}
    />
  );
});


