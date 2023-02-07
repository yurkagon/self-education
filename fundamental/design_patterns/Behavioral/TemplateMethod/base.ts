abstract class Enemy {
  attack() {
    console.log('attack');
  }

  sleep() {
    console.log('sleep');
  }
}

class Warrior extends Enemy {
  attack() {
    console.log('get sword');

    super.attack();
  }
}

class Orc extends Enemy {
  sleep() {
    console.log('I dont wanna sleep');
  }
}
