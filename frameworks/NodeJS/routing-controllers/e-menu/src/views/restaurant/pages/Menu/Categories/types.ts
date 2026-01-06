import { RouteComponentProps } from "react-router-dom";

export interface ICategoryProps {
  data: ICategory;
  onClick: () => void;
}

export type ICategoriesProps = RouteComponentProps<{ restaurant_slug: string }>;
