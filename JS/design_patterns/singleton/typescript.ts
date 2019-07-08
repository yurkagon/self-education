class Singleton {
  private static instance: Singleton;

  private constructor() {
    console.log("Singleton instance has been created");
  }

  public static getInstance(): Singleton {
    if (Singleton.instance) {
      return Singleton.instance;
    } else {
      Singleton.instance = new Singleton();

      return Singleton.instance;
    }
  }
}
