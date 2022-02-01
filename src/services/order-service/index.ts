import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { OrderModel } from "../../models/order/order";

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

  

  async query(options = {}): Promise<OrderModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<OrderModel> {
    return await this.model.findById(id).remove().exec();
  }
}
