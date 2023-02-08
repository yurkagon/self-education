import React, { FC } from "react";
import { Link } from "react-router-dom";

import history from "RootRouter/history";

import RestaurantStore from "stores/RestaurantStore";

import { ILinkBackProps } from "./types";

const LinkBack: FC<ILinkBackProps> = ({ fallback, ...props }) => {
  const to = history.prevLocation?.pathname || fallback || getDefaultFallback();

  return <Link to={to} replace {...props} />;
};

export const goBack = (fallback?: string) => {
  if (history.prevLocation) {
    history.goBack();
  } else {
    history.replace(fallback || getDefaultFallback());
  }
};

const getDefaultFallback = () => {
  const { slug } = RestaurantStore.data;

  return `/r/${slug}`;
};

export default LinkBack;
