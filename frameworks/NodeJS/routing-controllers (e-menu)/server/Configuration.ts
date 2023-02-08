class Configuration {
  private readonly defaultPort = 3001;

  get port(): string | number {
    const port = process.env.PORT || this.defaultPort;

    return port;
  }

  get dbUrl(): string {
    switch (this.mode) {
      case "production":
        return process.env.DB_URL;

      case "test":
        return process.env.DB_URL_TEST;

      default:
        return process.env.DB_URL_DEV;
    }
  }

  get mode(): APPLICATION_MODE {
    return process.env.NODE_ENV || "development";
  }

  get jwtKey(): string {
    return process.env.JWT_SECRET;
  }

  get emailConfirmSecret(): string {
    return process.env.EMAIL_CONFIRMATION_SECRET;
  }

  get baseUrl(): string {
    return process.env.BASE_URL;
  }

  get mailer(): { user: string; password: string } {
    return {
      user: process.env.MAILER_USER,
      password: process.env.MAILER_PASSWORD,
    };
  }

  get isDev(): boolean {
    return this.mode === "development";
  }
}

export default Configuration;
