import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import { ProjectService } from "../../services/projects/ProjectService";


@Controller({
  path: "/projects",
})

export class ProjectCtrl {
  constructor(private service: ProjectService) {

  }

  @Get("/")
  getProjects(){

  }


  @Post("")
  postProject(){

  }

  @Get("/:projectID")
  getProject(){

  }

  @Put("/:projectID")
 async updateProject({
    
 }){
   // return await this.service.save({});
  }

  @Delete("/:projectID")
  async deleteProject(){

    return await this.service.remove("d")

  }

}
