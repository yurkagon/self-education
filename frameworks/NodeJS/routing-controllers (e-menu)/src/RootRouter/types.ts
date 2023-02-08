import { RouteProps } from "react-router-dom";
/* eslint-disable import/no-extraneous-dependencies */
import { History, Location } from "history";

export interface IHistory extends History {
  prevLocation?: Location;
  stack: Location[];
}

export interface IProtectedRouteProps extends RouteProps {
  publicRoute?: boolean;
  privateRoute?: boolean;
}
