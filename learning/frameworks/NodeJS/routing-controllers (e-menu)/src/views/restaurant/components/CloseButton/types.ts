import { MouseEvent } from "react";

export interface ICloseButtonProps {
  className?: string;
  size?: number;
  onClick?: (event: MouseEvent<any>) => void;
}
