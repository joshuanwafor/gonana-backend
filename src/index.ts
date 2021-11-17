import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import {Server} from "./Server";
import * as admin from 'firebase-admin';

function init_firebase() {
  var serviceAccount = require("../finalyc-007-firebase-adminsdk-xhmwt-dc9928e57a.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

}


async function bootstrap() {
  try {
    init_firebase();
    $log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server, {});

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
