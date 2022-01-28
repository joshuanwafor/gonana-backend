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
import { AuthMiddleware } from "../../middlewares/auth";
import { AuthService } from "../../services/auth";
import { OrderService } from "../../services/order-service";

@Controller({
  path: "/orders",
})
class Ctrl {
  constructor(
    private service: OrderService,
    private authService: AuthService
  ) {}

  @Get("/provider")
  @UseAuth(AuthMiddleware)
  async getProviderLoanService() {
    return await this.service.query({ provider_id: this.authService.user_id });
  }

  @Get("/farmer")
  @UseAuth(AuthMiddleware)
  async getFarmerLoanService() {
    return await this.service.query({ farmer_id: this.authService.user_id });
  }

  @Post("/")
  @UseAuth(AuthMiddleware)
  async postLoanService(@BodyParams() body: any) {
    body.publisher_id = this.authService.user_id;
    return await this.service.save(body);
  }

  @Delete("/:itemID")
  @UseAuth(AuthMiddleware)
  async deleteLoanService(@PathParams("itemID") itemID: string) {
    return await this.service.find(itemID);
  }

  @Get("/:itemID")
  @UseAuth(AuthMiddleware)
  async getLoanService(@PathParams("itemID") itemID: string) {
    return await this.service.find(itemID);
  }
}
