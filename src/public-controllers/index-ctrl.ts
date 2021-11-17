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

@Controller("/")

export class EventsCtrl {

    @View("index.ejs")
    @Get("/")
    get() {

    }

    @View("taxonomies.ejs")
    @Get("/taxonomies")
    getCategories() {

    }
}
