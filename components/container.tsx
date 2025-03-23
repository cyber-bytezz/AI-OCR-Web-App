interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`container mx-auto px-4 max-w-6xl ${className}`}>{children}</div>;
}