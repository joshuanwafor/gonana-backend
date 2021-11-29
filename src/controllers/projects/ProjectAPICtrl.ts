import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Res, UseAuth } from "@tsed/common";
import { AuthMiddleware } from "../../middlewares/auth";
import { AuthService } from "../../services/auth";
import { ProjectService } from "../../services/projects/ProjectService";

@Controller({
  path: "/projects",
})

export class ProjectCtrl {
  constructor(private service: ProjectService, private authService: AuthService) {

  }


  @Get("/")
  @UseAuth(AuthMiddleware)
  async getProjects() {
    return this.service.query({ creator_id: this.authService.user_id });
  }

  @Post("")
  @UseAuth(AuthMiddleware)
  async postProject(@BodyParams() body: any) {
    body.creator_id = this.authService.user_id;
    return await this.service.save(body)
  }

  @Get("/:projectID")
  @UseAuth(AuthMiddleware)
  async getProject(@PathParams("projectID") projectID: string) {
    return await this.service.find(projectID);
  }

  @Put("/:projectID")
  @UseAuth(AuthMiddleware)
  async updateProject(@BodyParams() body: any, @PathParams("projectID") projectID: string) {
    body._id = projectID;
    console.log(projectID);
    try {
      await this.service.save(body);
      return true;
    } catch (e) {

    }
  }

  @Delete("/:projectID")
  @UseAuth(AuthMiddleware)
  async deleteProject() {
    return await this.service.remove("d")
  }

}
