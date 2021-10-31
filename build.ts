/**
 * Remove old files, copy front-end ones.
 */
import winston from "winston";
 import fs from "fs-extra";
 
 try {
     // Remove current build
     fs.removeSync("./dist/");
 } catch (err) {
     winston.log(err);
 }
 