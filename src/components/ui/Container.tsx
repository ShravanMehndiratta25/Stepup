import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container = ({
  children,
  className,
  as: Component = "div",
}: ContainerProps) => {
  const Tag = Component as any;
  return (
    <Tag className={cn("max-w-7xl mx-auto px-6 md:px-12 lg:px-16", className)}>
      {children}
    </Tag>
  );
};
