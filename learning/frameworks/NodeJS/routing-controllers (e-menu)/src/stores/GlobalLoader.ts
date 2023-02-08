import { observable, action, computed } from "mobx";
import isEmpty from "lodash/isEmpty";

class GlobalLoader {
  @observable private loaderList = [];

  private id = 0;

  @action
  public registerLoadingProcess() {
    const processId = this.id;
    this.id = processId + 1;

    this.loaderList.push(processId);

    return () => {
      this.unregisterLoadingProcess(processId);
    };
  }

  @action
  private unregisterLoadingProcess(id: number) {
    const newList = [...this.loaderList];

    const index = newList.findIndex((el) => el === id);
    newList.splice(index, 1);

    this.loaderList = newList;
  }

  @computed
  public get isLoading(): boolean {
    return !isEmpty(this.loaderList);
  }
}

const instance = new GlobalLoader();

export default instance;
