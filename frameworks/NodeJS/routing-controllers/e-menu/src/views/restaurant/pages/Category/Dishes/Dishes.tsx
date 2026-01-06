import React, { Component } from "react";
import { observer } from "mobx-react";

import BackButton from "../../../components/BackButton";

import CategoryState from "../CategoryState";

import Dish from "./Dish";

import Preloader from "./Preloader";

import "./style.scss";

@observer
class Dishes extends Component {
  render() {
    return (
      <div>
        <div>
          <BackButton />
        </div>
        <div className="name">
          <h1 className="text">
            {CategoryState.categoryName ||
              (CategoryState.isError ? "Упс!" : "Хвилинку...")}
          </h1>
        </div>

        <div className="dishes">
          {CategoryState.isLoading && <Preloader />}

          {CategoryState.data?.dishes.map((category) => (
            <Dish key={category._id} data={category} />
          ))}

          {!CategoryState.isError &&
            !CategoryState.isLoading &&
            !CategoryState.data?.dishes.length && (
              <h6 className="text-center mt-4 text-muted">
                Упс! Здається в цій категорії страви відсутні :(
              </h6>
            )}

          {CategoryState.isError && (
            <h6 className="text-center mt-4 text-muted">
              Упс! Здається така категорія відсутня :(
            </h6>
          )}
        </div>
      </div>
    );
  }
}
export default Dishes;
