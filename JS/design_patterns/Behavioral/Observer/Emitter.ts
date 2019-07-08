interface IEvents {
  [key: string]: Array<() => void>;
}

class Emitter {
  private events: IEvents = {};

  public on(type: string, listener: () => void) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  public emit(type: string) {
    if(this.events[type]) {
      this.events[type].forEach(listener => listener());
    }
  }
}

const emtr = new Emitter();

// observers
emtr.on('greet', function() {
   console.log('Welcome!');
 });

emtr.on('greet', function() {
  console.log('Greetings!');
});

emtr.emit('greet');
// Welcome!
// Greetings!
