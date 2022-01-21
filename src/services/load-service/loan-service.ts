import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { LoanServiceModel } from "../../models/LoanService";

@Service()
export class LoanService {
  @Inject(LoanServiceModel)
  model: MongooseModel<LoanServiceModel>;

  async find(id: string): Promise<LoanServiceModel> {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async save(item: LoanServiceModel): Promise<LoanServiceModel> {
    const model = new this.model(item);
    await model.updateOne(item, { upsert: true });

    return model;
  }

  async query(options = {}): Promise<LoanServiceModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<LoanServiceModel> {
    return await this.model.findById(id).remove().exec();
  }
}
