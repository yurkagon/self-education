/* eslint-disable import/no-extraneous-dependencies */
import { createBrowserHistory } from "history";
import { IHistory } from "./types";

const history = createBrowserHistory() as IHistory;

history.stack = [history.location];
const stackSize = 5;

history.listen((location) => {
  history.stack.push(location);

  if (history.stack.length > stackSize) {
    history.stack.shift();
  }

  history.prevLocation = history.stack[history.stack.length - 2];
});

export default history;
