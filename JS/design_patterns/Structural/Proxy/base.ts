interface Subject {
  request: (str: string) => Array<any>
}

class RealSubject implements Subject {
  request(str) {
    return [str];
  }
}

class ProxySubject implements Subject {
  private subject: Subject;

  constructor(subject: Subject) {
    this.subject = subject;
  }

  request(str: string) {
    console.log(str);

    const result = this.subject.request(str);

    console.log(result);

    return result;
  }
}

const clientCode = (subject: Subject) => {
  subject.request('some id');
}

const subject = new RealSubject();
const proxySubject = new ProxySubject(subject);

clientCode(subject);
clientCode(proxySubject);
