import { INewDishFormFields } from "../NewDishForm/types";
import { IMenuEditorCategory } from "../types";

export interface IColumnProps {
  category: IMenuEditorCategory;
  index: number;
  onItemCreated(value: INewDishFormFields, categoryId: string): void;
  onItemRemoved(id: string): void;
  onCategoryRemoved(): void;
}

export interface IColumnState {
  openedNewDishForm: boolean;
}
