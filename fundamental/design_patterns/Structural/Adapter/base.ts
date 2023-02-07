class Adaptee {
  requestXML(): string {
    return 'xml';
  }
}

class Target {
  request(): string {
    return 'json';
  }
}

class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();

    this.adaptee = adaptee;
  }

  public request(): string {
    const xml = this.adaptee.requestXML();

    const json = this.convertToJson(xml);

    return json;
  }

  private convertToJson(xml: string): string {
    return 'json';
  }
}


const clientCode = (target: Target) => {
  target.request();
}

const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);


