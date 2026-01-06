import { MouseEvent } from "react";

export interface IPrimaryButtonProps {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  children?: any;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}
