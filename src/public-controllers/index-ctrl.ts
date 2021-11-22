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

var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

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

    @View("taxonomy.ejs")
    @Get("/taxonomies/:taxID")
    async getCategory(@PathParams("taxID") taxID: string) {
        let resources = await this.getPageResouces();
        let taxonomy = await this.tcontroler.find(taxID);
        let projects = await this.pcontroler.model.find({ categories: { $in: [taxID] } });

        return { ...resources, projects: projects, taxonomy: taxonomy }
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

        item.body= md.render(item.body??"");
        
        let resources = await this.getPageResouces();
        return {
            ...resources,
            project: item,
        };
    }

    @View("fair-use.ejs")
    @Get("/fair-use-policy")
    async fairUse() {
    }

    @View("terms-policies.ejs")
    @Get("/terms-and-conditions")
    async policy() {
    }

    @View("refund.ejs")
    @Get("/money-back-gurantee")
    async refund() {
    }

    @View("cookies-policy.ejs")
    @Get("/cookies-policies")
    async cookie() {
    }
}
