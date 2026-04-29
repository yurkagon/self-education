import React, { PureComponent, Fragment } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CIcon from "@coreui/icons-react";
import cn from "classnames";
import { CButton } from "@coreui/react";

import NewDishForm from "../NewDishForm";
import ColumnItem from "../ColumnItem";

import { INewDishFormFields } from "../NewDishForm/types";
import { IColumnProps, IColumnState } from "./types";

class Column extends PureComponent<IColumnProps, IColumnState> {
  state = {
    openedNewDishForm: false,
  };

  onItemCreatedHandler = (value: INewDishFormFields): void => {
    const { onItemCreated, category } = this.props;

    onItemCreated(value, category._id);

    this.setState({ openedNewDishForm: false });
  };

  render() {
    const { category, index, onItemRemoved, onCategoryRemoved } = this.props;
    const { openedNewDishForm } = this.state;

    const categoryId = category._id || category.temp_id;

    return (
      <Draggable draggableId={categoryId} index={index}>
        {(providedProps) => (
          <div
            {...providedProps.draggableProps}
            {...providedProps.dragHandleProps}
            ref={providedProps.innerRef}
          >
            <Fragment>
              <Droppable
                droppableId={categoryId}
                key={categoryId}
                type="task"
                direction="vertical"
              >
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="category-column"
                  >
                    <div className="category-header shadow-sm bg-white">
                      {category.name.ua}
                      <div className="category-actions">
                        <div className="category-edit">
                          <CIcon name="cil-pencil" />
                        </div>
                        <div className="category-remove">
                          <CIcon name="cil-trash" onClick={onCategoryRemoved} />
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn("dishes-column mb-4", {
                        "id-dragging-over": snapshot.isDraggingOver,
                      })}
                    >
                      {category.dishes.map((dish, index) => (
                        <ColumnItem
                          key={dish._id}
                          dish={dish}
                          index={index}
                          onDelete={onItemRemoved}
                        />
                      ))}
                      {provided.placeholder}

                      {openedNewDishForm ? (
                        <NewDishForm onSubmit={this.onItemCreatedHandler} />
                      ) : (
                        <CButton
                          color="secondary"
                          className="mx-4 mb-4"
                          type="button"
                          onClick={() =>
                            this.setState({ openedNewDishForm: true })
                          }
                        >
                          Додати страву
                        </CButton>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>

              {providedProps["placeholder"]}
            </Fragment>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Column;
