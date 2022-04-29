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
import { PostService } from "../services/post";

@Controller({
  path: "/public",
})
export class RootCtrl {
  constructor(
    private service: PostService
  ) {}

  @Get("/posts")
  async get() {
    return await this.service.query({});
  }
}
