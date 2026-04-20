import type { AnchorHTMLAttributes, ReactNode } from "react";

type NextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export default function NextLink({ href, children, ...props }: NextLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

