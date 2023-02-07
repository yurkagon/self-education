abstract class PlayerState {
  protected player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  public abstract play(): void;
  public abstract stop(): void;
}

class LockedPlayerState extends PlayerState {
  private showUnlockDeviceMessage() {
    console.log('Unlock your player');
  }

  public play() {
    this.showUnlockDeviceMessage();
  }

  public stop() {
    this.showUnlockDeviceMessage();
  }
}

class UnlockedPlayerState extends PlayerState {
  play() {
    this.player.isPlaying = true;
  }

  stop() {
    this.player.isPlaying = false;
  }
}

class Player {
  public isPlaying = false;

  private state: PlayerState;

  constructor() {
    this.setState(UnlockedPlayerState);
  }

 	public setState(State: new(player: Player) => PlayerState) {
    this.state = new State(this);
  }

  public play() {
    this.state.play();
  }

 public  stop() {
    this.state.stop();
  }
}


const p = new Player();
p.play();
console.log(p);
p.setState(LockedPlayerState);
p.play(); // Unlock your player

