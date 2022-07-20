import {
  BodyParams,
  Controller,
  Delete,
  Get,
  Options,
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
export class OrderCtrl {
  constructor(
    private service: OrderService,
    private authService: AuthService
  ) { }

  @Get("")
  @UseAuth(AuthMiddleware)
  async getDefault() {
    return await this.service.model.find({
      $or: [
        { provider_id: this.authService.user_id },
        { publisher_id: this.authService.user_id },
      ],
    });
  }

  @Post("/")
  @UseAuth(AuthMiddleware)
  async postOrder(@BodyParams() body: any) {
    body.publisher_id = this.authService.user_id;
    return await this.service.save(body);
  }

  @Delete("/:itemID")
  @UseAuth(AuthMiddleware)
  async deleteOrder(@PathParams("itemID") itemID: string) {
    return await this.service.find(itemID);
  }

  @Get("/:itemID/pay")
  @UseAuth(AuthMiddleware)
  async pay(@PathParams("itemID") itemID: string) {
    try {
      let order = await this.service.generatePaystackPaymentTransaction(itemID);
      return order.paystack_trans.authorization_url;
    } catch (error) { }
  }

  @Get("/:itemID/received")
  @UseAuth(AuthMiddleware)
  async received(@PathParams("itemID") itemID: string) {
    try {
      // @ts-ignore
      return await this.service.update(itemID, {
        status: "completed",
      });
    } catch (error) { }
  }

  @Get("/:itemID/delivered")
  @UseAuth(AuthMiddleware)
  async delivered(@PathParams("itemID") itemID: string) {
    try {
      // @ts-ignore
      return await this.service.update(itemID, {
        provider_status: "completed",
      });
    } catch (error) { }
  }

  @Get("/:itemID")
  async getOrderDetails(@PathParams("itemID") itemID: string) {
    console.log(itemID);
    console.log("searching");
    return await this.service.getOrderDetails(itemID);
  }

  @Options("*")
  async authOption(@Res() response: Res): Promise<any> {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With,Content-Type, Accep, authorization, Authorization"
    );
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    return {};
  }
}
