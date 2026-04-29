import { RouteComponentProps } from "react-router-dom";

export type IStatus = "pending" | "success" | "failed";
export type IAccountConfirmProps = RouteComponentProps<{ token: string }>;
