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
import { TaxonomyService } from "../services/taxonomies/TaxonomyService";
import { ProjectService } from "../services/projects/ProjectService";

@Controller("/")

export class EventsCtrl {
    constructor(private tcontroler: TaxonomyService, private pcontroler: ProjectService,) { }
    @View("index.ejs")
    @Get("/")
    async get() {
        let resources = await this.getPageResouces();
        return { ...resources }
    }

    @View("taxonomies.ejs")
    @Get("/taxonomies")
    async getCategories() {
        let resources = await this.getPageResouces();
        return { ...resources }
    }


    async getPageResouces(): Promise<{ taxonomies: any }> {
        let items = await this.tcontroler.query({});
        return {
            taxonomies: items
        }
    }


    @View("projects.ejs")
    @Get("/projects")
    async getProjects() {
        let projects = await this.pcontroler.query({});
        let resources = await this.getPageResouces();
        return { ...resources, projects: projects }
    }

    @View("project.ejs")
    @Get("/projects/:itemID")
    async getProject(@PathParams("itemID") itemID: string) {
        let item = await this.pcontroler.find(itemID);
        let resources = await this.getPageResouces();
        return {
            ...resources,
            project: item,
        };
    }

    @View("index.ejs")
    @Get("/projects/:itemID/purchase")
    async purchaseProject(@PathParams("itemID") itemID: string) {
        let item = await this.pcontroler.find(itemID);
        let resources = await this.getPageResouces();
        return {
            ...resources,
            project: item,
        };
    }
}
