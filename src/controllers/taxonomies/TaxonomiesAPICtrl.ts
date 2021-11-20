import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, UseAuth } from "@tsed/common";
import { TaxonomyService } from "../../services/taxonomies/TaxonomyService";
import { AuthService } from "../../services/auth";

@Controller({
  path: "/taxonomies",
})

export class TaxonomiesCtrl {
  constructor(private service: TaxonomyService, private authService: AuthService) {

  }

  @Get("/")
  async getItems() {
    return this.service.query({});
  }

  @Post("")
  async postItem(@BodyParams() body: any) {
    return await this.service.save(body)
  }

  @Put("/:itemID")
  async updateItem(@BodyParams() body: any, @PathParams("itemID") itemID: string) {
    body._id = itemID;
    try {
      await this.service.save(body);
      return true;
    } catch (e) {

    }
  }

  @Delete("/:itemID")
  async deleteItem(@PathParams("itemID") itemID: string) {
    return await this.service.remove(itemID)
  }

}
