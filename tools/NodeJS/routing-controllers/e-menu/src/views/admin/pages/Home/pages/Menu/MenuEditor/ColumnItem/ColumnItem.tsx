import React from "react";
import cn from "classnames";
import { Draggable } from "react-beautiful-dnd";
import CIcon from "@coreui/icons-react";

import { IColumnItemProps } from "./types";

const ColumnItem = ({ dish, index, onDelete }: IColumnItemProps) => (
  <Draggable draggableId={dish._id} index={index}>
    {(providedProps, snapshot) => (
      <div
        className={cn("dish-item", {
          "is-dragging": snapshot.isDragging,
        })}
        {...providedProps.draggableProps}
        {...providedProps.dragHandleProps}
        ref={providedProps.innerRef}
      >
        {dish.name.ua}
        <div className="dish-actions">
          <div className="dish-edit">
            <CIcon name="cil-pencil" />
          </div>
          <div className="dish-remove">
            <CIcon name="cil-trash" onClick={() => onDelete(dish._id)} />
          </div>
        </div>
        {providedProps["placeholder"]}
      </div>
    )}
  </Draggable>
);

export default React.memo(ColumnItem);
