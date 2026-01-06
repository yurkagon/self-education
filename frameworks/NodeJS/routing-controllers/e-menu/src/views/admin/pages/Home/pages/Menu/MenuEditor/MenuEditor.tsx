/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { observer } from "mobx-react";
import { CButton } from "@coreui/react";

import MenuState from "./MenuState";

import NewCategoryForm from "./NewCategoryForm";
import Column from "./Column";

import { INewCategoryFormFields } from "./NewCategoryForm/types";
import { IMenuEditorProps, IMenuEditorState } from "./types";
import { INewDishFormFields } from "./NewDishForm/types";

import "./styles.scss";

@observer
class MenuEditor extends Component<IMenuEditorProps, IMenuEditorState> {
  state = {
    openedNewCategoryForm: false,
  };

  onDragEnd = ({
    destination,
    source,
    draggableId,
    type,
  }: DropResult): void => {
    if (!destination) {
      return;
    }

    const { droppableId: destinationId, index: destinationIndex } = destination;
    const { droppableId: sourceId, index: sourceIndex } = source;

    if (destinationId === sourceId && destinationIndex === sourceIndex) {
      return;
    }

    if (type === "column") {
      MenuState.moveCategory(draggableId, destinationIndex);
    } else if (type === "task") {
      MenuState.moveDishToCategory(
        sourceId,
        sourceIndex,
        destinationId,
        destinationIndex
      );
    }
  };

  submitNewDishHandler = (
    value: INewDishFormFields,
    categoryId: string
  ): void => {
    MenuState.addNewDishToCategory(value, categoryId);
  };

  submitNewCategoryHandler = (category: INewCategoryFormFields): void => {
    this.setState({ openedNewCategoryForm: false });
    MenuState.addNewCategory(category);
  };

  render() {
    const { openedNewCategoryForm } = this.state;

    return (
      <div className="menu-editor">
        {Boolean(MenuState.categories.length) && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="all-columns" type="column">
              {(provided) => (
                <div {...provided["draggableProps"]} ref={provided.innerRef}>
                  {MenuState.categories.map((el, index) => (
                    <Column
                      key={el._id || index}
                      category={el}
                      index={index}
                      onItemCreated={this.submitNewDishHandler}
                      onItemRemoved={(dishId) =>
                        MenuState.removeDish(index, dishId)
                      }
                      onCategoryRemoved={() => MenuState.removeCategory(index)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        {openedNewCategoryForm ? (
          <NewCategoryForm onSubmit={this.submitNewCategoryHandler} />
        ) : (
          <CButton
            color="secondary"
            type="button"
            className="mb-3 ml-4"
            onClick={() => this.setState({ openedNewCategoryForm: true })}
          >
            Додати категорію
          </CButton>
        )}
      </div>
    );
  }
}

export default MenuEditor;
