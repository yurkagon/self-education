import React, { FC } from "react";

import { Link } from "react-router-dom";

import PrimaryButton from "../../../components/PrimaryButton";

import "./styles.scss";

const Hero: FC<{}> = () => (
  <section className="d-flex flex-column flex-md-row justify-content-between w-75 mx-auto hero">
    <div className="pr-5 mr-5 col-xl-6 col-md-6 col-12">
      <h1 className="mb-3">Maximize your revenue with digital menus</h1>
      <p className="mb-5">
        FineDine is the #1 Menu App that helps you to increase your revenue by
        digitizing the dining, delivery & pick-up experience.
      </p>
      <PrimaryButton>
        <Link to="/admin/login">Sign in</Link>
      </PrimaryButton>
    </div>
    <div className="d-flex justify-content-end col-xl-6 col-md-6 col-12">
      <img
        className="w-100 mt-5"
        src="https://www.finedinemenu.com/wp-content/uploads/2020/03/a-great-meal-starts.jpg"
        alt="app view"
      />
    </div>
  </section>
);

export default Hero;
