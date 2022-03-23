import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { SpaceModel } from "../../models/space";

@Service()
export class SpaceService {
  @Inject(SpaceModel)
  model: MongooseModel<SpaceModel>;

  async find(id: string): Promise<SpaceModel> {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async save(item: SpaceModel): Promise<SpaceModel> {
    const model = new this.model(item);

    await model.updateOne(item, { upsert: true });

    if (process.env.PORT != undefined) {
      let object = { ...model.toObject(), objectID: model._id ?? model.id };
    }

    return model;
  }

  async query(options = {}): Promise<SpaceModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<SpaceModel> {
    return await this.model.findById(id).remove().exec();
  }
}
