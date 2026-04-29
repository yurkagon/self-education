import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames";

import ReactLoading from "react-loading";

import "./styles.scss";

const LoadingScreen: FC<{}> = () => {
  const location = useLocation();

  const isRestaurant = location.pathname.startsWith("/r/");
  const isAdmin = location.pathname.startsWith("/admin/");
  const isLanding = !isRestaurant && !isAdmin;

  const spinnerColor = (() => {
    if (isRestaurant) return "#FFDA80";
    if (isAdmin) return "blue";

    return "white";
  })();

  return (
    <div
      className={cn(
        "global-loading-screen",
        {
          admin: isAdmin,
          restaurant: isRestaurant,
          landing: isLanding,
        },
        "d-flex",
        "justify-content-center",
        "align-items-center"
      )}
    >
      <ReactLoading
        className="mx-auto"
        type="bubbles"
        color={spinnerColor}
        height={100}
        width={100}
      />
    </div>
  );
};

export default LoadingScreen;
