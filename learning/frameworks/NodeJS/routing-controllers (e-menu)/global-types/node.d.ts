declare global {
  declare type APPLICATION_MODE = "development" | "test" | "production";

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: APPLICATION_MODE;
      PORT: string;
      JWT_SECRET: string;
      DB_URL: string;
      DB_URL_DEV: string;
      DB_URL_TEST: string;
    }
  }

  declare namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export {};
