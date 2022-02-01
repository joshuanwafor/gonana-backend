import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { ResourceModel } from "../../models/resource/resource";

@Service()
export class ResourceService {
  @Inject(ResourceModel)
  model: MongooseModel<ResourceModel>;

  async find(id: string): Promise<ResourceModel> {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async save(item: ResourceModel): Promise<ResourceModel> {
    const model = new this.model(item);

    await model.updateOne(item, { upsert: true });

    if (process.env.PORT != undefined) {
      let object = { ...model.toObject(), objectID: model._id ?? model.id };
    }

    return model;
  }

  async query(options = {}): Promise<ResourceModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<ResourceModel> {
    return await this.model.findById(id).remove().exec();
  }
}
