class jQuery {
  private target: HTMLElement;

  constructor(selector: string) {
    this.target = document.querySelector(selector);
  }

  public html(str: string) {
    this.target.innerHTML = str;

    return this;
  }
}

const $ = (selector: string) => new jQuery(selector);

$('#some_id').html('hello').html('world');
