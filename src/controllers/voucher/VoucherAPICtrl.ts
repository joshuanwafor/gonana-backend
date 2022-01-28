import {
  BodyParams,
  Controller,
  Get,
  PathParams,
  Post,
  Put,
  Res,
  UseAuth,
} from "@tsed/common";
import { VoucherService } from "../../services/voucher/voucher-service";
import { AuthMiddleware } from "../../middlewares/auth";
import { AuthService } from "../../services/auth";
import {
  NewVoucher,
  VoucherModel,
  VoucherServiceAttach,
} from "../../models/voucher/voucher";
import { OrderService } from "../../services/order-service";

@Controller({
  path: "/vouchers",
})
export class VoucherCtrl {
  constructor(
    private service: VoucherService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  @Get("/")
  @UseAuth(AuthMiddleware)
  async getUserVouchers() {
    return this.service.query({ publisher_id: this.authService.user_id });
  }

  @Post("/")
  @UseAuth(AuthMiddleware)
  async postVoucher(@BodyParams() body: NewVoucher) {
    let services = body.services;

    let voucherObj: VoucherModel = {
      description: body.description,
      interest_rate: body.interest_rate,
      repayment_date: body.repayment_date,
      type: "loan",
      publisher_id: this.authService.user_id,
      farmer_id: this.authService.user_id,
      status: body.status,
    };

    try {
      // save voucher info
      let createdVoucher = await this.service.save(voucherObj);
      // attach voucher services if provided
      let res = await this.orderService.saveVoucherOrders(createdVoucher, body);

      return await this.service.getWithServices(createdVoucher._id);
    } catch (e) {
      throw e;
    }
  }

  @Get("/:itemID")
  @UseAuth(AuthMiddleware)
  async getVoucher(@PathParams("itemID") itemID: string) {
    return await this.service.getWithServices(itemID);
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
