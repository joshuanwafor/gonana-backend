import {
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    UseBefore,
    View
} from "@tsed/common";
import { MergeParams } from "@tsed/platform-express";
import { Required, Status, Description, Summary } from "@tsed/schema";
import { NotFound } from "@tsed/exceptions";

@Controller("/projects")

export class ProjectCtrl {

    @View("projects.ejs")
    @Get("/")
    get() {

    }

    @View("index.ejs")
    @Get("/:project")
    getProject() {

    }

    @View("index.ejs")
    @Get("/:project/purchase")
    purchaseProject() {

    }
}
