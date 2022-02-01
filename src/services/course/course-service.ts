import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { CourseModel } from "../../models/course/course";

@Service()
export class CourseService {
  @Inject(CourseModel)
  model: MongooseModel<CourseModel>;

  async find(id: string): Promise<CourseModel> {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async save(item: CourseModel): Promise<CourseModel> {
    const model = new this.model(item);

    await model.updateOne(item, { upsert: true });

    if (process.env.PORT != undefined) {
      let object = { ...model.toObject(), objectID: model._id ?? model.id };
    }

    return model;
  }

  async query(options = {}): Promise<CourseModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<CourseModel> {
    return await this.model.findById(id).remove().exec();
  }
}
