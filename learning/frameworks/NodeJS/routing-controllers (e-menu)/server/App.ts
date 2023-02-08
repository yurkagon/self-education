/* eslint-disable no-console */
import express, { Express, Request } from "express";
import swaggerUi from "swagger-ui-express";
import {
  useExpressServer,
  Action,
  getMetadataArgsStorage,
} from "routing-controllers";
import mongoose from "mongoose";
import compression from "compression";

import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { defaultMetadataStorage } from "class-transformer/storage";
import controllers from "./controllers";
import interceptors from "./interceptors";
import middlewares from "./middlewares";

import Configuration from "./Configuration";

class Application {
  private static app: Express;

  private static db = mongoose;

  public static config = new Configuration();

  public static start() {
    const { port } = this.config;

    this.app.listen(port, () => {
      console.log(
        `Server is listening on port: ${port}. Environment - ${this.config.mode}`
      );
    });
  }

  public static async init() {
    this.createServer();

    await this.connectDatabase();
  }

  private static createServer() {
    this.app = express();

    if (this.config.mode === "development") {
      this.app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(this.generateOpenAPIObject())
      );
    }

    this.app.use(compression());

    this.app.use(express.static("build"));

    useExpressServer(this.app, {
      routePrefix: "/api",
      controllers,
      interceptors,
      middlewares,
      cors: true,
      classTransformer: true,
      currentUserChecker: (action: Action) => action.request.user,
      authorizationChecker: async (action: Action, roles: IRole[] | IRole) => {
        const { user } = action.request as Request;

        if (!user) return false;

        if (!roles.length) return true;

        if (roles.includes(user.role)) return true;

        return false;
      },
    });

    return this.app;
  }

  private static generateOpenAPIObject() {
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: "#/components/schemas/",
      classTransformerMetadataStorage: defaultMetadataStorage,
    });

    const storage = getMetadataArgsStorage();

    const spec = routingControllersToSpec(
      storage,
      {
        routePrefix: "/api",
      },
      {
        components: {
          schemas,
          securitySchemes: {
            basicAuth: {
              type: "apiKey",
              in: "header",
              name: "Authorization",
            },
          },
        },
      }
    );

    return spec;
  }

  private static async connectDatabase() {
    try {
      await this.db.connect(this.config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });

      console.log(`Connected to the database in ${this.config.mode} mode.`);
    } catch (error) {
      console.log(`Failed to connect to the database: ${error}`);
    }
  }
}

export default Application;
