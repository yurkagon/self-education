class TokenStorage {
  private readonly storageKey = "@access_token";

  private token: string = localStorage.getItem(this.storageKey);

  public set(token: string): void {
    localStorage.setItem(this.storageKey, token);

    this.token = token;
  }

  public get(): string | null {
    if (this.token) {
      return this.token;
    }

    const token = localStorage.getItem(this.storageKey);
    this.token = token;

    return token;
  }

  public remove(): void {
    if (!this.token) return;

    localStorage.removeItem(this.storageKey);
    this.token = null;
  }
}

export default TokenStorage;
