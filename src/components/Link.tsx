interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, ...props }: LinkProps) {
  return (
    <a 
      href={href} 
      {...props}
      className={`${props.className || ''} transition-colors duration-200`}
    >
      {children}
    </a>
  );
}