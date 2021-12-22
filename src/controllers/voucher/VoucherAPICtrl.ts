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
import { VoucherService } from "src/services/voucher/VoucherService";
import { AuthMiddleware } from "../../middlewares/auth";
import { AuthService } from "../../services/auth";

@Controller({
  path: "/voucher",
})
export class VoucherCtrl {
  constructor(
    private service: VoucherService,
    private authService: AuthService
  ) {}

  @Get("/")
  @UseAuth(AuthMiddleware)
  async getUserVouchers() {
    return this.service.query({ publisher_id: this.authService.user_id });
  }

  @Post("/")
  @UseAuth(AuthMiddleware)
  async postVoucher(@BodyParams() body: any) {
    body.publisher_id = this.authService.user_id;
    return await this.service.save(body);
  }

  @Get("/:itemID")
  @UseAuth(AuthMiddleware)
  async getVoucher(@PathParams("itemID") itemID: string) {
    return await this.service.find(itemID);
  }

  @Put("/:itemID")
  @UseAuth(AuthMiddleware)
  async updateVoucher(
    @BodyParams() body: any,
    @PathParams("itemID") itemID: string
  ) {
    body._id = itemID;
    try {
      await this.service.save(body);
      return true;
    } catch (e) {}
  }
}
