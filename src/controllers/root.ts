import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  QueryParams,
  Req,
  Res,
  UseAuth,
} from "@tsed/common";
import { CourseService } from "../services/course/course-service";
import { ResourceService } from "../services/resource/resource-service";

@Controller({
  path: "/public",
})
export class RootCtrl {
  constructor(
    private service: CourseService,
    private resources_service: ResourceService
  ) {}

  @Get("/courses")
  async get() {
    return await this.service.query({});
  }

  @Get("/courses/:id")
  async getCourseInfo(@PathParams("id") id: string) {
    const course = await this.service.find(id);
    const resources = await this.resources_service.query({ course_id: id });
    return {
      course: course,
      resources: resources,
    };
  }

  @Get("/resources")
  async getResources() {
    return await this.resources_service.query({});
  }

  @Post("/make-payment")
  async purchaseProject(
    @Res() res: Res,
    @Req() req: Req,
    @BodyParams() body: any
  ) {
    // let { project_id, email } = body;
    // console.log(project_id, email);
    // try {
    //   let transaction = await this.service.initTransaction(email, project_id);
    //   console.log(transaction.details);
    //   res.redirect(transaction.details.data.authorization_url);
    //   console.log(transaction);
    // } catch (e) {
    //   console.log(e);
    //   res.redirect("/");
    // }
  }

  @Get("/verify-pay")
  async verifyPay(@Res() res: Res, @Req() req: Req, @QueryParams() query: any) {
    // console.log(query);
    // try {
    //   let transaction = await this.service.verifyTransaction(
    //     query["reference"]
    //   );
    //   console.log(transaction);
    // } catch (e) {
    //   console.log(e);
    //   res.redirect("/");
    // }
  }
}
