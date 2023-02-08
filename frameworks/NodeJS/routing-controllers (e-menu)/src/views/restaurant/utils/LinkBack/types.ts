import { LinkProps } from "react-router-dom";

export interface ILinkBackProps extends Omit<LinkProps, "to" | "replace"> {
  fallback?: string;
}
