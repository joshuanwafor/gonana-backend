import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  Res,
  UseAuth,
} from "@tsed/common";
import shortid from "shortid";
import { AuthMiddleware } from "../../middlewares/auth";
import { AuthService } from "../../services/auth";
import { CourseService } from "../../services/course/course-service";

@Controller({
  path: "/courses",
})
export class CoursesCtrl {
  constructor(
    private service: CourseService,
    private authService: AuthService
  ) {}

  @Get("/")
  @UseAuth(AuthMiddleware)
  async getList() {
    return this.service.query({ publisher_id: this.authService.user_id });
  }

  @Post("")
  @UseAuth(AuthMiddleware)
  async post(@BodyParams() body: any) {
    body.course_code = require("shortid").generate();
    body.publisher_id = this.authService.user_id;
    return await this.service.save(body);
  }

  @Get("/:id")
  @UseAuth(AuthMiddleware)
  async get(@PathParams("id") id: string) {
    return await this.service.find(id);
  }

  @Put("/:id")
  @UseAuth(AuthMiddleware)
  async update(@BodyParams() body: any, @PathParams("id") id: string) {
    body._id = id;
    try {
      return await this.service.save(body);
    } catch (e) {
      throw e;
    }
  }

  @Delete("/:id")
  @UseAuth(AuthMiddleware)
  async delete(@PathParams("id") id: string) {
    return await this.service.remove(id);
  }
}
