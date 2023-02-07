class Chat {
  private subscribers: Array<Client> = [];

  public send(author: Client, message: string): void {
    for(let index in this.subscribers) {
      const subscriber = this.subscribers[index];
      if (subscriber !== author) {
        subscriber.send(message);
      }
    }
  }
  public register(user: Client): void {
    this.subscribers.push(user);
  }
}

class Client {
  private name: string;
  private mediator: Chat;

  constructor(mediator: Chat, name: string) {
    this.name = name;
    this.mediator = mediator;

    this.mediator.register(this);
  };

  send(message: string) {
    this.mediator.send(this, message);
  }

  recieve(message: string) {
    console.log(message);
  }
}

const chat = new Chat();

const user1 = new Client(chat, 'yurkagon');
const user2 = new Client(chat, 'minecrafter2008');


