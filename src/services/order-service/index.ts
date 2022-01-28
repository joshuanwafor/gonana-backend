import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { NewVoucher, VoucherModel } from "src/models/Voucher";
import { OrderModel } from "../../models/Order";

@Service()
export class OrderService {
  @Inject(OrderModel)
  model: MongooseModel<OrderModel>;

  async find(id: string): Promise<OrderModel> {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async save(item: OrderModel): Promise<OrderModel> {
    const model = new this.model(item);
    await model.updateOne(item, { upsert: true });

    return model;
  }

  async saveVoucherOrders(
    voucher: VoucherModel,
    def: NewVoucher
  ): Promise<void> {
    def.services.forEach(async (item) => {
      let obj: OrderModel = {
        publisher_id: voucher.farmer_id,
        provider_id: item.provider_id,
        service_id: item.service_id,
        status: "pending",
        order_for: "voucher",
        user_note: item.description,
        provider_status: "pending",
      };

      try {
        const model = new this.model(obj);
        await model.updateOne(obj, { upsert: true });
      } catch (e) {
        throw e;
      }
    });
  }

  async query(options = {}): Promise<OrderModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<OrderModel> {
    return await this.model.findById(id).remove().exec();
  }
}
