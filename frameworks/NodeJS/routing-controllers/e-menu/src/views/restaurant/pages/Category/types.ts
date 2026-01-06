import { RouteComponentProps } from "react-router-dom";

interface IParams {
  categoryId: string;
}

export type ICategoryProps = RouteComponentProps<IParams>;
