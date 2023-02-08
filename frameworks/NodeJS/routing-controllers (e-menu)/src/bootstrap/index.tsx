import React from "react";
import "mobx-react/batchingForReactDom";

import "bootstrap/dist/css/bootstrap.css";

import "moment/locale/uk";

import * as serviceWorker from "./serviceWorker";

import RootRouter from "../RootRouter";

import "../style/style.scss";

serviceWorker.unregister();

export default () => <RootRouter />;
