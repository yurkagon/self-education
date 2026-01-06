import { Optional } from "utility-types";
import { INewDishFormFields } from "./NewDishForm/types";

export interface IMenuEditorProps {
  onDishCreated?: (dish: INewDishFormFields) => void;
}

export interface IMenuEditorState {
  openedNewCategoryForm: boolean;
}

export interface IMenuEditorCategory extends Optional<ICategoryData, "_id"> {
  temp_id?: string;
}

export interface IDragEndResult {
  draggableId: string;
  type: string;
  reason: "DROP" | "CANCEL";
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
}
