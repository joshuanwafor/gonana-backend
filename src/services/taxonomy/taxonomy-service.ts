import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { TaxonomyModel } from "../../models/taxonomy/taxonomy";

@Service()
export class TaxonomyService {
  @Inject(TaxonomyModel)
  public model: MongooseModel<TaxonomyModel>;

  async find(id: string): Promise<TaxonomyModel> {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async save(item: TaxonomyModel): Promise<TaxonomyModel> {
    const model = new this.model(item);
    await model.updateOne(item, { upsert: true });
    return model;
  }

  async update(id: string, data: any): Promise<any> {
    try {
      return await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
    } catch (error) {
      throw error;
    }
  }



  async query(options = {}): Promise<TaxonomyModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<TaxonomyModel> {
    return await this.model.findById(id).remove().exec();
  }
}
