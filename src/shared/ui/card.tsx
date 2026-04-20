import * as React from "react";

import { cn } from "@/core/utils/cn";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Card(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn("rounded-3xl border border-login-card-border bg-login-card text-login-card-foreground shadow-2xl shadow-black/20", className)}
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardHeader(
  { className, ...props },
  ref,
) {
  return <div ref={ref} data-slot="card-header" className={cn("flex flex-col gap-2 p-6", className)} {...props} />;
});

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(function CardTitle(
  { className, ...props },
  ref,
) {
  return <h3 ref={ref} data-slot="card-title" className={cn("text-base font-semibold tracking-tight text-login-card-foreground", className)} {...props} />;
});

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function CardDescription(
  { className, ...props },
  ref,
) {
  return <p ref={ref} data-slot="card-description" className={cn("text-sm leading-6 text-login-card-foreground/70", className)} {...props} />;
});

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardContent(
  { className, ...props },
  ref,
) {
  return <div ref={ref} data-slot="card-content" className={cn("p-6 pt-0", className)} {...props} />;
});

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardFooter(
  { className, ...props },
  ref,
) {
  return <div ref={ref} data-slot="card-footer" className={cn("flex items-center p-6 pt-0", className)} {...props} />;
});


