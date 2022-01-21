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
import { ProductService } from "../../services/product/ProductService";
import { AuthMiddleware } from "../../middlewares/auth";
import { AuthService } from "../../services/auth";

@Controller({
  path: "/products",
})
export class ProductCtrl {
  constructor(
    private service: ProductService,
    private authService: AuthService
  ) {}

  @Get("/")
  @UseAuth(AuthMiddleware)
  async getProducts() {
    return this.service.query({ publisher_id: this.authService.user_id });
  }

  @Post("")
  @UseAuth(AuthMiddleware)
  async postProduct(@BodyParams() body: any) {
    body.publisher_id = this.authService.user_id;
    return await this.service.save(body);
  }

  @Get("/:productID")
  @UseAuth(AuthMiddleware)
  async getProduct(@PathParams("productID") productID: string) {
    return await this.service.find(productID);
  }

  @Put("/:productID")
  @UseAuth(AuthMiddleware)
  async updateProduct(
    @BodyParams() body: any,
    @PathParams("productID") productID: string
  ) {
    body._id = productID;
    try {
      await this.service.save(body);
      return true;
    } catch (e) {}
  }

  @Delete("/:productID")
  @UseAuth(AuthMiddleware)
  async deleteProduct(@PathParams("productID") productID: string) {
    return await this.service.remove(productID);
  }
}
