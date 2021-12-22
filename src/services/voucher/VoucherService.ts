import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { VoucherModel } from "src/models/Voucher";

@Service()
export class VoucherService {
  @Inject(VoucherModel)
  model: MongooseModel<VoucherModel>;

  async find(id: string): Promise<VoucherModel> {
    const item = await this.model.findById(id).exec();

    return item;
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
