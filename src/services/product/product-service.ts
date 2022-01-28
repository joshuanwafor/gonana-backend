import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";

import { ProductModel } from "../../models/product/product";

@Service()
export class ProductService {
  @Inject(ProductModel)
  model: MongooseModel<ProductModel>;

  async find(id: string): Promise<ProductModel> {
    const item = await this.model.findById(id).exec();

    return item;
  }

  async save(item: ProductModel): Promise<ProductModel> {
    const model = new this.model(item);

    await model.updateOne(item, { upsert: true });

    if (process.env.PORT != undefined) {
      let object = { ...model.toObject(), objectID: model._id ?? model.id };
    }

    return model;
  }

  async query(options = {}): Promise<ProductModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<ProductModel> {
    return await this.model.findById(id).remove().exec();
  }
}
