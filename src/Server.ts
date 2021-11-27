import { GlobalAcceptMimesMiddleware } from "@tsed/common";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/mongoose";
import "@tsed/platform-express";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as  cors from "cors"

console.log(__dirname);
@Configuration({
  rootDir: __dirname,
  acceptMimes: ["application/json"],
  port: process.env.PORT || 8000,
  httpsPort: false,
  passport: {},
  mongoose: {
    url: process.env.mongoose_url || "mongodb://127.0.0.1:27017/example-mongoose-test",
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  swagger: [{
    path: "/api-docs"
  }],
  debug: false,
  viewsDir: `${__dirname}/../views`,
  views: {
    root: `${__dirname}/../views`,
    viewEngine: "ejs",
    extensions: { // optional
      "ejs": "ejs",
      "hbs": "handlebars"
    },
    options: {
      ejs: {} // global options for ejs engine. See official engine documentation for more details.
    }
  },
  "mount": {
    "/rest": "${rootDir}/controllers/**/*.ts",
    "/": "${rootDir}/public-controllers/*.ts",
  },
})
export class Server {
  @Inject()
  app: PlatformApplication;

  $beforeRoutesInit(): void | Promise<any> {
    this.app.use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }
}

