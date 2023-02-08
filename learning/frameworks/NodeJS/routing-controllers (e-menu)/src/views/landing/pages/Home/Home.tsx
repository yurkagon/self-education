import React, { FC, Fragment } from "react";

import Solutions from "../../components/Solutions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Hero from "./Hero";
import Relevance from "./Relevance";
import GetStarted from "./GetStarted";
import Feedback from "./Feedback";
import HowItWorks from "./HowItWorks";

import "./styles.scss";

const Home: FC<{}> = () => (
  <Fragment>
    <section className="header w-100 mb-5">
      <Header />
      <Hero />
    </section>
    <Solutions />
    <HowItWorks />
    <section className="py-5">
      <Relevance
        heading="A great meal starts with the menu"
        img="https://www.finedinemenu.com/wp-content/uploads/2020/03/a-great-meal-starts.jpg"
        description="Get your restaurant’s customers hungry with a visually striking,
      contemporary digital menu. Appetizing visuals and tasty descriptions
      make it easier than ever for your diners to decide what they’re hungry
      for. And it’s available in 35+ languages for more people than ever to
      enjoy."
      />
      <Relevance
        className="flex-md-row-reverse"
        heading="A great meal starts with the menu"
        img="https://www.finedinemenu.com/wp-content/uploads/2020/03/a-great-meal-starts.jpg"
        description="Get your restaurant’s customers hungry with a visually striking,
      contemporary digital menu. Appetizing visuals and tasty descriptions
      make it easier than ever for your diners to decide what they’re hungry
      for. And it’s available in 35+ languages for more people than ever to
      enjoy."
      />
      <Relevance
        heading="A great meal starts with the menu"
        img="https://www.finedinemenu.com/wp-content/uploads/2020/03/a-great-meal-starts.jpg"
        description="Get your restaurant’s customers hungry with a visually striking,
      contemporary digital menu. Appetizing visuals and tasty descriptions
      make it easier than ever for your diners to decide what they’re hungry
      for. And it’s available in 35+ languages for more people than ever to
      enjoy."
      />
    </section>

    <Feedback />
    <GetStarted />
    <Footer />
  </Fragment>
);

export default Home;
