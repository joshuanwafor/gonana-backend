import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { VoucherModel } from "../../models/Voucher";
import { OrderService } from "../order-service";
import { OrderModel } from "src/models/Order";

@Service()
export class VoucherService {
  @Inject(VoucherModel)
  model: MongooseModel<VoucherModel>;

  @Inject(OrderService)
  orderService: OrderService;

  async find(id: string): Promise<VoucherModel> {
    const item = await this.model.findById(id).exec();

    return item;
  }

  async getWithServices(
    id: string
  ): Promise<{ data: VoucherModel; services: OrderModel[] }> {
    const item = await this.model.findById(id).exec();
    const services = await this.orderService.query({
      voucher_id: item.id ?? item._id,
    });
    return {
      data: item,
      services: services,
    };
  }

  async save(item: VoucherModel): Promise<VoucherModel> {
    const model = new this.model(item);

    await model.updateOne(item, { upsert: true });

    return model;
  }

  async query(options = {}): Promise<VoucherModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<VoucherModel> {
    return await this.model.findById(id).remove().exec();
  }
}
