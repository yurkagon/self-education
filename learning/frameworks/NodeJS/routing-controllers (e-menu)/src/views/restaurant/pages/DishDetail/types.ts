import { RouteComponentProps } from "react-router-dom";

export type IDishDetailProps = RouteComponentProps<{ dishId: string }>;

export interface IDishDetailState {
  data: IDish;
  isLoading: boolean;
}
