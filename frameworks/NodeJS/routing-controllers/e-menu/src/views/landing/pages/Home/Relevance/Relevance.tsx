import React, { FC } from "react";
import cn from "classnames";

import { Link } from "react-router-dom";

import { IRelevanceProps } from "./IRelevanceProps";

import "./styles.scss";

const Relevance: FC<IRelevanceProps> = ({
  img,
  heading,
  className,
  description,
}) => (
  <section
    className={cn(
      "relevance d-flex flex-column flex-md-row justify-content-between align-items-center w-75 mx-auto",
      className
    )}
  >
    <div className="d-flex justify-content-end col-xl-6 col-md-6 col-12">
      <img className="w-100 mt-5" src={img} alt="app view" />
    </div>
    <div className="pr-5 mr-5 col-xl-6 col-md-6 col-12">
      <h3 className="mb-3">{heading}</h3>
      <p className="mb-5">{description}</p>
      <Link to="/admin/login" className="link">
        Learn more →
      </Link>
    </div>
  </section>
);
export default Relevance;
