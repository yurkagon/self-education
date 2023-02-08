import { MouseEvent } from "react";

export type ICartProps = {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export type ICartState = {
  price?: number;
  isActive: string;
  rangeValue: number;
};
