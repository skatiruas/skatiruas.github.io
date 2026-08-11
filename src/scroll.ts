// scroll.ts
import { Element as ScrollElement, Link as ScrollLink } from "react-scroll";
import { ComponentType, CSSProperties, ReactNode } from "react";

export const Element = ScrollElement as unknown as ComponentType<{
  name: string;
  style?: CSSProperties;
  children?: ReactNode;
}>;

export const Link = ScrollLink as unknown as ComponentType<{
  to: string;
  spy?: boolean;
  smooth?: boolean;
  duration?: number;
  offset?: number;
  onSetActive?: () => void;
  children?: ReactNode;
}>;
