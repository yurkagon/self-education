import { action, observable } from "mobx";

export type ISidebarState = "" | true | false | "responsive";

class SidebarState {
  @observable
  public state: ISidebarState;

  private readonly defaultState: ISidebarState = "responsive";

  constructor() {
    this.state = this.defaultState;
  }

  @action
  public setState(state: ISidebarState) {
    this.state = state;
  }

  @action
  public reset() {
    this.state = this.defaultState;
  }
}

export default SidebarState;
