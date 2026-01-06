class Configuration {
  public get mode(): APPLICATION_MODE {
    return process.env.NODE_ENV || "development";
  }

  public get baseUrl(): string {
    return `${window.location.origin}`;
  }

  public get apiUrl(): string {
    return this.isDev
      ? "http://localhost:3001/api"
      : `${window.location.origin}/api`;
  }

  public get isDev(): boolean {
    return this.mode === "development";
  }
}

export default Configuration;
