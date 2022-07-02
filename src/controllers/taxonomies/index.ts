import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  UseAuth,
} from "@tsed/common";
import { TaxonomyService } from "../../services/taxonomy/taxonomy-service";
import { AuthService } from "../../services/auth";
import {
  Deprecated,
  Description,
  Returns,
  Security,
  Summary,
} from "@tsed/schema";

@Controller({
  path: "/taxonomies",
})
export class TaxonomiesCtrl {
  constructor(
    private service: TaxonomyService,
    private authService: AuthService
  ) {}

  @Get("/")
  @Summary("Summary of this route")
  @Description("Description of this route")
  //@Returns(200, UserFeedSchema).Description("Success")
  @Returns(404, Object)
  @Returns(500, Object)
  async getItems() {
    return this.service.query({});
  }

  @Post("")
  async postItem(@BodyParams() body: any) {
    return await this.service.save(body);
  }

  @Put("/:itemID")
  async updateItem(
    @BodyParams() body: any,
    @PathParams("itemID") itemID: string
  ) {
    body._id = itemID;
    try {
      await this.service.save(body);
      return true;
    } catch (e) {}
  }

  @Delete("/:itemID")
  async deleteItem(@PathParams("itemID") itemID: string) {
    return await this.service.remove(itemID);
  }
}
